import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, "..", "public", "previews");

const PAGES = [
  { name: "bfitfam", path: "/projetos/bfitfam" },
  { name: "tasca-dentro", path: "/projetos/tasca-dentro" },
  { name: "ondas-academy", path: "/projetos/ondas-academy" },
  { name: "futuro", path: "/projetos/futuro" },
  { name: "seeds", path: "/projetos/seeds" },
];

const BASE_URL = "http://localhost:3003";

async function main() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  for (const { name, path: pagePath } of PAGES) {
    const url = `${BASE_URL}${pagePath}`;
    console.log(`Capturing ${name} from ${url}...`);
    try {
      await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
      await new Promise((r) => setTimeout(r, 2000));
      const outputPath = path.join(OUTPUT_DIR, `${name}.jpg`);
      await page.screenshot({ path: outputPath, type: "jpeg", quality: 85 });
      console.log(`  Saved to ${outputPath}`);
    } catch (err) {
      console.error(`  Failed: ${err.message}`);
    }
  }

  await browser.close();
  console.log("Done!");
}

main();
