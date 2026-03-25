import type { MetadataRoute } from "next";
import { STATES } from "@/lib/states";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mysalarycalculator.co";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  const hourlyRates: number[] = [];
  for (let rate = 10; rate <= 100; rate += 1) {
    hourlyRates.push(rate);
  }

  for (const rate of hourlyRates) {
    pages.push({
      url: `${SITE_URL}/hourly/${rate}/to-salary`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  for (let amount = 10000; amount <= 300000; amount += 1000) {
    pages.push(
      {
        url: `${SITE_URL}/salary/${amount}/monthly`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: `${SITE_URL}/salary/${amount}/biweekly`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: `${SITE_URL}/salary/${amount}/to-hourly`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: `${SITE_URL}/salary/${amount}/after-tax`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      }
    );

    for (const state of STATES) {
      pages.push({
        url: `${SITE_URL}/salary/${amount}/after-tax/${state.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  return pages;
}
