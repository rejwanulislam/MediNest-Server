// src/modules/ai/vector/embedding.service.ts

import { getVoyageClient } from "../../../config/voyage.config";

export const getEmbedding = async (text: string): Promise<number[]> => {
  // যেহেতু getVoyageClient এখন async, তাই আগে await করে নিতে হবে
  const client = await getVoyageClient();

  const result = await client.embed({
    input: text,
    model: "voyage-3-lite",
  });

  const embedding = result.data?.[0]?.embedding;

  if (!embedding) {
    throw new Error("Voyage AI returned empty embedding");
  }

  return embedding as number[];
};

export const toVectorString = (embedding: number[]): string => {
  return `[${embedding.join(",")}]`;
};