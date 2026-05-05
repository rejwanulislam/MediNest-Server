// src/test-gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.error("❌ GEMINI_API_KEY not found in .env");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

// ─── Test 1: text-embedding-004 ───────────────────────────────
const testEmbedding004 = async () => {
    console.log("\n🧮 Test 1: text-embedding-004...");
    try {
        const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
        const result = await model.embedContent("Paracetamol 500mg tablet");
        const values = result.embedding.values;
        console.log("✅ text-embedding-004 WORKS!");
        console.log(`   Dimension: ${values.length}`);
        console.log(`   Sample: [${values.slice(0, 3).join(", ")}...]`);
    } catch (error: any) {
        console.error("❌ text-embedding-004 FAILED:", error.message);
    }
};

// ─── Test 2: embedding-001 ────────────────────────────────────
const testEmbedding001 = async () => {
    console.log("\n🧮 Test 2: embedding-001...");
    try {
        const model = genAI.getGenerativeModel({ model: "embedding-001" });
        const result = await model.embedContent("Paracetamol 500mg tablet");
        const values = result.embedding.values;
        console.log("✅ embedding-001 WORKS!");
        console.log(`   Dimension: ${values.length}`);
        console.log(`   Sample: [${values.slice(0, 3).join(", ")}...]`);
    } catch (error: any) {
        console.error("❌ embedding-001 FAILED:", error.message);
    }
};

// ─── Test 3: models/text-embedding-004 (prefix সহ) ───────────
const testEmbedding004WithPrefix = async () => {
    console.log("\n🧮 Test 3: models/text-embedding-004 (prefix সহ)...");
    try {
        const model = genAI.getGenerativeModel({ model: "models/text-embedding-004" });
        const result = await model.embedContent("Paracetamol 500mg tablet");
        const values = result.embedding.values;
        console.log("✅ models/text-embedding-004 WORKS!");
        console.log(`   Dimension: ${values.length}`);
        console.log(`   Sample: [${values.slice(0, 3).join(", ")}...]`);
    } catch (error: any) {
        console.error("❌ models/text-embedding-004 FAILED:", error.message);
    }
};

// ─── Test 4: Gemini Chat (Groq এর বিকল্প হিসেবে) ─────────────
const testGeminiChat = async () => {
    console.log("\n💬 Test 4: gemini-1.5-flash chat...");
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Say hello in one word");
        const text = result.response.text();
        console.log("✅ gemini-1.5-flash WORKS!");
        console.log(`   Response: ${text}`);
    } catch (error: any) {
        console.error("❌ gemini-1.5-flash FAILED:", error.message);
    }
};

// ─── Run All Tests ────────────────────────────────────────────
const runTests = async () => {
    console.log("🚀 Gemini SDK Test Starting...");
    console.log(`🔑 Key: ${API_KEY?.substring(0, 12)}...`);

    await testEmbedding004();
    await testEmbedding001();
    await testEmbedding004WithPrefix();
    await testGeminiChat();

    console.log("\n─────────────────────────────────────────");
    console.log("📌 যেটায় ✅ আসবে সেটা embedding.service.ts এ use করো");
    console.log("─────────────────────────────────────────");
};

runTests();