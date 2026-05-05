// src/modules/ai/ai.routes.ts
import { Router } from "express";
import {
  chatController,
  searchSuggestionsController,
  recommendationController,
  dashboardInsightController,
  anomalyController,
  seedController,
  resetController,
} from "./ai.controller";

const router = Router();

// ─── AI Features ──────────────────────────────────────────────
router.post("/chat", chatController);                          // RAG Chatbot (Groq)
router.post("/search-suggestions", searchSuggestionsController); // Vector Search
router.post("/recommendations", recommendationController);     // Personalized Recs
router.post("/dashboard-insights", dashboardInsightController); // Real DB Insights
router.post("/anomaly-detection", anomalyController);         // Anomaly Detection

// ─── Admin Only ───────────────────────────────────────────────
router.post("/seed-vector-db", seedController);               // একবার run করো
router.post("/reset-embeddings", resetController);            // Re-seed এর আগে

export const aiRouter = router;
