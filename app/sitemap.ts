import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kingofscents.ma";
  const now = new Date();
  return [
    { url: `${base}/fr`, lastModified: now, alternates: { languages: { fr: `${base}/fr`, en: `${base}/en` } }, priority: 1 },
    { url: `${base}/en`, lastModified: now, alternates: { languages: { fr: `${base}/fr`, en: `${base}/en` } }, priority: 0.9 },
  ];
}
