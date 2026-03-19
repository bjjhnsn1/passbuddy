import { MetadataRoute } from "next";
import statesData from "@/data/states.json";

const BASE_URL = "https://passbuddy.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages = [
    { url: BASE_URL, changeFrequency: "weekly" as const, priority: 1.0 },
    // CDL
    { url: `${BASE_URL}/cdl`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/cdl/general-knowledge`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/cdl/hazmat`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/cdl/air-brakes`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/cdl/combination-vehicles`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/cdl/pre-trip-inspection`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/cdl/school-bus`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/cdl/tanker`, changeFrequency: "monthly" as const, priority: 0.8 },
    // DMV hub
    { url: `${BASE_URL}/dmv`, changeFrequency: "weekly" as const, priority: 0.9 },
    // Motorcycle hub
    { url: `${BASE_URL}/motorcycle`, changeFrequency: "weekly" as const, priority: 0.9 },
    // ServSafe
    { url: `${BASE_URL}/servsafe`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/servsafe/food-handler`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/servsafe/food-manager`, changeFrequency: "monthly" as const, priority: 0.8 },
  ];

  // DMV state pages
  const dmvStates = statesData.map((state) => ({
    url: `${BASE_URL}/dmv/${state.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    lastModified: now,
  }));

  // Motorcycle state pages
  const motoStates = statesData.map((state) => ({
    url: `${BASE_URL}/motorcycle/${state.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    lastModified: now,
  }));

  return [
    ...staticPages.map((p) => ({ ...p, lastModified: now })),
    ...dmvStates,
    ...motoStates,
  ];
}
