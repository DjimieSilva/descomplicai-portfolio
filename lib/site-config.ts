export const siteConfig = {
  name: "Descomplicai",
  title: "Descomplicai | Portfolio de Projetos",
  description:
    "IA sem complexidade. Websites, apps e produtos digitais construídos pela Descomplicai.",
  domain: "descomplicai.pt",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://descomplicai.pt",
  locale: "pt_PT",
  socialImagePath: "/opengraph-image",
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/favicon.ico"),
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "pt-PT",
    description: siteConfig.description,
  };
}
