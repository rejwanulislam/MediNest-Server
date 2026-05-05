// src/config/groq.config.ts
import Groq from "groq-sdk";
import "dotenv/config";

if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is missing in .env file");
}

export const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});
