import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://carolinegoncalves.com.br";
  const routes = [
    "",
    "/sobre",
    "/jornalismo",
    "/fotografia",
    "/projetos",
    "/blog",
    "/depoimentos",
    "/contato",
    "/agendamento",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));
}
