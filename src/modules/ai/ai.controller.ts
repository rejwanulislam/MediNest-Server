// src/modules/ai/ai.controller.ts
import { Request, Response } from "express";
import {
  chatSchema,
  searchSchema,
  recommendationSchema,
  anomalySchema,
} from "./ai.validation";
import {
  ragChatService,
  vectorSearchSuggestionsService,
  vectorRecommendationService,
  seedMedicinesToPgVector,
  resetEmbeddings,
  dashboardInsightService,
  anomalyService,
  getRealDashboardData,
} from "./ai.service";

// ─── RAG Chatbot ──────────────────────────────────────────────
export const chatController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const parsed = chatSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: parsed.error.issues[0]?.message,
      });
      return;
    }

    const { message, history } = parsed.data;
    const reply = await ragChatService(message, history);
    res.status(200).json({ success: true, reply });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ success: false, message: "Chat failed" });
  }
};

// ─── Search Suggestions ───────────────────────────────────────
export const searchSuggestionsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const parsed = searchSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ success: false, suggestions: [] });
      return;
    }

    const suggestions = await vectorSearchSuggestionsService(
      parsed.data.query
    );
    res.status(200).json({ success: true, suggestions });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ success: false, suggestions: [] });
  }
};

// ─── Recommendations ──────────────────────────────────────────
export const recommendationController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const parsed = recommendationSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ success: false, recommendations: [] });
      return;
    }

    const { viewedItems, searchHistory } = parsed.data;
    const recommendations = await vectorRecommendationService(
      viewedItems,
      searchHistory
    );
    res.status(200).json({ success: true, recommendations });
  } catch (error) {
    console.error("Recommendation error:", error);
    res.status(500).json({ success: false, recommendations: [] });
  }
};

// ─── Dashboard Insights (Real DB Data) ───────────────────────
export const dashboardInsightController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const realData = await getRealDashboardData();
    const insights = await dashboardInsightService(realData);
    res.status(200).json({ success: true, insights, stats: realData });
  } catch (error) {
    console.error("Insight error:", error);
    res.status(500).json({ success: false, insights: [] });
  }
};

// ─── Anomaly Detection ────────────────────────────────────────
export const anomalyController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const parsed = anomalySchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ success: false, anomalies: [] });
      return;
    }

    const anomalies = await anomalyService(parsed.data.data);
    res.status(200).json({ success: true, anomalies });
  } catch (error) {
    console.error("Anomaly error:", error);
    res.status(500).json({ success: false, anomalies: [] });
  }
};

// ─── Seed Vector DB ───────────────────────────────────────────
export const seedController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await seedMedicinesToPgVector();
    res.status(200).json({
      success: true,
      message: `Seeded ${result.count} medicines to Neon DB`,
    });
  } catch (error) {
    console.error("Seed error:", error);
    res.status(500).json({ success: false, message: "Seeding failed" });
  }
};

// ─── Reset Embeddings ─────────────────────────────────────────
export const resetController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await resetEmbeddings();
    res.status(200).json({
      success: true,
      message: "All embeddings reset",
    });
  } catch (error) {
    console.error("Reset error:", error);
    res.status(500).json({ success: false, message: "Reset failed" });
  }
};
