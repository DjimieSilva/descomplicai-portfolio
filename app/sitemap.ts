import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-config";

const PAGE_FILE_NAMES = ["page.tsx", "page.ts", "page.jsx", "page.js"];
const IGNORED_SEGMENTS = ["api"];

type RouteEntry = {
  route: string;
  lastModified: Date;
};

function normalizeSegments(segments: string[]) {
  return segments.filter(
    (segment) =>
      segment &&
      !segment.startsWith("(") &&
      !segment.startsWith("[") &&
      !segment.startsWith("@") &&
      !segment.startsWith("_") &&
      !IGNORED_SEGMENTS.includes(segment),
  );
}

function findPageFile(dir: string) {
  return PAGE_FILE_NAMES.find((fileName) => existsSync(join(dir, fileName)));
}

function collectRoutes(dir: string, segments: string[] = []): RouteEntry[] {
  const routes: RouteEntry[] = [];
  const normalizedSegments = normalizeSegments(segments);
  const pageFile = findPageFile(dir);

  if (pageFile) {
    const route = normalizedSegments.length === 0 ? "/" : `/${normalizedSegments.join("/")}`;
    routes.push({
      route,
      lastModified: statSync(join(dir, pageFile)).mtime,
    });
  }

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    routes.push(...collectRoutes(join(dir, entry.name), [...segments, entry.name]));
  }

  return routes;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const appDir = join(process.cwd(), "app");
  const routes = collectRoutes(appDir);
  const deduped = new Map<string, Date>();

  for (const entry of routes) {
    const current = deduped.get(entry.route);
    if (!current || entry.lastModified > current) {
      deduped.set(entry.route, entry.lastModified);
    }
  }

  return [...deduped.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([route, lastModified]) => ({
      url: absoluteUrl(route),
      lastModified,
    }));
}
