import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site-config";

export function applyProjectRouteMetadata(metadata: Metadata, pathname: string) {
  const canonicalUrl = absoluteUrl(pathname);
  const existingOpenGraph = metadata.openGraph ?? {};
  const existingTwitter = metadata.twitter ?? {};

  metadata.alternates = {
    ...(metadata.alternates ?? {}),
    canonical: canonicalUrl,
  };

  metadata.openGraph = {
    ...existingOpenGraph,
    title: existingOpenGraph.title ?? metadata.title ?? undefined,
    description: existingOpenGraph.description ?? metadata.description ?? undefined,
    url: canonicalUrl,
  };

  metadata.twitter = {
    ...existingTwitter,
    title: existingTwitter.title ?? existingOpenGraph.title ?? metadata.title ?? undefined,
    description: existingTwitter.description ?? existingOpenGraph.description ?? metadata.description ?? undefined,
    images: existingTwitter.images ?? existingOpenGraph.images,
  };
}
