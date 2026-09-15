import type {
  MetadataRoute
} from "next";

export default function robots():
MetadataRoute.Robots {

  const site =
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://ferreteria-cayo.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/api/admin"
      ]
    },

    sitemap:
      `${site}/sitemap.xml`
  };
}