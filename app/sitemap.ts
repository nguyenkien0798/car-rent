import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://morent.com";

  const baseRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/vi`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/en/category`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/vi/category`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/vi/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/en/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/vi/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const apiBaseUrl = process.env.NEXT_PUBLIC_URL_API;

  if (!apiBaseUrl) {
    return baseRoutes;
  }

  try {
    const response = await fetch(`${apiBaseUrl}/v1/cars?limit=50&page=1`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return baseRoutes;
    }

    const data = await response.json();
    const items = Array.isArray(data?.data?.items) ? data.data.items : [];

    const carRoutes: MetadataRoute.Sitemap = items.flatMap((item: { id?: number; updated_at?: string }) => {
      if (!item.id) {
        return [];
      }

      const lastModified = item.updated_at ? new Date(item.updated_at) : new Date();

      return [
        {
          url: `${baseUrl}/en/cars/${item.id}`,
          lastModified,
          changeFrequency: "weekly",
          priority: 0.9,
        },
        {
          url: `${baseUrl}/vi/cars/${item.id}`,
          lastModified,
          changeFrequency: "weekly",
          priority: 0.9,
        },
      ];
    });

    return [...baseRoutes, ...carRoutes];
  } catch {
    return baseRoutes;
  }
}
