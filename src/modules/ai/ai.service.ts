// src/modules/ai/ai.service.ts
import { groq } from "../../config/groq.config";
import { prisma } from "../../lib/prisma";

// Vector services re-export
export {
  ragChatService,
  vectorSearchSuggestionsService,
  vectorRecommendationService,
} from "./vector/search.service";

export {
  seedMedicinesToPgVector,
  embedSingleMedicine,
  resetEmbeddings,
} from "./vector/seed.service";

// ─── Dashboard Insights (Groq) ────────────────────────────────
export const dashboardInsightService = async (data: {
  totalSales: number;
  totalUsers: number;
  topProducts: string[];
  revenueByMonth: { month: string; revenue: number }[];
}): Promise<{ insight: string; suggestion: string }[]> => {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `You are a business analyst for MediNest medical e-commerce platform in Bangladesh.
Analyze the data and return ONLY a JSON array. No explanation, no markdown.
Format: [{"insight": "...", "suggestion": "..."}]`,
      },
      {
        role: "user",
        content: `Analyze this data and give 3 business insights:
- Total Sales: ${data.totalSales} taka
- Total Users: ${data.totalUsers}
- Top Products: ${data.topProducts.join(", ")}
- Revenue by Month: ${JSON.stringify(data.revenueByMonth)}`,
      },
    ],
    max_tokens: 600,
    temperature: 0.5,
  });

  const text = completion.choices[0]?.message?.content || "[]";
  const cleaned = text.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
};

// ─── Anomaly Detection (Groq) ─────────────────────────────────
export const anomalyService = async (
  data: { label: string; value: number }[]
): Promise<
  { label: string; issue: string; severity: "low" | "medium" | "high" }[]
> => {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `You are an anomaly detection AI for MediNest dashboard.
Return ONLY a JSON array. Empty array [] if no anomalies. No markdown.
Format: [{"label": "...", "issue": "...", "severity": "low|medium|high"}]`,
      },
      {
        role: "user",
        content: `Detect anomalies in this revenue data: ${JSON.stringify(data)}`,
      },
    ],
    max_tokens: 400,
    temperature: 0.3,
  });

  const text = completion.choices[0]?.message?.content || "[]";
  const cleaned = text.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
};

// ─── Real Dashboard Data from Prisma ─────────────────────────
export const getRealDashboardData = async () => {
  const [totalUsers, medicines, orders] = await Promise.all([
    prisma.user.count(),
    prisma.medicines.findMany({
      include: { orderItems: true },
    }),
    prisma.orders.findMany({
      select: { totalAmount: true, createdAt: true },
    }),
  ]);

  const topProducts = [...medicines]
    .sort((a, b) => b.orderItems.length - a.orderItems.length)
    .slice(0, 5)
    .map((m) => m.medicineName);

  // Last 6 months revenue
  const revenueByMonth = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - i));
    const month = date.toLocaleString("default", { month: "short" });
    const revenue = orders
      .filter((o) => {
        const d = new Date(o.createdAt);
        return (
          d.getMonth() === date.getMonth() &&
          d.getFullYear() === date.getFullYear()
        );
      })
      .reduce((sum, o) => sum + o.totalAmount, 0);
    return { month, revenue };
  });

  return {
    totalSales: orders.reduce((sum, o) => sum + o.totalAmount, 0),
    totalUsers,
    totalOrders: orders.length,
    topProducts,
    revenueByMonth,
  };
};
