// src/modules/ai/ai.validation.ts
import { z } from "zod";

// Chatbot - Groq history format
// history role "model" → "assistant" accept করো
export const chatSchema = z.object({
  message: z.string().min(1, "Message required"),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]), // ✅ "model" বাদ
        content: z.string(),
      })
    )
    .optional()
    .default([]),
});

// Search Suggestions
export const searchSchema = z.object({
  query: z.string().min(2, "Query too short"),
});

// Recommendations
export const recommendationSchema = z.object({
  viewedItems: z.array(z.string()).default([]),
  searchHistory: z.array(z.string()).default([]),
});

// Dashboard Insights
export const dashboardInsightSchema = z.object({
  totalSales: z.number(),
  totalUsers: z.number(),
  topProducts: z.array(z.string()),
  revenueByMonth: z.array(
    z.object({
      month: z.string(),
      revenue: z.number(),
    })
  ),
});

// Anomaly Detection
export const anomalySchema = z.object({
  data: z.array(
    z.object({
      label: z.string(),
      value: z.number(),
    })
  ),
});
