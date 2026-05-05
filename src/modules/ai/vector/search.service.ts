// src/modules/ai/vector/search.service.ts
import { prisma } from "../../../lib/prisma";
import { getEmbedding, toVectorString } from "./embedding.service";
import { groq } from "../../../config/groq.config";

interface ChatHistory {
  role: "user" | "assistant";
  content: string;
}

interface SearchResult {
  medicineId: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  similarity: number;
}

export const vectorSearchService = async (
  query: string,
  topK: number = 5
): Promise<SearchResult[]> => {
  try {
    const queryEmbedding = await getEmbedding(query);
    const vectorString = toVectorString(queryEmbedding);

    const results = await prisma.$queryRaw<any[]>`
      SELECT
        me."medicineId",
        m."medicineName"  AS name,
        m.price,
        m.image,
        m.detels          AS description,
        c."categorieName" AS category,
        1 - (me.embedding <=> ${vectorString}::vector) AS similarity
      FROM "MedicineEmbedding" me
      JOIN "Medicines"  m ON me."medicineId" = m.id
      JOIN "Categories" c ON m."categorieId" = c.id
      WHERE 1 - (me.embedding <=> ${vectorString}::vector) > 0.4
      ORDER BY me.embedding <=> ${vectorString}::vector
      LIMIT ${topK}
    `;

    return results.map((r) => ({
      medicineId: r.medicineId,
      name: r.name,
      price: Number(r.price),
      category: r.category,
      description: r.description || "",
      image: r.image || "",
      similarity: parseFloat(r.similarity),
    }));
  } catch (error) {
    console.error("Vector search error:", error);
    return [];
  }
};

export const ragChatService = async (
  message: string,
  history: ChatHistory[]
): Promise<string> => {
  const relevantMedicines = await vectorSearchService(message, 5);

  const context =
    relevantMedicines.length > 0
      ? relevantMedicines
        .map(
          (m) =>
            `- ${m.name} (${m.category}): ${m.description}. Price: ${m.price} taka`
        )
        .join("\n")
      : "No specific medicines found in database.";

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `You are MediNest AI assistant for a medical e-commerce platform in Bangladesh.
Answer questions based ONLY on this medicine data:

${context}

Rules:
- Only use the provided medicine data
- If not found say "Please search our catalog"
- Be concise and friendly
- Mention prices when relevant
- Answer in the same language the user writes in`,
      },
      ...history.map((h) => ({
        role: h.role as "user" | "assistant",
        content: h.content,
      })),
      { role: "user" as const, content: message },
    ],
    max_tokens: 400,
    temperature: 0.7,
  });

  return (
    completion.choices[0]?.message?.content ||
    "Sorry, I could not process your request."
  );
};

export const vectorSearchSuggestionsService = async (
  query: string
): Promise<string[]> => {
  try {
    const results = await vectorSearchService(query, 6);
    return results.map((r) => r.name).filter(Boolean);
  } catch {
    return [];
  }
};

export const vectorRecommendationService = async (
  viewedItems: string[],
  searchHistory: string[]
): Promise<{ name: string; reason: string; price: number; image: string }[]> => {
  try {
    const combinedQuery = [...viewedItems, ...searchHistory]
      .slice(0, 5)
      .join(", ");

    if (!combinedQuery.trim()) return [];

    const results = await vectorSearchService(combinedQuery, 4);

    return results.map((r) => ({
      name: r.name,
      reason: "Based on your interests",
      price: r.price,
      image: r.image,
    }));
  } catch {
    return [];
  }
};