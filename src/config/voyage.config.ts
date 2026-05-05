import "dotenv/config";

if (!process.env.VOYAGE_API_KEY) {
    throw new Error("VOYAGE_API_KEY missing in .env");
}

let voyageClient: any;

export const getVoyageClient = async () => {
    if (!voyageClient) {
        const { VoyageAIClient } = await import("voyageai");
        voyageClient = new VoyageAIClient({
            apiKey: process.env.VOYAGE_API_KEY,
        });
    }
    return voyageClient;
};