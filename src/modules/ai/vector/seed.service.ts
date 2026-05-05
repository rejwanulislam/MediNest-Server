// src/modules/ai/vector/seed.service.ts
import { prisma } from "../../../lib/prisma";
import { getEmbedding, toVectorString } from "./embedding.service";

export const seedMedicinesToPgVector = async (): Promise<{
  success: boolean;
  count: number;
}> => {
  const allMedicines = await prisma.medicines.findMany({
    include: {
      categorie: true,
      embedding: true,
    },
  });

  const medicines = allMedicines.filter((m) => m.embedding === null);

  if (medicines.length === 0) {
    console.log("✅ All medicines already embedded");
    return { success: true, count: 0 };
  }

  console.log(`📦 Embedding ${medicines.length} medicines...`);

  let successCount = 0;

  for (const medicine of medicines) {
    try {
      const content = `
        Medicine Name: ${medicine.medicineName}
        Category: ${medicine.categorie?.categorieName || "General"}
        Description: ${medicine.detels || ""}
        Manufacturer: ${medicine.manufacturer || ""}
        Uses: ${medicine.uses || ""}
        Side Effects: ${medicine.sideEffects || ""}
        Price: ${medicine.price} taka
        Stock: ${medicine.stock}
      `.trim();

      const embeddingValues = await getEmbedding(content);
      const vectorString = toVectorString(embeddingValues);

      await prisma.$executeRaw`
        INSERT INTO "MedicineEmbedding"
          (id, "medicineId", embedding, content, "createdAt", "updatedAt")
        VALUES (
          gen_random_uuid(),
          ${medicine.id},
          ${vectorString}::vector,
          ${content},
          NOW(),
          NOW()
        )
        ON CONFLICT ("medicineId")
        DO UPDATE SET
          embedding   = ${vectorString}::vector,
          content     = ${content},
          "updatedAt" = NOW()
      `;

      await prisma.medicines.update({
        where: { id: medicine.id },
        data: {
          isVectored: true,
          vectoredAt: new Date(),
        },
      });

      successCount++;
      console.log(`✅ ${successCount}. ${medicine.medicineName}`);

      // Voyage AI rate limit এর জন্য delay
      await new Promise((r) => setTimeout(r, 200));
    } catch (error) {
      console.error(`❌ Failed: ${medicine.medicineName}`, error);
    }
  }

  console.log(`\n🎉 Done! ${successCount}/${medicines.length} embedded.`);
  return { success: true, count: successCount };
};

export const embedSingleMedicine = async (
  medicineId: string
): Promise<void> => {
  const medicine = await prisma.medicines.findUnique({
    where: { id: medicineId },
    include: { categorie: true },
  });

  if (!medicine) return;

  const content = `
    Medicine Name: ${medicine.medicineName}
    Category: ${medicine.categorie?.categorieName || "General"}
    Description: ${medicine.detels || ""}
    Manufacturer: ${medicine.manufacturer || ""}
    Uses: ${medicine.uses || ""}
    Price: ${medicine.price} taka
  `.trim();

  const embeddingValues = await getEmbedding(content);
  const vectorString = toVectorString(embeddingValues);

  await prisma.$executeRaw`
    INSERT INTO "MedicineEmbedding"
      (id, "medicineId", embedding, content, "createdAt", "updatedAt")
    VALUES (
      gen_random_uuid(),
      ${medicineId},
      ${vectorString}::vector,
      ${content},
      NOW(),
      NOW()
    )
    ON CONFLICT ("medicineId")
    DO UPDATE SET
      embedding   = ${vectorString}::vector,
      content     = ${content},
      "updatedAt" = NOW()
  `;

  await prisma.medicines.update({
    where: { id: medicineId },
    data: { isVectored: true, vectoredAt: new Date() },
  });

  console.log(`✅ Embedded: ${medicine.medicineName}`);
};

export const resetEmbeddings = async (): Promise<void> => {
  await prisma.medicineEmbedding.deleteMany({});
  await prisma.medicines.updateMany({
    data: { isVectored: false, vectoredAt: null },
  });
  console.log("✅ All embeddings reset");
};