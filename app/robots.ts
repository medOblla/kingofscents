import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://kingofscents.ma/sitemap.xml",
    host: "https://kingofscents.ma",
  };
}
