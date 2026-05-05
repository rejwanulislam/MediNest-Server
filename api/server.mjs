var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/lib/prisma.ts
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [
    "postgresqlExtensions"
  ],
  "clientVersion": "7.8.0",
  "engineVersion": "3c6e192761c0362d496ed980de936e2f3cebcd3a",
  "activeProvider": "postgresql",
  "inlineSchema": 'generator client {\n  provider        = "prisma-client"\n  output          = "../generated/prisma"\n  previewFeatures = ["postgresqlExtensions"]\n}\n\ndatasource db {\n  provider   = "postgresql"\n  extensions = [vector]\n}\n\n// \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n// ENUMS\n// \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n\nenum OrderStatus {\n  Pending\n  Processing\n  Shipped\n  Delivered\n  Cancelled\n}\n\nenum UserRole {\n  USER\n  ADMIN\n  SELLER\n}\n\nenum UserStatus {\n  active\n  banned\n}\n\nenum InteractionType {\n  CATEGORY_VIEW\n  MEDICINE_VIEW\n  MEDICINE_SEARCH\n}\n\n// \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n// AUTH MODELS\n// \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n\nmodel User {\n  id            String     @id\n  name          String\n  email         String     @unique\n  emailVerified Boolean    @default(false)\n  image         String?\n  role          UserRole   @default(USER)\n  status        UserStatus @default(active)\n  createdAt     DateTime   @default(now())\n  updatedAt     DateTime   @updatedAt\n\n  // Relations\n  sessions  Session[]\n  accounts  Account[]\n  medicines Medicines[]\n  orders    Orders[]\n  reviews   Reviews[]\n  cards     Card[]\n\n  // AI Relations\n  searchLogs SearchLog[]\n  viewLogs   ViewLog[]\n\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String   @unique\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\n// \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n// CORE MODELS\n// \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n\nmodel Categories {\n  id            String   @id @default(uuid())\n  categorieName String\n  image         String?\n  createdAt     DateTime @default(now())\n  updatedAt     DateTime @updatedAt\n\n  medicines Medicines[]\n}\n\nmodel Medicines {\n  id           String  @id @default(uuid())\n  medicineName String\n  price        Int\n  image        String?\n  stock        Int     @default(0)\n  detels       String\n  manufacturer String\n\n  // AI Fields\n  uses        String? // \u0995\u09BF \u0995\u09BE\u099C\u09C7 \u09B2\u09BE\u0997\u09C7\n  sideEffects String? // \u09AA\u09BE\u09B0\u09CD\u09B6\u09CD\u09AC\u09AA\u09CD\u09B0\u09A4\u09BF\u0995\u09CD\u09B0\u09BF\u09AF\u09BC\u09BE\n  isVectored  Boolean   @default(false) // Pinecone \u098F store \u09B9\u09AF\u09BC\u09C7\u099B\u09C7 \u0995\u09BF\u09A8\u09BE\n  vectoredAt  DateTime? // \u0995\u0996\u09A8 vector \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  // Relations\n  sellerId    String\n  seller      User       @relation(fields: [sellerId], references: [id])\n  categorieId String\n  categorie   Categories @relation(fields: [categorieId], references: [id])\n\n  orderItems OrderItem[]\n  reviews    Reviews[]\n  cards      Card[]\n  viewLogs   ViewLog[]\n  embedding  MedicineEmbedding?\n}\n\nmodel Orders {\n  id              String      @id @default(uuid())\n  shippingAddress String\n  totalAmount     Int\n  status          OrderStatus @default(Pending)\n  createdAt       DateTime    @default(now())\n  updatedAt       DateTime    @updatedAt\n\n  customerId String\n  customer   User        @relation(fields: [customerId], references: [id])\n  items      OrderItem[]\n}\n\nmodel OrderItem {\n  id       String @id @default(uuid())\n  quantity Int\n  price    Int // order \u0995\u09B0\u09BE\u09B0 \u09B8\u09AE\u09AF\u09BC\u09C7\u09B0 price save \u0995\u09B0\u09CB\n\n  orderId   String\n  order     Orders    @relation(fields: [orderId], references: [id], onDelete: Cascade)\n  productId String\n  product   Medicines @relation(fields: [productId], references: [id])\n}\n\nmodel Reviews {\n  id        String   @id @default(uuid())\n  rating    Int\n  comment   String?\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  customerId String\n  customer   User      @relation(fields: [customerId], references: [id])\n  productId  String\n  product    Medicines @relation(fields: [productId], references: [id])\n}\n\nmodel Card {\n  id       String @id @default(uuid())\n  quantity Int\n\n  customerId String\n  customer   User      @relation(fields: [customerId], references: [id])\n  productId  String\n  product    Medicines @relation(fields: [productId], references: [id])\n\n  // \u098F\u0995\u099C\u09A8 user \u098F\u0995\u099F\u09BE product \u098F\u0995\u09AC\u09BE\u09B0\u0987 cart \u098F \u09B0\u09BE\u0996\u09A4\u09C7 \u09AA\u09BE\u09B0\u09AC\u09C7\n  @@unique([customerId, productId])\n}\n\n// \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n// AI TRACKING MODELS\n// \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n\n// User \u0995\u09BF search \u0995\u09B0\u09C7\u099B\u09C7 track \u0995\u09B0\u09C7\nmodel SearchLog {\n  id        String   @id @default(uuid())\n  query     String\n  createdAt DateTime @default(now())\n\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n  @@index([createdAt])\n}\n\n// User \u0995\u09CB\u09A8 medicine \u09A6\u09C7\u0996\u09C7\u099B\u09C7 track \u0995\u09B0\u09C7\nmodel ViewLog {\n  id        String   @id @default(uuid())\n  createdAt DateTime @default(now())\n\n  userId     String\n  user       User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  medicineId String\n  medicine   Medicines @relation(fields: [medicineId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n  @@index([medicineId])\n}\n\nmodel MedicineEmbedding {\n  id         String                       @id @default(uuid())\n  medicineId String                       @unique\n  medicine   Medicines                    @relation(fields: [medicineId], references: [id], onDelete: Cascade)\n  embedding  Unsupported("vector(1024)")? // 768 \u2192 1024\n  content    String\n  createdAt  DateTime                     @default(now())\n  updatedAt  DateTime                     @updatedAt\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"UserRole"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"medicines","kind":"object","type":"Medicines","relationName":"MedicinesToUser"},{"name":"orders","kind":"object","type":"Orders","relationName":"OrdersToUser"},{"name":"reviews","kind":"object","type":"Reviews","relationName":"ReviewsToUser"},{"name":"cards","kind":"object","type":"Card","relationName":"CardToUser"},{"name":"searchLogs","kind":"object","type":"SearchLog","relationName":"SearchLogToUser"},{"name":"viewLogs","kind":"object","type":"ViewLog","relationName":"UserToViewLog"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"Categories":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"categorieName","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"medicines","kind":"object","type":"Medicines","relationName":"CategoriesToMedicines"}],"dbName":null},"Medicines":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"medicineName","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Int"},{"name":"image","kind":"scalar","type":"String"},{"name":"stock","kind":"scalar","type":"Int"},{"name":"detels","kind":"scalar","type":"String"},{"name":"manufacturer","kind":"scalar","type":"String"},{"name":"uses","kind":"scalar","type":"String"},{"name":"sideEffects","kind":"scalar","type":"String"},{"name":"isVectored","kind":"scalar","type":"Boolean"},{"name":"vectoredAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sellerId","kind":"scalar","type":"String"},{"name":"seller","kind":"object","type":"User","relationName":"MedicinesToUser"},{"name":"categorieId","kind":"scalar","type":"String"},{"name":"categorie","kind":"object","type":"Categories","relationName":"CategoriesToMedicines"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"MedicinesToOrderItem"},{"name":"reviews","kind":"object","type":"Reviews","relationName":"MedicinesToReviews"},{"name":"cards","kind":"object","type":"Card","relationName":"CardToMedicines"},{"name":"viewLogs","kind":"object","type":"ViewLog","relationName":"MedicinesToViewLog"},{"name":"embedding","kind":"object","type":"MedicineEmbedding","relationName":"MedicineEmbeddingToMedicines"}],"dbName":null},"Orders":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"shippingAddress","kind":"scalar","type":"String"},{"name":"totalAmount","kind":"scalar","type":"Int"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"User","relationName":"OrdersToUser"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderItemToOrders"}],"dbName":null},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Int"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"order","kind":"object","type":"Orders","relationName":"OrderItemToOrders"},{"name":"productId","kind":"scalar","type":"String"},{"name":"product","kind":"object","type":"Medicines","relationName":"MedicinesToOrderItem"}],"dbName":null},"Reviews":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"User","relationName":"ReviewsToUser"},{"name":"productId","kind":"scalar","type":"String"},{"name":"product","kind":"object","type":"Medicines","relationName":"MedicinesToReviews"}],"dbName":null},"Card":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"User","relationName":"CardToUser"},{"name":"productId","kind":"scalar","type":"String"},{"name":"product","kind":"object","type":"Medicines","relationName":"CardToMedicines"}],"dbName":null},"SearchLog":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"query","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SearchLogToUser"}],"dbName":null},"ViewLog":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"UserToViewLog"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"medicine","kind":"object","type":"Medicines","relationName":"MedicinesToViewLog"}],"dbName":null},"MedicineEmbedding":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"medicine","kind":"object","type":"Medicines","relationName":"MedicineEmbeddingToMedicines"},{"name":"content","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","user","sessions","accounts","seller","medicines","_count","categorie","customer","items","order","product","orderItems","reviews","cards","medicine","viewLogs","embedding","orders","searchLogs","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","data","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","create","update","User.upsertOne","User.deleteOne","User.deleteMany","having","_min","_max","User.groupBy","User.aggregate","Session.findUnique","Session.findUniqueOrThrow","Session.findFirst","Session.findFirstOrThrow","Session.findMany","Session.createOne","Session.createMany","Session.createManyAndReturn","Session.updateOne","Session.updateMany","Session.updateManyAndReturn","Session.upsertOne","Session.deleteOne","Session.deleteMany","Session.groupBy","Session.aggregate","Account.findUnique","Account.findUniqueOrThrow","Account.findFirst","Account.findFirstOrThrow","Account.findMany","Account.createOne","Account.createMany","Account.createManyAndReturn","Account.updateOne","Account.updateMany","Account.updateManyAndReturn","Account.upsertOne","Account.deleteOne","Account.deleteMany","Account.groupBy","Account.aggregate","Verification.findUnique","Verification.findUniqueOrThrow","Verification.findFirst","Verification.findFirstOrThrow","Verification.findMany","Verification.createOne","Verification.createMany","Verification.createManyAndReturn","Verification.updateOne","Verification.updateMany","Verification.updateManyAndReturn","Verification.upsertOne","Verification.deleteOne","Verification.deleteMany","Verification.groupBy","Verification.aggregate","Categories.findUnique","Categories.findUniqueOrThrow","Categories.findFirst","Categories.findFirstOrThrow","Categories.findMany","Categories.createOne","Categories.createMany","Categories.createManyAndReturn","Categories.updateOne","Categories.updateMany","Categories.updateManyAndReturn","Categories.upsertOne","Categories.deleteOne","Categories.deleteMany","Categories.groupBy","Categories.aggregate","Medicines.findUnique","Medicines.findUniqueOrThrow","Medicines.findFirst","Medicines.findFirstOrThrow","Medicines.findMany","Medicines.createOne","Medicines.createMany","Medicines.createManyAndReturn","Medicines.updateOne","Medicines.updateMany","Medicines.updateManyAndReturn","Medicines.upsertOne","Medicines.deleteOne","Medicines.deleteMany","_avg","_sum","Medicines.groupBy","Medicines.aggregate","Orders.findUnique","Orders.findUniqueOrThrow","Orders.findFirst","Orders.findFirstOrThrow","Orders.findMany","Orders.createOne","Orders.createMany","Orders.createManyAndReturn","Orders.updateOne","Orders.updateMany","Orders.updateManyAndReturn","Orders.upsertOne","Orders.deleteOne","Orders.deleteMany","Orders.groupBy","Orders.aggregate","OrderItem.findUnique","OrderItem.findUniqueOrThrow","OrderItem.findFirst","OrderItem.findFirstOrThrow","OrderItem.findMany","OrderItem.createOne","OrderItem.createMany","OrderItem.createManyAndReturn","OrderItem.updateOne","OrderItem.updateMany","OrderItem.updateManyAndReturn","OrderItem.upsertOne","OrderItem.deleteOne","OrderItem.deleteMany","OrderItem.groupBy","OrderItem.aggregate","Reviews.findUnique","Reviews.findUniqueOrThrow","Reviews.findFirst","Reviews.findFirstOrThrow","Reviews.findMany","Reviews.createOne","Reviews.createMany","Reviews.createManyAndReturn","Reviews.updateOne","Reviews.updateMany","Reviews.updateManyAndReturn","Reviews.upsertOne","Reviews.deleteOne","Reviews.deleteMany","Reviews.groupBy","Reviews.aggregate","Card.findUnique","Card.findUniqueOrThrow","Card.findFirst","Card.findFirstOrThrow","Card.findMany","Card.createOne","Card.createMany","Card.createManyAndReturn","Card.updateOne","Card.updateMany","Card.updateManyAndReturn","Card.upsertOne","Card.deleteOne","Card.deleteMany","Card.groupBy","Card.aggregate","SearchLog.findUnique","SearchLog.findUniqueOrThrow","SearchLog.findFirst","SearchLog.findFirstOrThrow","SearchLog.findMany","SearchLog.createOne","SearchLog.createMany","SearchLog.createManyAndReturn","SearchLog.updateOne","SearchLog.updateMany","SearchLog.updateManyAndReturn","SearchLog.upsertOne","SearchLog.deleteOne","SearchLog.deleteMany","SearchLog.groupBy","SearchLog.aggregate","ViewLog.findUnique","ViewLog.findUniqueOrThrow","ViewLog.findFirst","ViewLog.findFirstOrThrow","ViewLog.findMany","ViewLog.createOne","ViewLog.createMany","ViewLog.createManyAndReturn","ViewLog.updateOne","ViewLog.updateMany","ViewLog.updateManyAndReturn","ViewLog.upsertOne","ViewLog.deleteOne","ViewLog.deleteMany","ViewLog.groupBy","ViewLog.aggregate","MedicineEmbedding.findUnique","MedicineEmbedding.findUniqueOrThrow","MedicineEmbedding.findFirst","MedicineEmbedding.findFirstOrThrow","MedicineEmbedding.findMany","MedicineEmbedding.createOne","MedicineEmbedding.createMany","MedicineEmbedding.createManyAndReturn","MedicineEmbedding.updateOne","MedicineEmbedding.updateMany","MedicineEmbedding.updateManyAndReturn","MedicineEmbedding.upsertOne","MedicineEmbedding.deleteOne","MedicineEmbedding.deleteMany","MedicineEmbedding.groupBy","MedicineEmbedding.aggregate","AND","OR","NOT","id","medicineId","content","createdAt","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","userId","query","quantity","customerId","productId","rating","comment","price","orderId","shippingAddress","totalAmount","OrderStatus","status","medicineName","image","stock","detels","manufacturer","uses","sideEffects","isVectored","vectoredAt","sellerId","categorieId","categorieName","every","some","none","identifier","value","expiresAt","accountId","providerId","accessToken","refreshToken","idToken","accessTokenExpiresAt","refreshTokenExpiresAt","scope","password","token","ipAddress","userAgent","name","email","emailVerified","UserRole","role","UserStatus","customerId_productId","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","increment","decrement","multiply","divide"]'),
  graph: "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_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_ACAJ7gEAAIsDADDvAQAAggEAEPABAACLAwAw8QEBAOwCACH0AUAA7QIAIfUBQADtAgAhnQIBAOwCACGeAgEA7AIAIZ8CQADtAgAhAAMAAACCAQAgAQAAgwEAMAIAAH8AIAMAAACCAQAgAQAAgwEAMAIAAH8AIAMAAACCAQAgAQAAgwEAMAIAAH8AIAbxAQEAAAAB9AFAAAAAAfUBQAAAAAGdAgEAAAABngIBAAAAAZ8CQAAAAAEBGwAAhwEAIAbxAQEAAAAB9AFAAAAAAfUBQAAAAAGdAgEAAAABngIBAAAAAZ8CQAAAAAEBGwAAiQEAMAEbAACJAQAwBvEBAQC1AwAh9AFAALYDACH1AUAAtgMAIZ0CAQC1AwAhngIBALUDACGfAkAAtgMAIQIAAAB_ACAbAACMAQAgBvEBAQC1AwAh9AFAALYDACH1AUAAtgMAIZ0CAQC1AwAhngIBALUDACGfAkAAtgMAIQIAAACCAQAgGwAAjgEAIAIAAACCAQAgGwAAjgEAIAMAAAB_ACAiAACHAQAgIwAAjAEAIAEAAAB_ACABAAAAggEAIAMIAADTBAAgKAAA1QQAICkAANQEACAJ7gEAAIoDADDvAQAAlQEAEPABAACKAwAw8QEBAOQCACH0AUAA5QIAIfUBQADlAgAhnQIBAOQCACGeAgEA5AIAIZ8CQADlAgAhAwAAAIIBACABAACUAQAwJwAAlQEAIAMAAACCAQAgAQAAgwEAMAIAAH8AIAkHAACJAwAg7gEAAIcDADDvAQAAmwEAEPABAACHAwAw8QEBAAAAAfQBQADtAgAh9QFAAO0CACGPAgEAiAMAIZkCAQDsAgAhAQAAAJgBACABAAAAmAEAIAkHAACJAwAg7gEAAIcDADDvAQAAmwEAEPABAACHAwAw8QEBAOwCACH0AUAA7QIAIfUBQADtAgAhjwIBAIgDACGZAgEA7AIAIQIHAADSBAAgjwIAANADACADAAAAmwEAIAEAAJwBADACAACYAQAgAwAAAJsBACABAACcAQAwAgAAmAEAIAMAAACbAQAgAQAAnAEAMAIAAJgBACAGBwAA0QQAIPEBAQAAAAH0AUAAAAAB9QFAAAAAAY8CAQAAAAGZAgEAAAABARsAAKABACAF8QEBAAAAAfQBQAAAAAH1AUAAAAABjwIBAAAAAZkCAQAAAAEBGwAAogEAMAEbAACiAQAwBgcAAMQEACDxAQEAtQMAIfQBQAC2AwAh9QFAALYDACGPAgEA1gMAIZkCAQC1AwAhAgAAAJgBACAbAAClAQAgBfEBAQC1AwAh9AFAALYDACH1AUAAtgMAIY8CAQDWAwAhmQIBALUDACECAAAAmwEAIBsAAKcBACACAAAAmwEAIBsAAKcBACADAAAAmAEAICIAAKABACAjAAClAQAgAQAAAJgBACABAAAAmwEAIAQIAADBBAAgKAAAwwQAICkAAMIEACCPAgAA0AMAIAjuAQAAhgMAMO8BAACuAQAQ8AEAAIYDADDxAQEA5AIAIfQBQADlAgAh9QFAAOUCACGPAgEA9gIAIZkCAQDkAgAhAwAAAJsBACABAACtAQAwJwAArgEAIAMAAACbAQAgAQAAnAEAMAIAAJgBACABAAAADQAgAQAAAA0AIAMAAAALACABAAAMADACAAANACADAAAACwAgAQAADAAwAgAADQAgAwAAAAsAIAEAAAwAMAIAAA0AIBYGAAC6BAAgCQAAuwQAIA4AALwEACAPAAC9BAAgEAAAvgQAIBIAAL8EACATAADABAAg8QEBAAAAAfQBQAAAAAH1AUAAAAABiAICAAAAAY4CAQAAAAGPAgEAAAABkAICAAAAAZECAQAAAAGSAgEAAAABkwIBAAAAAZQCAQAAAAGVAiAAAAABlgJAAAAAAZcCAQAAAAGYAgEAAAABARsAALYBACAP8QEBAAAAAfQBQAAAAAH1AUAAAAABiAICAAAAAY4CAQAAAAGPAgEAAAABkAICAAAAAZECAQAAAAGSAgEAAAABkwIBAAAAAZQCAQAAAAGVAiAAAAABlgJAAAAAAZcCAQAAAAGYAgEAAAABARsAALgBADABGwAAuAEAMBYGAACBBAAgCQAAggQAIA4AAIMEACAPAACEBAAgEAAAhQQAIBIAAIYEACATAACHBAAg8QEBALUDACH0AUAAtgMAIfUBQAC2AwAhiAICAMsDACGOAgEAtQMAIY8CAQDWAwAhkAICAMsDACGRAgEAtQMAIZICAQC1AwAhkwIBANYDACGUAgEA1gMAIZUCIAD_AwAhlgJAAIAEACGXAgEAtQMAIZgCAQC1AwAhAgAAAA0AIBsAALsBACAP8QEBALUDACH0AUAAtgMAIfUBQAC2AwAhiAICAMsDACGOAgEAtQMAIY8CAQDWAwAhkAICAMsDACGRAgEAtQMAIZICAQC1AwAhkwIBANYDACGUAgEA1gMAIZUCIAD_AwAhlgJAAIAEACGXAgEAtQMAIZgCAQC1AwAhAgAAAAsAIBsAAL0BACACAAAACwAgGwAAvQEAIAMAAAANACAiAAC2AQAgIwAAuwEAIAEAAAANACABAAAACwAgCQgAAPoDACAoAAD9AwAgKQAA_AMAIHoAAPsDACB7AAD-AwAgjwIAANADACCTAgAA0AMAIJQCAADQAwAglgIAANADACAS7gEAAP8CADDvAQAAxAEAEPABAAD_AgAw8QEBAOQCACH0AUAA5QIAIfUBQADlAgAhiAICAPICACGOAgEA5AIAIY8CAQD2AgAhkAICAPICACGRAgEA5AIAIZICAQDkAgAhkwIBAPYCACGUAgEA9gIAIZUCIACAAwAhlgJAAIEDACGXAgEA5AIAIZgCAQDkAgAhAwAAAAsAIAEAAMMBADAnAADEAQAgAwAAAAsAIAEAAAwAMAIAAA0AIAEAAAArACABAAAAKwAgAwAAACkAIAEAACoAMAIAACsAIAMAAAApACABAAAqADACAAArACADAAAAKQAgAQAAKgAwAgAAKwAgCQoAAPgDACALAAD5AwAg8QEBAAAAAfQBQAAAAAH1AUAAAAABhAIBAAAAAYoCAQAAAAGLAgIAAAABjQIAAACNAgIBGwAAzAEAIAfxAQEAAAAB9AFAAAAAAfUBQAAAAAGEAgEAAAABigIBAAAAAYsCAgAAAAGNAgAAAI0CAgEbAADOAQAwARsAAM4BADAJCgAA6gMAIAsAAOsDACDxAQEAtQMAIfQBQAC2AwAh9QFAALYDACGEAgEAtQMAIYoCAQC1AwAhiwICAMsDACGNAgAA6QONAiICAAAAKwAgGwAA0QEAIAfxAQEAtQMAIfQBQAC2AwAh9QFAALYDACGEAgEAtQMAIYoCAQC1AwAhiwICAMsDACGNAgAA6QONAiICAAAAKQAgGwAA0wEAIAIAAAApACAbAADTAQAgAwAAACsAICIAAMwBACAjAADRAQAgAQAAACsAIAEAAAApACAFCAAA5AMAICgAAOcDACApAADmAwAgegAA5QMAIHsAAOgDACAK7gEAAPsCADDvAQAA2gEAEPABAAD7AgAw8QEBAOQCACH0AUAA5QIAIfUBQADlAgAhhAIBAOQCACGKAgEA5AIAIYsCAgDyAgAhjQIAAPwCjQIiAwAAACkAIAEAANkBADAnAADaAQAgAwAAACkAIAEAACoAMAIAACsAIAEAAAATACABAAAAEwAgAwAAABEAIAEAABIAMAIAABMAIAMAAAARACABAAASADACAAATACADAAAAEQAgAQAAEgAwAgAAEwAgBwwAAOIDACANAADjAwAg8QEBAAAAAYMCAgAAAAGFAgEAAAABiAICAAAAAYkCAQAAAAEBGwAA4gEAIAXxAQEAAAABgwICAAAAAYUCAQAAAAGIAgIAAAABiQIBAAAAAQEbAADkAQAwARsAAOQBADAHDAAA4AMAIA0AAOEDACDxAQEAtQMAIYMCAgDLAwAhhQIBALUDACGIAgIAywMAIYkCAQC1AwAhAgAAABMAIBsAAOcBACAF8QEBALUDACGDAgIAywMAIYUCAQC1AwAhiAICAMsDACGJAgEAtQMAIQIAAAARACAbAADpAQAgAgAAABEAIBsAAOkBACADAAAAEwAgIgAA4gEAICMAAOcBACABAAAAEwAgAQAAABEAIAUIAADbAwAgKAAA3gMAICkAAN0DACB6AADcAwAgewAA3wMAIAjuAQAA-gIAMO8BAADwAQAQ8AEAAPoCADDxAQEA5AIAIYMCAgDyAgAhhQIBAOQCACGIAgIA8gIAIYkCAQDkAgAhAwAAABEAIAEAAO8BADAnAADwAQAgAwAAABEAIAEAABIAMAIAABMAIAEAAAAZACABAAAAGQAgAwAAABcAIAEAABgAMAIAABkAIAMAAAAXACABAAAYADACAAAZACADAAAAFwAgAQAAGAAwAgAAGQAgCQoAANkDACANAADaAwAg8QEBAAAAAfQBQAAAAAH1AUAAAAABhAIBAAAAAYUCAQAAAAGGAgIAAAABhwIBAAAAAQEbAAD4AQAgB_EBAQAAAAH0AUAAAAAB9QFAAAAAAYQCAQAAAAGFAgEAAAABhgICAAAAAYcCAQAAAAEBGwAA-gEAMAEbAAD6AQAwCQoAANcDACANAADYAwAg8QEBALUDACH0AUAAtgMAIfUBQAC2AwAhhAIBALUDACGFAgEAtQMAIYYCAgDLAwAhhwIBANYDACECAAAAGQAgGwAA_QEAIAfxAQEAtQMAIfQBQAC2AwAh9QFAALYDACGEAgEAtQMAIYUCAQC1AwAhhgICAMsDACGHAgEA1gMAIQIAAAAXACAbAAD_AQAgAgAAABcAIBsAAP8BACADAAAAGQAgIgAA-AEAICMAAP0BACABAAAAGQAgAQAAABcAIAYIAADRAwAgKAAA1AMAICkAANMDACB6AADSAwAgewAA1QMAIIcCAADQAwAgCu4BAAD1AgAw7wEAAIYCABDwAQAA9QIAMPEBAQDkAgAh9AFAAOUCACH1AUAA5QIAIYQCAQDkAgAhhQIBAOQCACGGAgIA8gIAIYcCAQD2AgAhAwAAABcAIAEAAIUCADAnAACGAgAgAwAAABcAIAEAABgAMAIAABkAIAEAAAAdACABAAAAHQAgAwAAABsAIAEAABwAMAIAAB0AIAMAAAAbACABAAAcADACAAAdACADAAAAGwAgAQAAHAAwAgAAHQAgBgoAAM4DACANAADPAwAg8QEBAAAAAYMCAgAAAAGEAgEAAAABhQIBAAAAAQEbAACOAgAgBPEBAQAAAAGDAgIAAAABhAIBAAAAAYUCAQAAAAEBGwAAkAIAMAEbAACQAgAwBgoAAMwDACANAADNAwAg8QEBALUDACGDAgIAywMAIYQCAQC1AwAhhQIBALUDACECAAAAHQAgGwAAkwIAIATxAQEAtQMAIYMCAgDLAwAhhAIBALUDACGFAgEAtQMAIQIAAAAbACAbAACVAgAgAgAAABsAIBsAAJUCACADAAAAHQAgIgAAjgIAICMAAJMCACABAAAAHQAgAQAAABsAIAUIAADGAwAgKAAAyQMAICkAAMgDACB6AADHAwAgewAAygMAIAfuAQAA8QIAMO8BAACcAgAQ8AEAAPECADDxAQEA5AIAIYMCAgDyAgAhhAIBAOQCACGFAgEA5AIAIQMAAAAbACABAACbAgAwJwAAnAIAIAMAAAAbACABAAAcADACAAAdACABAAAAMQAgAQAAADEAIAMAAAAvACABAAAwADACAAAxACADAAAALwAgAQAAMAAwAgAAMQAgAwAAAC8AIAEAADAAMAIAADEAIAUDAADFAwAg8QEBAAAAAfQBQAAAAAGBAgEAAAABggIBAAAAAQEbAACkAgAgBPEBAQAAAAH0AUAAAAABgQIBAAAAAYICAQAAAAEBGwAApgIAMAEbAACmAgAwBQMAAMQDACDxAQEAtQMAIfQBQAC2AwAhgQIBALUDACGCAgEAtQMAIQIAAAAxACAbAACpAgAgBPEBAQC1AwAh9AFAALYDACGBAgEAtQMAIYICAQC1AwAhAgAAAC8AIBsAAKsCACACAAAALwAgGwAAqwIAIAMAAAAxACAiAACkAgAgIwAAqQIAIAEAAAAxACABAAAALwAgAwgAAMEDACAoAADDAwAgKQAAwgMAIAfuAQAA8AIAMO8BAACyAgAQ8AEAAPACADDxAQEA5AIAIfQBQADlAgAhgQIBAOQCACGCAgEA5AIAIQMAAAAvACABAACxAgAwJwAAsgIAIAMAAAAvACABAAAwADACAAAxACABAAAAIQAgAQAAACEAIAMAAAAfACABAAAgADACAAAhACADAAAAHwAgAQAAIAAwAgAAIQAgAwAAAB8AIAEAACAAMAIAACEAIAYDAAC_AwAgEQAAwAMAIPEBAQAAAAHyAQEAAAAB9AFAAAAAAYECAQAAAAEBGwAAugIAIATxAQEAAAAB8gEBAAAAAfQBQAAAAAGBAgEAAAABARsAALwCADABGwAAvAIAMAYDAAC9AwAgEQAAvgMAIPEBAQC1AwAh8gEBALUDACH0AUAAtgMAIYECAQC1AwAhAgAAACEAIBsAAL8CACAE8QEBALUDACHyAQEAtQMAIfQBQAC2AwAhgQIBALUDACECAAAAHwAgGwAAwQIAIAIAAAAfACAbAADBAgAgAwAAACEAICIAALoCACAjAAC_AgAgAQAAACEAIAEAAAAfACADCAAAugMAICgAALwDACApAAC7AwAgB-4BAADvAgAw7wEAAMgCABDwAQAA7wIAMPEBAQDkAgAh8gEBAOQCACH0AUAA5QIAIYECAQDkAgAhAwAAAB8AIAEAAMcCADAnAADIAgAgAwAAAB8AIAEAACAAMAIAACEAIAkRAADuAgAg7gEAAOsCADDvAQAAIwAQ8AEAAOsCADDxAQEAAAAB8gEBAAAAAfMBAQDsAgAh9AFAAO0CACH1AUAA7QIAIQEAAADLAgAgAQAAAMsCACABEQAAuQMAIAMAAAAjACABAADOAgAwAgAAywIAIAMAAAAjACABAADOAgAwAgAAywIAIAMAAAAjACABAADOAgAwAgAAywIAIAYRAAC4AwAg8QEBAAAAAfIBAQAAAAHzAQEAAAAB9AFAAAAAAfUBQAAAAAEBGwAA0gIAIAXxAQEAAAAB8gEBAAAAAfMBAQAAAAH0AUAAAAAB9QFAAAAAAQEbAADUAgAwARsAANQCADAGEQAAtwMAIPEBAQC1AwAh8gEBALUDACHzAQEAtQMAIfQBQAC2AwAh9QFAALYDACECAAAAywIAIBsAANcCACAF8QEBALUDACHyAQEAtQMAIfMBAQC1AwAh9AFAALYDACH1AUAAtgMAIQIAAAAjACAbAADZAgAgAgAAACMAIBsAANkCACADAAAAywIAICIAANICACAjAADXAgAgAQAAAMsCACABAAAAIwAgAwgAALIDACAoAAC0AwAgKQAAswMAIAjuAQAA4wIAMO8BAADgAgAQ8AEAAOMCADDxAQEA5AIAIfIBAQDkAgAh8wEBAOQCACH0AUAA5QIAIfUBQADlAgAhAwAAACMAIAEAAN8CADAnAADgAgAgAwAAACMAIAEAAM4CADACAADLAgAgCO4BAADjAgAw7wEAAOACABDwAQAA4wIAMPEBAQDkAgAh8gEBAOQCACHzAQEA5AIAIfQBQADlAgAh9QFAAOUCACEOCAAA5wIAICgAAOoCACApAADqAgAg9gEBAAAAAfcBAQAAAAT4AQEAAAAE-QEBAAAAAfoBAQAAAAH7AQEAAAAB_AEBAAAAAf0BAQDpAgAh_gEBAAAAAf8BAQAAAAGAAgEAAAABCwgAAOcCACAoAADoAgAgKQAA6AIAIPYBQAAAAAH3AUAAAAAE-AFAAAAABPkBQAAAAAH6AUAAAAAB-wFAAAAAAfwBQAAAAAH9AUAA5gIAIQsIAADnAgAgKAAA6AIAICkAAOgCACD2AUAAAAAB9wFAAAAABPgBQAAAAAT5AUAAAAAB-gFAAAAAAfsBQAAAAAH8AUAAAAAB_QFAAOYCACEI9gECAAAAAfcBAgAAAAT4AQIAAAAE-QECAAAAAfoBAgAAAAH7AQIAAAAB_AECAAAAAf0BAgDnAgAhCPYBQAAAAAH3AUAAAAAE-AFAAAAABPkBQAAAAAH6AUAAAAAB-wFAAAAAAfwBQAAAAAH9AUAA6AIAIQ4IAADnAgAgKAAA6gIAICkAAOoCACD2AQEAAAAB9wEBAAAABPgBAQAAAAT5AQEAAAAB-gEBAAAAAfsBAQAAAAH8AQEAAAAB_QEBAOkCACH-AQEAAAAB_wEBAAAAAYACAQAAAAEL9gEBAAAAAfcBAQAAAAT4AQEAAAAE-QEBAAAAAfoBAQAAAAH7AQEAAAAB_AEBAAAAAf0BAQDqAgAh_gEBAAAAAf8BAQAAAAGAAgEAAAABCREAAO4CACDuAQAA6wIAMO8BAAAjABDwAQAA6wIAMPEBAQDsAgAh8gEBAOwCACHzAQEA7AIAIfQBQADtAgAh9QFAAO0CACEL9gEBAAAAAfcBAQAAAAT4AQEAAAAE-QEBAAAAAfoBAQAAAAH7AQEAAAAB_AEBAAAAAf0BAQDqAgAh_gEBAAAAAf8BAQAAAAGAAgEAAAABCPYBQAAAAAH3AUAAAAAE-AFAAAAABPkBQAAAAAH6AUAAAAAB-wFAAAAAAfwBQAAAAAH9AUAA6AIAIRsGAAChAwAgCQAArgMAIA4AAKUDACAPAACcAwAgEAAAnQMAIBIAAJ8DACATAACvAwAg7gEAAKwDADDvAQAACwAQ8AEAAKwDADDxAQEA7AIAIfQBQADtAgAh9QFAAO0CACGIAgIAowMAIY4CAQDsAgAhjwIBAIgDACGQAgIAowMAIZECAQDsAgAhkgIBAOwCACGTAgEAiAMAIZQCAQCIAwAhlQIgAJYDACGWAkAArQMAIZcCAQDsAgAhmAIBAOwCACGzAgAACwAgtAIAAAsAIAfuAQAA7wIAMO8BAADIAgAQ8AEAAO8CADDxAQEA5AIAIfIBAQDkAgAh9AFAAOUCACGBAgEA5AIAIQfuAQAA8AIAMO8BAACyAgAQ8AEAAPACADDxAQEA5AIAIfQBQADlAgAhgQIBAOQCACGCAgEA5AIAIQfuAQAA8QIAMO8BAACcAgAQ8AEAAPECADDxAQEA5AIAIYMCAgDyAgAhhAIBAOQCACGFAgEA5AIAIQ0IAADnAgAgKAAA5wIAICkAAOcCACB6AAD0AgAgewAA5wIAIPYBAgAAAAH3AQIAAAAE-AECAAAABPkBAgAAAAH6AQIAAAAB-wECAAAAAfwBAgAAAAH9AQIA8wIAIQ0IAADnAgAgKAAA5wIAICkAAOcCACB6AAD0AgAgewAA5wIAIPYBAgAAAAH3AQIAAAAE-AECAAAABPkBAgAAAAH6AQIAAAAB-wECAAAAAfwBAgAAAAH9AQIA8wIAIQj2AQgAAAAB9wEIAAAABPgBCAAAAAT5AQgAAAAB-gEIAAAAAfsBCAAAAAH8AQgAAAAB_QEIAPQCACEK7gEAAPUCADDvAQAAhgIAEPABAAD1AgAw8QEBAOQCACH0AUAA5QIAIfUBQADlAgAhhAIBAOQCACGFAgEA5AIAIYYCAgDyAgAhhwIBAPYCACEOCAAA-AIAICgAAPkCACApAAD5AgAg9gEBAAAAAfcBAQAAAAX4AQEAAAAF-QEBAAAAAfoBAQAAAAH7AQEAAAAB_AEBAAAAAf0BAQD3AgAh_gEBAAAAAf8BAQAAAAGAAgEAAAABDggAAPgCACAoAAD5AgAgKQAA-QIAIPYBAQAAAAH3AQEAAAAF-AEBAAAABfkBAQAAAAH6AQEAAAAB-wEBAAAAAfwBAQAAAAH9AQEA9wIAIf4BAQAAAAH_AQEAAAABgAIBAAAAAQj2AQIAAAAB9wECAAAABfgBAgAAAAX5AQIAAAAB-gECAAAAAfsBAgAAAAH8AQIAAAAB_QECAPgCACEL9gEBAAAAAfcBAQAAAAX4AQEAAAAF-QEBAAAAAfoBAQAAAAH7AQEAAAAB_AEBAAAAAf0BAQD5AgAh_gEBAAAAAf8BAQAAAAGAAgEAAAABCO4BAAD6AgAw7wEAAPABABDwAQAA-gIAMPEBAQDkAgAhgwICAPICACGFAgEA5AIAIYgCAgDyAgAhiQIBAOQCACEK7gEAAPsCADDvAQAA2gEAEPABAAD7AgAw8QEBAOQCACH0AUAA5QIAIfUBQADlAgAhhAIBAOQCACGKAgEA5AIAIYsCAgDyAgAhjQIAAPwCjQIiBwgAAOcCACAoAAD-AgAgKQAA_gIAIPYBAAAAjQIC9wEAAACNAgj4AQAAAI0CCP0BAAD9Ao0CIgcIAADnAgAgKAAA_gIAICkAAP4CACD2AQAAAI0CAvcBAAAAjQII-AEAAACNAgj9AQAA_QKNAiIE9gEAAACNAgL3AQAAAI0CCPgBAAAAjQII_QEAAP4CjQIiEu4BAAD_AgAw7wEAAMQBABDwAQAA_wIAMPEBAQDkAgAh9AFAAOUCACH1AUAA5QIAIYgCAgDyAgAhjgIBAOQCACGPAgEA9gIAIZACAgDyAgAhkQIBAOQCACGSAgEA5AIAIZMCAQD2AgAhlAIBAPYCACGVAiAAgAMAIZYCQACBAwAhlwIBAOQCACGYAgEA5AIAIQUIAADnAgAgKAAAhQMAICkAAIUDACD2ASAAAAAB_QEgAIQDACELCAAA-AIAICgAAIMDACApAACDAwAg9gFAAAAAAfcBQAAAAAX4AUAAAAAF-QFAAAAAAfoBQAAAAAH7AUAAAAAB_AFAAAAAAf0BQACCAwAhCwgAAPgCACAoAACDAwAgKQAAgwMAIPYBQAAAAAH3AUAAAAAF-AFAAAAABfkBQAAAAAH6AUAAAAAB-wFAAAAAAfwBQAAAAAH9AUAAggMAIQj2AUAAAAAB9wFAAAAABfgBQAAAAAX5AUAAAAAB-gFAAAAAAfsBQAAAAAH8AUAAAAAB_QFAAIMDACEFCAAA5wIAICgAAIUDACApAACFAwAg9gEgAAAAAf0BIACEAwAhAvYBIAAAAAH9ASAAhQMAIQjuAQAAhgMAMO8BAACuAQAQ8AEAAIYDADDxAQEA5AIAIfQBQADlAgAh9QFAAOUCACGPAgEA9gIAIZkCAQDkAgAhCQcAAIkDACDuAQAAhwMAMO8BAACbAQAQ8AEAAIcDADDxAQEA7AIAIfQBQADtAgAh9QFAAO0CACGPAgEAiAMAIZkCAQDsAgAhC_YBAQAAAAH3AQEAAAAF-AEBAAAABfkBAQAAAAH6AQEAAAAB-wEBAAAAAfwBAQAAAAH9AQEA-QIAIf4BAQAAAAH_AQEAAAABgAIBAAAAAQOaAgAACwAgmwIAAAsAIJwCAAALACAJ7gEAAIoDADDvAQAAlQEAEPABAACKAwAw8QEBAOQCACH0AUAA5QIAIfUBQADlAgAhnQIBAOQCACGeAgEA5AIAIZ8CQADlAgAhCe4BAACLAwAw7wEAAIIBABDwAQAAiwMAMPEBAQDsAgAh9AFAAO0CACH1AUAA7QIAIZ0CAQDsAgAhngIBAOwCACGfAkAA7QIAIRDuAQAAjAMAMO8BAAB8ABDwAQAAjAMAMPEBAQDkAgAh9AFAAOUCACH1AUAA5QIAIYECAQDkAgAhoAIBAOQCACGhAgEA5AIAIaICAQD2AgAhowIBAPYCACGkAgEA9gIAIaUCQACBAwAhpgJAAIEDACGnAgEA9gIAIagCAQD2AgAhC-4BAACNAwAw7wEAAGYAEPABAACNAwAw8QEBAOQCACH0AUAA5QIAIfUBQADlAgAhgQIBAOQCACGfAkAA5QIAIakCAQDkAgAhqgIBAPYCACGrAgEA9gIAIQzuAQAAjgMAMO8BAABQABDwAQAAjgMAMPEBAQDkAgAh9AFAAOUCACH1AUAA5QIAIY0CAACQA7ICIo8CAQD2AgAhrAIBAOQCACGtAgEA5AIAIa4CIACAAwAhsAIAAI8DsAIiBwgAAOcCACAoAACUAwAgKQAAlAMAIPYBAAAAsAIC9wEAAACwAgj4AQAAALACCP0BAACTA7ACIgcIAADnAgAgKAAAkgMAICkAAJIDACD2AQAAALICAvcBAAAAsgII-AEAAACyAgj9AQAAkQOyAiIHCAAA5wIAICgAAJIDACApAACSAwAg9gEAAACyAgL3AQAAALICCPgBAAAAsgII_QEAAJEDsgIiBPYBAAAAsgIC9wEAAACyAgj4AQAAALICCP0BAACSA7ICIgcIAADnAgAgKAAAlAMAICkAAJQDACD2AQAAALACAvcBAAAAsAII-AEAAACwAgj9AQAAkwOwAiIE9gEAAACwAgL3AQAAALACCPgBAAAAsAII_QEAAJQDsAIiFAQAAJkDACAFAACaAwAgBwAAiQMAIA8AAJwDACAQAACdAwAgEgAAnwMAIBQAAJsDACAVAACeAwAg7gEAAJUDADDvAQAAPQAQ8AEAAJUDADDxAQEA7AIAIfQBQADtAgAh9QFAAO0CACGNAgAAmAOyAiKPAgEAiAMAIawCAQDsAgAhrQIBAOwCACGuAiAAlgMAIbACAACXA7ACIgL2ASAAAAAB_QEgAIUDACEE9gEAAACwAgL3AQAAALACCPgBAAAAsAII_QEAAJQDsAIiBPYBAAAAsgIC9wEAAACyAgj4AQAAALICCP0BAACSA7ICIgOaAgAAAwAgmwIAAAMAIJwCAAADACADmgIAAAcAIJsCAAAHACCcAgAABwAgA5oCAAApACCbAgAAKQAgnAIAACkAIAOaAgAAFwAgmwIAABcAIJwCAAAXACADmgIAABsAIJsCAAAbACCcAgAAGwAgA5oCAAAvACCbAgAALwAgnAIAAC8AIAOaAgAAHwAgmwIAAB8AIJwCAAAfACAIAwAAoQMAIO4BAACgAwAw7wEAAC8AEPABAACgAwAw8QEBAOwCACH0AUAA7QIAIYECAQDsAgAhggIBAOwCACEWBAAAmQMAIAUAAJoDACAHAACJAwAgDwAAnAMAIBAAAJ0DACASAACfAwAgFAAAmwMAIBUAAJ4DACDuAQAAlQMAMO8BAAA9ABDwAQAAlQMAMPEBAQDsAgAh9AFAAO0CACH1AUAA7QIAIY0CAACYA7ICIo8CAQCIAwAhrAIBAOwCACGtAgEA7AIAIa4CIACWAwAhsAIAAJcDsAIiswIAAD0AILQCAAA9ACAMCgAAoQMAIAsAAKUDACDuAQAAogMAMO8BAAApABDwAQAAogMAMPEBAQDsAgAh9AFAAO0CACH1AUAA7QIAIYQCAQDsAgAhigIBAOwCACGLAgIAowMAIY0CAACkA40CIgj2AQIAAAAB9wECAAAABPgBAgAAAAT5AQIAAAAB-gECAAAAAfsBAgAAAAH8AQIAAAAB_QECAOcCACEE9gEAAACNAgL3AQAAAI0CCPgBAAAAjQII_QEAAP4CjQIiA5oCAAARACCbAgAAEQAgnAIAABEAIAkDAAChAwAgEQAA7gIAIO4BAACmAwAw7wEAAB8AEPABAACmAwAw8QEBAOwCACHyAQEA7AIAIfQBQADtAgAhgQIBAOwCACEChAIBAAAAAYUCAQAAAAEJCgAAoQMAIA0AAO4CACDuAQAAqAMAMO8BAAAbABDwAQAAqAMAMPEBAQDsAgAhgwICAKMDACGEAgEA7AIAIYUCAQDsAgAhDAoAAKEDACANAADuAgAg7gEAAKkDADDvAQAAFwAQ8AEAAKkDADDxAQEA7AIAIfQBQADtAgAh9QFAAO0CACGEAgEA7AIAIYUCAQDsAgAhhgICAKMDACGHAgEAiAMAIQoMAACrAwAgDQAA7gIAIO4BAACqAwAw7wEAABEAEPABAACqAwAw8QEBAOwCACGDAgIAowMAIYUCAQDsAgAhiAICAKMDACGJAgEA7AIAIQ4KAAChAwAgCwAApQMAIO4BAACiAwAw7wEAACkAEPABAACiAwAw8QEBAOwCACH0AUAA7QIAIfUBQADtAgAhhAIBAOwCACGKAgEA7AIAIYsCAgCjAwAhjQIAAKQDjQIiswIAACkAILQCAAApACAZBgAAoQMAIAkAAK4DACAOAAClAwAgDwAAnAMAIBAAAJ0DACASAACfAwAgEwAArwMAIO4BAACsAwAw7wEAAAsAEPABAACsAwAw8QEBAOwCACH0AUAA7QIAIfUBQADtAgAhiAICAKMDACGOAgEA7AIAIY8CAQCIAwAhkAICAKMDACGRAgEA7AIAIZICAQDsAgAhkwIBAIgDACGUAgEAiAMAIZUCIACWAwAhlgJAAK0DACGXAgEA7AIAIZgCAQDsAgAhCPYBQAAAAAH3AUAAAAAF-AFAAAAABfkBQAAAAAH6AUAAAAAB-wFAAAAAAfwBQAAAAAH9AUAAgwMAIQsHAACJAwAg7gEAAIcDADDvAQAAmwEAEPABAACHAwAw8QEBAOwCACH0AUAA7QIAIfUBQADtAgAhjwIBAIgDACGZAgEA7AIAIbMCAACbAQAgtAIAAJsBACALEQAA7gIAIO4BAADrAgAw7wEAACMAEPABAADrAgAw8QEBAOwCACHyAQEA7AIAIfMBAQDsAgAh9AFAAO0CACH1AUAA7QIAIbMCAAAjACC0AgAAIwAgEQMAAKEDACDuAQAAsAMAMO8BAAAHABDwAQAAsAMAMPEBAQDsAgAh9AFAAO0CACH1AUAA7QIAIYECAQDsAgAhoAIBAOwCACGhAgEA7AIAIaICAQCIAwAhowIBAIgDACGkAgEAiAMAIaUCQACtAwAhpgJAAK0DACGnAgEAiAMAIagCAQCIAwAhDAMAAKEDACDuAQAAsQMAMO8BAAADABDwAQAAsQMAMPEBAQDsAgAh9AFAAO0CACH1AUAA7QIAIYECAQDsAgAhnwJAAO0CACGpAgEA7AIAIaoCAQCIAwAhqwIBAIgDACEAAAABuAIBAAAAAQG4AkAAAAABBSIAAKkGACAjAACsBgAgtQIAAKoGACC2AgAAqwYAILsCAAANACADIgAAqQYAILUCAACqBgAguwIAAA0AIAsGAADQBQAgCQAA0wUAIA4AANEFACAPAADMBQAgEAAAzQUAIBIAAM8FACATAADUBQAgjwIAANADACCTAgAA0AMAIJQCAADQAwAglgIAANADACAAAAAFIgAAoQYAICMAAKcGACC1AgAAogYAILYCAACmBgAguwIAAAEAIAUiAACfBgAgIwAApAYAILUCAACgBgAgtgIAAKMGACC7AgAADQAgAyIAAKEGACC1AgAAogYAILsCAAABACADIgAAnwYAILUCAACgBgAguwIAAA0AIAAAAAUiAACaBgAgIwAAnQYAILUCAACbBgAgtgIAAJwGACC7AgAAAQAgAyIAAJoGACC1AgAAmwYAILsCAAABACAAAAAAAAW4AgIAAAABvgICAAAAAb8CAgAAAAHAAgIAAAABwQICAAAAAQUiAACSBgAgIwAAmAYAILUCAACTBgAgtgIAAJcGACC7AgAAAQAgBSIAAJAGACAjAACVBgAgtQIAAJEGACC2AgAAlAYAILsCAAANACADIgAAkgYAILUCAACTBgAguwIAAAEAIAMiAACQBgAgtQIAAJEGACC7AgAADQAgAAAAAAAAAbgCAQAAAAEFIgAAiAYAICMAAI4GACC1AgAAiQYAILYCAACNBgAguwIAAAEAIAUiAACGBgAgIwAAiwYAILUCAACHBgAgtgIAAIoGACC7AgAADQAgAyIAAIgGACC1AgAAiQYAILsCAAABACADIgAAhgYAILUCAACHBgAguwIAAA0AIAAAAAAABSIAAP4FACAjAACEBgAgtQIAAP8FACC2AgAAgwYAILsCAAArACAFIgAA_AUAICMAAIEGACC1AgAA_QUAILYCAACABgAguwIAAA0AIAMiAAD-BQAgtQIAAP8FACC7AgAAKwAgAyIAAPwFACC1AgAA_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_wMAIZYCQACABAAhlwIBALUDACEUBgAAgQQAIA4AAIMEACAPAACEBAAgEAAAhQQAIBIAAIYEACATAACHBAAg8QEBALUDACH0AUAAtgMAIfUBQAC2AwAhiAICAMsDACGOAgEAtQMAIY8CAQDWAwAhkAICAMsDACGRAgEAtQMAIZICAQC1AwAhkwIBANYDACGUAgEA1gMAIZUCIAD_AwAhlgJAAIAEACGXAgEAtQMAIRQGAAC6BAAgDgAAvAQAIA8AAL0EACAQAAC-BAAgEgAAvwQAIBMAAMAEACDxAQEAAAAB9AFAAAAAAfUBQAAAAAGIAgIAAAABjgIBAAAAAY8CAQAAAAGQAgIAAAABkQIBAAAAAZICAQAAAAGTAgEAAAABlAIBAAAAAZUCIAAAAAGWAkAAAAABlwIBAAAAAQQiAADFBAAwtQIAAMYEADC3AgAAyAQAILsCAADJBAAwAAAAAAAAAAUiAADiBQAgIwAA5QUAILUCAADjBQAgtgIAAOQFACC7AgAAAQAgAyIAAOIFACC1AgAA4wUAILsCAAABACAAAAAFIgAA3QUAICMAAOAFACC1AgAA3gUAILYCAADfBQAguwIAAAEAIAMiAADdBQAgtQIAAN4FACC7AgAAAQAgAAAAAbgCAAAAsAICAbgCAAAAsgICCyIAALUFADAjAAC6BQAwtQIAALYFADC2AgAAtwUAMLcCAAC4BQAguAIAALkFADC5AgAAuQUAMLoCAAC5BQAwuwIAALkFADC8AgAAuwUAML0CAAC8BQAwCyIAAKkFADAjAACuBQAwtQIAAKoFADC2AgAAqwUAMLcCAACsBQAguAIAAK0FADC5AgAArQUAMLoCAACtBQAwuwIAAK0FADC8AgAArwUAML0CAACwBQAwCyIAAKAFADAjAACkBQAwtQIAAKEFADC2AgAAogUAMLcCAACjBQAguAIAAMkEADC5AgAAyQQAMLoCAADJBAAwuwIAAMkEADC8AgAApQUAML0CAADMBAAwCyIAAJQFADAjAACZBQAwtQIAAJUFADC2AgAAlgUAMLcCAACXBQAguAIAAJgFADC5AgAAmAUAMLoCAACYBQAwuwIAAJgFADC8AgAAmgUAML0CAACbBQAwCyIAAIsFADAjAACPBQAwtQIAAIwFADC2AgAAjQUAMLcCAACOBQAguAIAAKkEADC5AgAAqQQAMLoCAACpBAAwuwIAAKkEADC8AgAAkAUAML0CAACsBAAwCyIAAIIFADAjAACGBQAwtQIAAIMFADC2AgAAhAUAMLcCAACFBQAguAIAAJ0EADC5AgAAnQQAMLoCAACdBAAwuwIAAJ0EADC8AgAAhwUAML0CAACgBAAwCyIAAPYEADAjAAD7BAAwtQIAAPcEADC2AgAA-AQAMLcCAAD5BAAguAIAAPoEADC5AgAA-gQAMLoCAAD6BAAwuwIAAPoEADC8AgAA_AQAML0CAAD9BAAwCyIAAO0EADAjAADxBAAwtQIAAO4EADC2AgAA7wQAMLcCAADwBAAguAIAAJEEADC5AgAAkQQAMLoCAACRBAAwuwIAAJEEADC8AgAA8gQAML0CAACUBAAwBBEAAMADACDxAQEAAAAB8gEBAAAAAfQBQAAAAAECAAAAIQAgIgAA9QQAIAMAAAAhACAiAAD1BAAgIwAA9AQAIAEbAADcBQAwAgAAACEAIBsAAPQEACACAAAAlQQAIBsAAPMEACAD8QEBALUDACHyAQEAtQMAIfQBQAC2AwAhBBEAAL4DACDxAQEAtQMAIfIBAQC1AwAh9AFAALYDACEEEQAAwAMAIPEBAQAAAAHyAQEAAAAB9AFAAAAAAQPxAQEAAAAB9AFAAAAAAYICAQAAAAECAAAAMQAgIgAAgQUAIAMAAAAxACAiAACBBQAgIwAAgAUAIAEbAADbBQAwCAMAAKEDACDuAQAAoAMAMO8BAAAvABDwAQAAoAMAMPEBAQAAAAH0AUAA7QIAIYECAQDsAgAhggIBAOwCACECAAAAMQAgGwAAgAUAIAIAAAD-BAAgGwAA_wQAIAfuAQAA_QQAMO8BAAD-BAAQ8AEAAP0EADDxAQEA7AIAIfQBQADtAgAhgQIBAOwCACGCAgEA7AIAIQfuAQAA_QQAMO8BAAD-BAAQ8AEAAP0EADDxAQEA7AIAIfQBQADtAgAhgQIBAOwCACGCAgEA7AIAIQPxAQEAtQMAIfQBQAC2AwAhggIBALUDACED8QEBALUDACH0AUAAtgMAIYICAQC1AwAhA_EBAQAAAAH0AUAAAAABggIBAAAAAQQNAADPAwAg8QEBAAAAAYMCAgAAAAGFAgEAAAABAgAAAB0AICIAAIoFACADAAAAHQAgIgAAigUAICMAAIkFACABGwAA2gUAMAIAAAAdACAbAACJBQAgAgAAAKEEACAbAACIBQAgA_EBAQC1AwAhgwICAMsDACGFAgEAtQMAIQQNAADNAwAg8QEBALUDACGDAgIAywMAIYUCAQC1AwAhBA0AAM8DACDxAQEAAAABgwICAAAAAYUCAQAAAAEHDQAA2gMAIPEBAQAAAAH0AUAAAAAB9QFAAAAAAYUCAQAAAAGGAgIAAAABhwIBAAAAAQIAAAAZACAiAACTBQAgAwAAABkAICIAAJMFACAjAACSBQAgARsAANkFADACAAAAGQAgGwAAkgUAIAIAAACtBAAgGwAAkQUAIAbxAQEAtQMAIfQBQAC2AwAh9QFAALYDACGFAgEAtQMAIYYCAgDLAwAhhwIBANYDACEHDQAA2AMAIPEBAQC1AwAh9AFAALYDACH1AUAAtgMAIYUCAQC1AwAhhgICAMsDACGHAgEA1gMAIQcNAADaAwAg8QEBAAAAAfQBQAAAAAH1AUAAAAABhQIBAAAAAYYCAgAAAAGHAgEAAAABBwsAAPkDACDxAQEAAAAB9AFAAAAAAfUBQAAAAAGKAgEAAAABiwICAAAAAY0CAAAAjQICAgAAACsAICIAAJ8FACADAAAAKwAgIgAAnwUAICMAAJ4FACABGwAA2AUAMAwKAAChAwAgCwAApQMAIO4BAACiAwAw7wEAACkAEPABAACiAwAw8QEBAAAAAfQBQADtAgAh9QFAAO0CACGEAgEA7AIAIYoCAQDsAgAhiwICAKMDACGNAgAApAONAiICAAAAKwAgGwAAngUAIAIAAACcBQAgGwAAnQUAIAruAQAAmwUAMO8BAACcBQAQ8AEAAJsFADDxAQEA7AIAIfQBQADtAgAh9QFAAO0CACGEAgEA7AIAIYoCAQDsAgAhiwICAKMDACGNAgAApAONAiIK7gEAAJsFADDvAQAAnAUAEPABAACbBQAw8QEBAOwCACH0AUAA7QIAIfUBQADtAgAhhAIBAOwCACGKAgEA7AIAIYsCAgCjAwAhjQIAAKQDjQIiBvEBAQC1AwAh9AFAALYDACH1AUAAtgMAIYoCAQC1AwAhiwICAMsDACGNAgAA6QONAiIHCwAA6wMAIPEBAQC1AwAh9AFAALYDACH1AUAAtgMAIYoCAQC1AwAhiwICAMsDACGNAgAA6QONAiIHCwAA-QMAIPEBAQAAAAH0AUAAAAAB9QFAAAAAAYoCAQAAAAGLAgIAAAABjQIAAACNAgIUCQAAuwQAIA4AALwEACAPAAC9BAAgEAAAvgQAIBIAAL8EACATAADABAAg8QEBAAAAAfQBQAAAAAH1AUAAAAABiAICAAAAAY4CAQAAAAGPAgEAAAABkAICAAAAAZECAQAAAAGSAgEAAAABkwIBAAAAAZQCAQAAAAGVAiAAAAABlgJAAAAAAZgCAQAAAAECAAAADQAgIgAAqAUAIAMAAAANACAiAACoBQAgIwAApwUAIAEbAADXBQAwAgAAAA0AIBsAAKcFACACAAAAzQQAIBsAAKYFACAO8QEBALUDACH0AUAAtgMAIfUBQAC2AwAhiAICAMsDACGOAgEAtQMAIY8CAQDWAwAhkAICAMsDACGRAgEAtQMAIZICAQC1AwAhkwIBANYDACGUAgEA1gMAIZUCIAD_AwAhlgJAAIAEACGYAgEAtQMAIRQJAACCBAAgDgAAgwQAIA8AAIQEACAQAACFBAAgEgAAhgQAIBMAAIcEACDxAQEAtQMAIfQBQAC2AwAh9QFAALYDACGIAgIAywMAIY4CAQC1AwAhjwIBANYDACGQAgIAywMAIZECAQC1AwAhkgIBALUDACGTAgEA1gMAIZQCAQDWAwAhlQIgAP8DACGWAkAAgAQAIZgCAQC1AwAhFAkAALsEACAOAAC8BAAgDwAAvQQAIBAAAL4EACASAAC_BAAgEwAAwAQAIPEBAQAAAAH0AUAAAAAB9QFAAAAAAYgCAgAAAAGOAgEAAAABjwIBAAAAAZACAgAAAAGRAgEAAAABkgIBAAAAAZMCAQAAAAGUAgEAAAABlQIgAAAAAZYCQAAAAAGYAgEAAAABDPEBAQAAAAH0AUAAAAAB9QFAAAAAAaACAQAAAAGhAgEAAAABogIBAAAAAaMCAQAAAAGkAgEAAAABpQJAAAAAAaYCQAAAAAGnAgEAAAABqAIBAAAAAQIAAAAJACAiAAC0BQAgAwAAAAkAICIAALQFACAjAACzBQAgARsAANYFADARAwAAoQMAIO4BAACwAwAw7wEAAAcAEPABAACwAwAw8QEBAAAAAfQBQADtAgAh9QFAAO0CACGBAgEA7AIAIaACAQDsAgAhoQIBAOwCACGiAgEAiAMAIaMCAQCIAwAhpAIBAIgDACGlAkAArQMAIaYCQACtAwAhpwIBAIgDACGoAgEAiAMAIQIAAAAJACAbAACzBQAgAgAAALEFACAbAACyBQAgEO4BAACwBQAw7wEAALEFABDwAQAAsAUAMPEBAQDsAgAh9AFAAO0CACH1AUAA7QIAIYECAQDsAgAhoAIBAOwCACGhAgEA7AIAIaICAQCIAwAhowIBAIgDACGkAgEAiAMAIaUCQACtAwAhpgJAAK0DACGnAgEAiAMAIagCAQCIAwAhEO4BAACwBQAw7wEAALEFABDwAQAAsAUAMPEBAQDsAgAh9AFAAO0CACH1AUAA7QIAIYECAQDsAgAhoAIBAOwCACGhAgEA7AIAIaICAQCIAwAhowIBAIgDACGkAgEAiAMAIaUCQACtAwAhpgJAAK0DACGnAgEAiAMAIagCAQCIAwAhDPEBAQC1AwAh9AFAALYDACH1AUAAtgMAIaACAQC1AwAhoQIBALUDACGiAgEA1gMAIaMCAQDWAwAhpAIBANYDACGlAkAAgAQAIaYCQACABAAhpwIBANYDACGoAgEA1gMAIQzxAQEAtQMAIfQBQAC2AwAh9QFAALYDACGgAgEAtQMAIaECAQC1AwAhogIBANYDACGjAgEA1gMAIaQCAQDWAwAhpQJAAIAEACGmAkAAgAQAIacCAQDWAwAhqAIBANYDACEM8QEBAAAAAfQBQAAAAAH1AUAAAAABoAIBAAAAAaECAQAAAAGiAgEAAAABowIBAAAAAaQCAQAAAAGlAkAAAAABpgJAAAAAAacCAQAAAAGoAgEAAAABB_EBAQAAAAH0AUAAAAAB9QFAAAAAAZ8CQAAAAAGpAgEAAAABqgIBAAAAAasCAQAAAAECAAAABQAgIgAAwAUAIAMAAAAFACAiAADABQAgIwAAvwUAIAEbAADVBQAwDAMAAKEDACDuAQAAsQMAMO8BAAADABDwAQAAsQMAMPEBAQAAAAH0AUAA7QIAIfUBQADtAgAhgQIBAOwCACGfAkAA7QIAIakCAQAAAAGqAgEAiAMAIasCAQCIAwAhAgAAAAUAIBsAAL8FACACAAAAvQUAIBsAAL4FACAL7gEAALwFADDvAQAAvQUAEPABAAC8BQAw8QEBAOwCACH0AUAA7QIAIfUBQADtAgAhgQIBAOwCACGfAkAA7QIAIakCAQDsAgAhqgIBAIgDACGrAgEAiAMAIQvuAQAAvAUAMO8BAAC9BQAQ8AEAALwFADDxAQEA7AIAIfQBQADtAgAh9QFAAO0CACGBAgEA7AIAIZ8CQADtAgAhqQIBAOwCACGqAgEAiAMAIasCAQCIAwAhB_EBAQC1AwAh9AFAALYDACH1AUAAtgMAIZ8CQAC2AwAhqQIBALUDACGqAgEA1gMAIasCAQDWAwAhB_EBAQC1AwAh9AFAALYDACH1AUAAtgMAIZ8CQAC2AwAhqQIBALUDACGqAgEA1gMAIasCAQDWAwAhB_EBAQAAAAH0AUAAAAAB9QFAAAAAAZ8CQAAAAAGpAgEAAAABqgIBAAAAAasCAQAAAAEEIgAAtQUAMLUCAAC2BQAwtwIAALgFACC7AgAAuQUAMAQiAACpBQAwtQIAAKoFADC3AgAArAUAILsCAACtBQAwBCIAAKAFADC1AgAAoQUAMLcCAACjBQAguwIAAMkEADAEIgAAlAUAMLUCAACVBQAwtwIAAJcFACC7AgAAmAUAMAQiAACLBQAwtQIAAIwFADC3AgAAjgUAILsCAACpBAAwBCIAAIIFADC1AgAAgwUAMLcCAACFBQAguwIAAJ0EADAEIgAA9gQAMLUCAAD3BAAwtwIAAPkEACC7AgAA-gQAMAQiAADtBAAwtQIAAO4EADC3AgAA8AQAILsCAACRBAAwAAAAAAAAAAkEAADJBQAgBQAAygUAIAcAANIEACAPAADMBQAgEAAAzQUAIBIAAM8FACAUAADLBQAgFQAAzgUAII8CAADQAwAgAAIKAADQBQAgCwAA0QUAIAIHAADSBAAgjwIAANADACABEQAAuQMAIAfxAQEAAAAB9AFAAAAAAfUBQAAAAAGfAkAAAAABqQIBAAAAAaoCAQAAAAGrAgEAAAABDPEBAQAAAAH0AUAAAAAB9QFAAAAAAaACAQAAAAGhAgEAAAABogIBAAAAAaMCAQAAAAGkAgEAAAABpQJAAAAAAaYCQAAAAAGnAgEAAAABqAIBAAAAAQ7xAQEAAAAB9AFAAAAAAfUBQAAAAAGIAgIAAAABjgIBAAAAAY8CAQAAAAGQAgIAAAABkQIBAAAAAZICAQAAAAGTAgEAAAABlAIBAAAAAZUCIAAAAAGWAkAAAAABmAIBAAAAAQbxAQEAAAAB9AFAAAAAAfUBQAAAAAGKAgEAAAABiwICAAAAAY0CAAAAjQICBvEBAQAAAAH0AUAAAAAB9QFAAAAAAYUCAQAAAAGGAgIAAAABhwIBAAAAAQPxAQEAAAABgwICAAAAAYUCAQAAAAED8QEBAAAAAfQBQAAAAAGCAgEAAAABA_EBAQAAAAHyAQEAAAAB9AFAAAAAARAFAADCBQAgBwAAwwUAIA8AAMUFACAQAADGBQAgEgAAyAUAIBQAAMQFACAVAADHBQAg8QEBAAAAAfQBQAAAAAH1AUAAAAABjQIAAACyAgKPAgEAAAABrAIBAAAAAa0CAQAAAAGuAiAAAAABsAIAAACwAgICAAAAAQAgIgAA3QUAIAMAAAA9ACAiAADdBQAgIwAA4QUAIBIAAAA9ACAFAADmBAAgBwAA5wQAIA8AAOkEACAQAADqBAAgEgAA7AQAIBQAAOgEACAVAADrBAAgGwAA4QUAIPEBAQC1AwAh9AFAALYDACH1AUAAtgMAIY0CAADkBLICIo8CAQDWAwAhrAIBALUDACGtAgEAtQMAIa4CIAD_AwAhsAIAAOMEsAIiEAUAAOYEACAHAADnBAAgDwAA6QQAIBAAAOoEACASAADsBAAgFAAA6AQAIBUAAOsEACDxAQEAtQMAIfQBQAC2AwAh9QFAALYDACGNAgAA5ASyAiKPAgEA1gMAIawCAQC1AwAhrQIBALUDACGuAiAA_wMAIbACAADjBLACIhAEAADBBQAgBwAAwwUAIA8AAMUFACAQAADGBQAgEgAAyAUAIBQAAMQFACAVAADHBQAg8QEBAAAAAfQBQAAAAAH1AUAAAAABjQIAAACyAgKPAgEAAAABrAIBAAAAAa0CAQAAAAGuAiAAAAABsAIAAACwAgICAAAAAQAgIgAA4gUAIAMAAAA9ACAiAADiBQAgIwAA5gUAIBIAAAA9ACAEAADlBAAgBwAA5wQAIA8AAOkEACAQAADqBAAgEgAA7AQAIBQAAOgEACAVAADrBAAgGwAA5gUAIPEBAQC1AwAh9AFAALYDACH1AUAAtgMAIY0CAADkBLICIo8CAQDWAwAhrAIBALUDACGtAgEAtQMAIa4CIAD_AwAhsAIAAOMEsAIiEAQAAOUEACAHAADnBAAgDwAA6QQAIBAAAOoEACASAADsBAAgFAAA6AQAIBUAAOsEACDxAQEAtQMAIfQBQAC2AwAh9QFAALYDACGNAgAA5ASyAiKPAgEA1gMAIawCAQC1AwAhrQIBALUDACGuAiAA_wMAIbACAADjBLACIg7xAQEAAAAB9AFAAAAAAfUBQAAAAAGIAgIAAAABjgIBAAAAAY8CAQAAAAGQAgIAAAABkQIBAAAAAZICAQAAAAGTAgEAAAABlAIBAAAAAZUCIAAAAAGWAkAAAAABlwIBAAAAAQXxAQEAAAAB9AFAAAAAAfUBQAAAAAGPAgEAAAABmQIBAAAAAQIAAACYAQAgIgAA6AUAIBAEAADBBQAgBQAAwgUAIA8AAMUFACAQAADGBQAgEgAAyAUAIBQAAMQFACAVAADHBQAg8QEBAAAAAfQBQAAAAAH1AUAAAAABjQIAAACyAgKPAgEAAAABrAIBAAAAAa0CAQAAAAGuAiAAAAABsAIAAACwAgICAAAAAQAgIgAA6gUAIATxAQEAAAABgwICAAAAAYgCAgAAAAGJAgEAAAABBvEBAQAAAAH0AUAAAAAB9QFAAAAAAYQCAQAAAAGGAgIAAAABhwIBAAAAAQPxAQEAAAABgwICAAAAAYQCAQAAAAED8QEBAAAAAfQBQAAAAAGBAgEAAAABAwAAAJsBACAiAADoBQAgIwAA8gUAIAcAAACbAQAgGwAA8gUAIPEBAQC1AwAh9AFAALYDACH1AUAAtgMAIY8CAQDWAwAhmQIBALUDACEF8QEBALUDACH0AUAAtgMAIfUBQAC2AwAhjwIBANYDACGZAgEAtQMAIQMAAAA9ACAiAADqBQAgIwAA9QUAIBIAAAA9ACAEAADlBAAgBQAA5gQAIA8AAOkEACAQAADqBAAgEgAA7AQAIBQAAOgEACAVAADrBAAgGwAA9QUAIPEBAQC1AwAh9AFAALYDACH1AUAAtgMAIY0CAADkBLICIo8CAQDWAwAhrAIBALUDACGtAgEAtQMAIa4CIAD_AwAhsAIAAOMEsAIiEAQAAOUEACAFAADmBAAgDwAA6QQAIBAAAOoEACASAADsBAAgFAAA6AQAIBUAAOsEACDxAQEAtQMAIfQBQAC2AwAh9QFAALYDACGNAgAA5ASyAiKPAgEA1gMAIawCAQC1AwAhrQIBALUDACGuAiAA_wMAIbACAADjBLACIhAEAADBBQAgBQAAwgUAIAcAAMMFACAPAADFBQAgEAAAxgUAIBIAAMgFACAVAADHBQAg8QEBAAAAAfQBQAAAAAH1AUAAAAABjQIAAACyAgKPAgEAAAABrAIBAAAAAa0CAQAAAAGuAiAAAAABsAIAAACwAgICAAAAAQAgIgAA9gUAIATxAQEAAAABgwICAAAAAYUCAQAAAAGIAgIAAAABAwAAAD0AICIAAPYFACAjAAD7BQAgEgAAAD0AIAQAAOUEACAFAADmBAAgBwAA5wQAIA8AAOkEACAQAADqBAAgEgAA7AQAIBUAAOsEACAbAAD7BQAg8QEBALUDACH0AUAAtgMAIfUBQAC2AwAhjQIAAOQEsgIijwIBANYDACGsAgEAtQMAIa0CAQC1AwAhrgIgAP8DACGwAgAA4wSwAiIQBAAA5QQAIAUAAOYEACAHAADnBAAgDwAA6QQAIBAAAOoEACASAADsBAAgFQAA6wQAIPEBAQC1AwAh9AFAALYDACH1AUAAtgMAIY0CAADkBLICIo8CAQDWAwAhrAIBALUDACGtAgEAtQMAIa4CIAD_AwAhsAIAAOMEsAIiFQYAALoEACAJAAC7BAAgDwAAvQQAIBAAAL4EACASAAC_BAAgEwAAwAQAIPEBAQAAAAH0AUAAAAAB9QFAAAAAAYgCAgAAAAGOAgEAAAABjwIBAAAAAZACAgAAAAGRAgEAAAABkgIBAAAAAZMCAQAAAAGUAgEAAAABlQIgAAAAAZYCQAAAAAGXAgEAAAABmAIBAAAAAQIAAAANACAiAAD8BQAgCAoAAPgDACDxAQEAAAAB9AFAAAAAAfUBQAAAAAGEAgEAAAABigIBAAAAAYsCAgAAAAGNAgAAAI0CAgIAAAArACAiAAD-BQAgAwAAAAsAICIAAPwFACAjAACCBgAgFwAAAAsAIAYAAIEEACAJAACCBAAgDwAAhAQAIBAAAIUEACASAACGBAAgEwAAhwQAIBsAAIIGACDxAQEAtQMAIfQBQAC2AwAh9QFAALYDACGIAgIAywMAIY4CAQC1AwAhjwIBANYDACGQAgIAywMAIZECAQC1AwAhkgIBALUDACGTAgEA1gMAIZQCAQDWAwAhlQIgAP8DACGWAkAAgAQAIZcCAQC1AwAhmAIBALUDACEVBgAAgQQAIAkAAIIEACAPAACEBAAgEAAAhQQAIBIAAIYEACATAACHBAAg8QEBALUDACH0AUAAtgMAIfUBQAC2AwAhiAICAMsDACGOAgEAtQMAIY8CAQDWAwAhkAICAMsDACGRAgEAtQMAIZICAQC1AwAhkwIBANYDACGUAgEA1gMAIZUCIAD_AwAhlgJAAIAEACGXAgEAtQMAIZgCAQC1AwAhAwAAACkAICIAAP4FACAjAACFBgAgCgAAACkAIAoAAOoDACAbAACFBgAg8QEBALUDACH0AUAAtgMAIfUBQAC2AwAhhAIBALUDACGKAgEAtQMAIYsCAgDLAwAhjQIAAOkDjQIiCAoAAOoDACDxAQEAtQMAIfQBQAC2AwAh9QFAALYDACGEAgEAtQMAIYoCAQC1AwAhiwICAMsDACGNAgAA6QONAiIVBgAAugQAIAkAALsEACAOAAC8BAAgEAAAvgQAIBIAAL8EACATAADABAAg8QEBAAAAAfQBQAAAAAH1AUAAAAABiAICAAAAAY4CAQAAAAGPAgEAAAABkAICAAAAAZECAQAAAAGSAgEAAAABkwIBAAAAAZQCAQAAAAGVAiAAAAABlgJAAAAAAZcCAQAAAAGYAgEAAAABAgAAAA0AICIAAIYGACAQBAAAwQUAIAUAAMIFACAHAADDBQAgEAAAxgUAIBIAAMgFACAUAADEBQAgFQAAxwUAIPEBAQAAAAH0AUAAAAAB9QFAAAAAAY0CAAAAsgICjwIBAAAAAawCAQAAAAGtAgEAAAABrgIgAAAAAbACAAAAsAICAgAAAAEAICIAAIgGACADAAAACwAgIgAAhgYAICMAAIwGACAXAAAACwAgBgAAgQQAIAkAAIIEACAOAACDBAAgEAAAhQQAIBIAAIYEACATAACHBAAgGwAAjAYAIPEBAQC1AwAh9AFAALYDACH1AUAAtgMAIYgCAgDLAwAhjgIBALUDACGPAgEA1gMAIZACAgDLAwAhkQIBALUDACGSAgEAtQMAIZMCAQDWAwAhlAIBANYDACGVAiAA_wMAIZYCQACABAAhlwIBALUDACGYAgEAtQMAIRUGAACBBAAgCQAAggQAIA4AAIMEACAQAACFBAAgEgAAhgQAIBMAAIcEACDxAQEAtQMAIfQBQAC2AwAh9QFAALYDACGIAgIAywMAIY4CAQC1AwAhjwIBANYDACGQAgIAywMAIZECAQC1AwAhkgIBALUDACGTAgEA1gMAIZQCAQDWAwAhlQIgAP8DACGWAkAAgAQAIZcCAQC1AwAhmAIBALUDACEDAAAAPQAgIgAAiAYAICMAAI8GACASAAAAPQAgBAAA5QQAIAUAAOYEACAHAADnBAAgEAAA6gQAIBIAAOwEACAUAADoBAAgFQAA6wQAIBsAAI8GACDxAQEAtQMAIfQBQAC2AwAh9QFAALYDACGNAgAA5ASyAiKPAgEA1gMAIawCAQC1AwAhrQIBALUDACGuAiAA_wMAIbACAADjBLACIhAEAADlBAAgBQAA5gQAIAcAAOcEACAQAADqBAAgEgAA7AQAIBQAAOgEACAVAADrBAAg8QEBALUDACH0AUAAtgMAIfUBQAC2AwAhjQIAAOQEsgIijwIBANYDACGsAgEAtQMAIa0CAQC1AwAhrgIgAP8DACGwAgAA4wSwAiIVBgAAugQAIAkAALsEACAOAAC8BAAgDwAAvQQAIBIAAL8EACATAADABAAg8QEBAAAAAfQBQAAAAAH1AUAAAAABiAICAAAAAY4CAQAAAAGPAgEAAAABkAICAAAAAZECAQAAAAGSAgEAAAABkwIBAAAAAZQCAQAAAAGVAiAAAAABlgJAAAAAAZcCAQAAAAGYAgEAAAABAgAAAA0AICIAAJAGACAQBAAAwQUAIAUAAMIFACAHAADDBQAgDwAAxQUAIBIAAMgFACAUAADEBQAgFQAAxwUAIPEBAQAAAAH0AUAAAAAB9QFAAAAAAY0CAAAAsgICjwIBAAAAAawCAQAAAAGtAgEAAAABrgIgAAAAAbACAAAAsAICAgAAAAEAICIAAJIGACADAAAACwAgIgAAkAYAICMAAJYGACAXAAAACwAgBgAAgQQAIAkAAIIEACAOAACDBAAgDwAAhAQAIBIAAIYEACATAACHBAAgGwAAlgYAIPEBAQC1AwAh9AFAALYDACH1AUAAtgMAIYgCAgDLAwAhjgIBALUDACGPAgEA1gMAIZACAgDLAwAhkQIBALUDACGSAgEAtQMAIZMCAQDWAwAhlAIBANYDACGVAiAA_wMAIZYCQACABAAhlwIBALUDACGYAgEAtQMAIRUGAACBBAAgCQAAggQAIA4AAIMEACAPAACEBAAgEgAAhgQAIBMAAIcEACDxAQEAtQMAIfQBQAC2AwAh9QFAALYDACGIAgIAywMAIY4CAQC1AwAhjwIBANYDACGQAgIAywMAIZECAQC1AwAhkgIBALUDACGTAgEA1gMAIZQCAQDWAwAhlQIgAP8DACGWAkAAgAQAIZcCAQC1AwAhmAIBALUDACEDAAAAPQAgIgAAkgYAICMAAJkGACASAAAAPQAgBAAA5QQAIAUAAOYEACAHAADnBAAgDwAA6QQAIBIAAOwEACAUAADoBAAgFQAA6wQAIBsAAJkGACDxAQEAtQMAIfQBQAC2AwAh9QFAALYDACGNAgAA5ASyAiKPAgEA1gMAIawCAQC1AwAhrQIBALUDACGuAiAA_wMAIbACAADjBLACIhAEAADlBAAgBQAA5gQAIAcAAOcEACAPAADpBAAgEgAA7AQAIBQAAOgEACAVAADrBAAg8QEBALUDACH0AUAAtgMAIfUBQAC2AwAhjQIAAOQEsgIijwIBANYDACGsAgEAtQMAIa0CAQC1AwAhrgIgAP8DACGwAgAA4wSwAiIQBAAAwQUAIAUAAMIFACAHAADDBQAgDwAAxQUAIBAAAMYFACASAADIBQAgFAAAxAUAIPEBAQAAAAH0AUAAAAAB9QFAAAAAAY0CAAAAsgICjwIBAAAAAawCAQAAAAGtAgEAAAABrgIgAAAAAbACAAAAsAICAgAAAAEAICIAAJoGACADAAAAPQAgIgAAmgYAICMAAJ4GACASAAAAPQAgBAAA5QQAIAUAAOYEACAHAADnBAAgDwAA6QQAIBAAAOoEACASAADsBAAgFAAA6AQAIBsAAJ4GACDxAQEAtQMAIfQBQAC2AwAh9QFAALYDACGNAgAA5ASyAiKPAgEA1gMAIawCAQC1AwAhrQIBALUDACGuAiAA_wMAIbACAADjBLACIhAEAADlBAAgBQAA5gQAIAcAAOcEACAPAADpBAAgEAAA6gQAIBIAAOwEACAUAADoBAAg8QEBALUDACH0AUAAtgMAIfUBQAC2AwAhjQIAAOQEsgIijwIBANYDACGsAgEAtQMAIa0CAQC1AwAhrgIgAP8DACGwAgAA4wSwAiIVBgAAugQAIAkAALsEACAOAAC8BAAgDwAAvQQAIBAAAL4EACATAADABAAg8QEBAAAAAfQBQAAAAAH1AUAAAAABiAICAAAAAY4CAQAAAAGPAgEAAAABkAICAAAAAZECAQAAAAGSAgEAAAABkwIBAAAAAZQCAQAAAAGVAiAAAAABlgJAAAAAAZcCAQAAAAGYAgEAAAABAgAAAA0AICIAAJ8GACAQBAAAwQUAIAUAAMIFACAHAADDBQAgDwAAxQUAIBAAAMYFACAUAADEBQAgFQAAxwUAIPEBAQAAAAH0AUAAAAAB9QFAAAAAAY0CAAAAsgICjwIBAAAAAawCAQAAAAGtAgEAAAABrgIgAAAAAbACAAAAsAICAgAAAAEAICIAAKEGACADAAAACwAgIgAAnwYAICMAAKUGACAXAAAACwAgBgAAgQQAIAkAAIIEACAOAACDBAAgDwAAhAQAIBAAAIUEACATAACHBAAgGwAApQYAIPEBAQC1AwAh9AFAALYDACH1AUAAtgMAIYgCAgDLAwAhjgIBALUDACGPAgEA1gMAIZACAgDLAwAhkQIBALUDACGSAgEAtQMAIZMCAQDWAwAhlAIBANYDACGVAiAA_wMAIZYCQACABAAhlwIBALUDACGYAgEAtQMAIRUGAACBBAAgCQAAggQAIA4AAIMEACAPAACEBAAgEAAAhQQAIBMAAIcEACDxAQEAtQMAIfQBQAC2AwAh9QFAALYDACGIAgIAywMAIY4CAQC1AwAhjwIBANYDACGQAgIAywMAIZECAQC1AwAhkgIBALUDACGTAgEA1gMAIZQCAQDWAwAhlQIgAP8DACGWAkAAgAQAIZcCAQC1AwAhmAIBALUDACEDAAAAPQAgIgAAoQYAICMAAKgGACASAAAAPQAgBAAA5QQAIAUAAOYEACAHAADnBAAgDwAA6QQAIBAAAOoEACAUAADoBAAgFQAA6wQAIBsAAKgGACDxAQEAtQMAIfQBQAC2AwAh9QFAALYDACGNAgAA5ASyAiKPAgEA1gMAIawCAQC1AwAhrQIBALUDACGuAiAA_wMAIbACAADjBLACIhAEAADlBAAgBQAA5gQAIAcAAOcEACAPAADpBAAgEAAA6gQAIBQAAOgEACAVAADrBAAg8QEBALUDACH0AUAAtgMAIfUBQAC2AwAhjQIAAOQEsgIijwIBANYDACGsAgEAtQMAIa0CAQC1AwAhrgIgAP8DACGwAgAA4wSwAiIVBgAAugQAIAkAALsEACAOAAC8BAAgDwAAvQQAIBAAAL4EACASAAC_BAAg8QEBAAAAAfQBQAAAAAH1AUAAAAABiAICAAAAAY4CAQAAAAGPAgEAAAABkAICAAAAAZECAQAAAAGSAgEAAAABkwIBAAAAAZQCAQAAAAGVAiAAAAABlgJAAAAAAZcCAQAAAAGYAgEAAAABAgAAAA0AICIAAKkGACADAAAACwAgIgAAqQYAICMAAK0GACAXAAAACwAgBgAAgQQAIAkAAIIEACAOAACDBAAgDwAAhAQAIBAAAIUEACASAACGBAAgGwAArQYAIPEBAQC1AwAh9AFAALYDACH1AUAAtgMAIYgCAgDLAwAhjgIBALUDACGPAgEA1gMAIZACAgDLAwAhkQIBALUDACGSAgEAtQMAIZMCAQDWAwAhlAIBANYDACGVAiAA_wMAIZYCQACABAAhlwIBALUDACGYAgEAtQMAIRUGAACBBAAgCQAAggQAIA4AAIMEACAPAACEBAAgEAAAhQQAIBIAAIYEACDxAQEAtQMAIfQBQAC2AwAh9QFAALYDACGIAgIAywMAIY4CAQC1AwAhjwIBANYDACGQAgIAywMAIZECAQC1AwAhkgIBALUDACGTAgEA1gMAIZQCAQDWAwAhlQIgAP8DACGWAkAAgAQAIZcCAQC1AwAhmAIBALUDACEJBAYCBQoDBw4ECAAQDy0KEC4LEjMMFCwIFTIPAQMAAQEDAAEIBgABCAAOCQAFDhQHDxoKEB4LEiIMEyQNAgcPBAgABgEHEAACDAAIDQAEAwgACQoAAQsVBwELFgACCgABDQAEAgoAAQ0ABAIDAAERAAQBEQAEBA4lAA8mABAnABIoAAEDAAEIBDQABTUABzYADzgAEDkAEjsAFDcAFToAAAAAAwgAFSgAFikAFwAAAAMIABUoABYpABcBAwABAQMAAQMIABwoAB0pAB4AAAADCAAcKAAdKQAeAQMAAQEDAAEDCAAjKAAkKQAlAAAAAwgAIygAJCkAJQAAAAMIACsoACwpAC0AAAADCAArKAAsKQAtAAADCAAyKAAzKQA0AAAAAwgAMigAMykANAIGAAEJAAUCBgABCQAFBQgAOSgAPCkAPXoAOnsAOwAAAAAABQgAOSgAPCkAPXoAOnsAOwEKAAEBCgABBQgAQigARSkARnoAQ3sARAAAAAAABQgAQigARSkARnoAQ3sARAIMAAgNAAQCDAAIDQAEBQgASygATikAT3oATHsATQAAAAAABQgASygATikAT3oATHsATQIKAAENAAQCCgABDQAEBQgAVCgAVykAWHoAVXsAVgAAAAAABQgAVCgAVykAWHoAVXsAVgIKAAENAAQCCgABDQAEBQgAXSgAYCkAYXoAXnsAXwAAAAAABQgAXSgAYCkAYXoAXnsAXwEDAAEBAwABAwgAZigAZykAaAAAAAMIAGYoAGcpAGgCAwABEQAEAgMAAREABAMIAG0oAG4pAG8AAAADCABtKABuKQBvAREABAERAAQDCAB0KAB1KQB2AAAAAwgAdCgAdSkAdhYCARc8ARg_ARlAARpBARxDAR1FER5GEh9IASBKESFLEyRMASVNASZOESpRFCtSGCxTAi1UAi5VAi9WAjBXAjFZAjJbETNcGTReAjVgETZhGjdiAjhjAjlkETpnGztoHzxpAz1qAz5rAz9sA0BtA0FvA0JxEUNyIER0A0V2EUZ3IUd4A0h5A0l6EUp9Ikt-JkyAASdNgQEnToQBJ0-FASdQhgEnUYgBJ1KKARFTiwEoVI0BJ1WPARFWkAEpV5EBJ1iSASdZkwERWpYBKluXAS5cmQEFXZoBBV6dAQVfngEFYJ8BBWGhAQViowERY6QBL2SmAQVlqAERZqkBMGeqAQVoqwEFaawBEWqvATFrsAE1bLEBBG2yAQRuswEEb7QBBHC1AQRxtwEEcrkBEXO6ATZ0vAEEdb4BEXa_ATd3wAEEeMEBBHnCARF8xQE4fcYBPn7HAQh_yAEIgAHJAQiBAcoBCIIBywEIgwHNAQiEAc8BEYUB0AE_hgHSAQiHAdQBEYgB1QFAiQHWAQiKAdcBCIsB2AERjAHbAUGNAdwBR44B3QEHjwHeAQeQAd8BB5EB4AEHkgHhAQeTAeMBB5QB5QERlQHmAUiWAegBB5cB6gERmAHrAUmZAewBB5oB7QEHmwHuARGcAfEBSp0B8gFQngHzAQqfAfQBCqAB9QEKoQH2AQqiAfcBCqMB-QEKpAH7ARGlAfwBUaYB_gEKpwGAAhGoAYECUqkBggIKqgGDAgqrAYQCEawBhwJTrQGIAlmuAYkCC68BigILsAGLAguxAYwCC7IBjQILswGPAgu0AZECEbUBkgJatgGUAgu3AZYCEbgBlwJbuQGYAgu6AZkCC7sBmgIRvAGdAly9AZ4CYr4BnwIPvwGgAg_AAaECD8EBogIPwgGjAg_DAaUCD8QBpwIRxQGoAmPGAaoCD8cBrAIRyAGtAmTJAa4CD8oBrwIPywGwAhHMAbMCZc0BtAJpzgG1AgzPAbYCDNABtwIM0QG4AgzSAbkCDNMBuwIM1AG9AhHVAb4CatYBwAIM1wHCAhHYAcMCa9kBxAIM2gHFAgzbAcYCEdwByQJs3QHKAnDeAcwCDd8BzQIN4AHPAg3hAdACDeIB0QIN4wHTAg3kAdUCEeUB1gJx5gHYAg3nAdoCEegB2wJy6QHcAg3qAd0CDesB3gIR7AHhAnPtAeICdw"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.js"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.js");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AccountScalarFieldEnum: () => AccountScalarFieldEnum,
  AnyNull: () => AnyNull2,
  CardScalarFieldEnum: () => CardScalarFieldEnum,
  CategoriesScalarFieldEnum: () => CategoriesScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  MedicineEmbeddingScalarFieldEnum: () => MedicineEmbeddingScalarFieldEnum,
  MedicinesScalarFieldEnum: () => MedicinesScalarFieldEnum,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  OrderItemScalarFieldEnum: () => OrderItemScalarFieldEnum,
  OrdersScalarFieldEnum: () => OrdersScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  QueryMode: () => QueryMode,
  ReviewsScalarFieldEnum: () => ReviewsScalarFieldEnum,
  SearchLogScalarFieldEnum: () => SearchLogScalarFieldEnum,
  SessionScalarFieldEnum: () => SessionScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  VerificationScalarFieldEnum: () => VerificationScalarFieldEnum,
  ViewLogScalarFieldEnum: () => ViewLogScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.8.0",
  engine: "3c6e192761c0362d496ed980de936e2f3cebcd3a"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  User: "User",
  Session: "Session",
  Account: "Account",
  Verification: "Verification",
  Categories: "Categories",
  Medicines: "Medicines",
  Orders: "Orders",
  OrderItem: "OrderItem",
  Reviews: "Reviews",
  Card: "Card",
  SearchLog: "SearchLog",
  ViewLog: "ViewLog",
  MedicineEmbedding: "MedicineEmbedding"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  emailVerified: "emailVerified",
  image: "image",
  role: "role",
  status: "status",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SessionScalarFieldEnum = {
  id: "id",
  expiresAt: "expiresAt",
  token: "token",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  ipAddress: "ipAddress",
  userAgent: "userAgent",
  userId: "userId"
};
var AccountScalarFieldEnum = {
  id: "id",
  accountId: "accountId",
  providerId: "providerId",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  idToken: "idToken",
  accessTokenExpiresAt: "accessTokenExpiresAt",
  refreshTokenExpiresAt: "refreshTokenExpiresAt",
  scope: "scope",
  password: "password",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  userId: "userId"
};
var VerificationScalarFieldEnum = {
  id: "id",
  identifier: "identifier",
  value: "value",
  expiresAt: "expiresAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CategoriesScalarFieldEnum = {
  id: "id",
  categorieName: "categorieName",
  image: "image",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var MedicinesScalarFieldEnum = {
  id: "id",
  medicineName: "medicineName",
  price: "price",
  image: "image",
  stock: "stock",
  detels: "detels",
  manufacturer: "manufacturer",
  uses: "uses",
  sideEffects: "sideEffects",
  isVectored: "isVectored",
  vectoredAt: "vectoredAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  sellerId: "sellerId",
  categorieId: "categorieId"
};
var OrdersScalarFieldEnum = {
  id: "id",
  shippingAddress: "shippingAddress",
  totalAmount: "totalAmount",
  status: "status",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  customerId: "customerId"
};
var OrderItemScalarFieldEnum = {
  id: "id",
  quantity: "quantity",
  price: "price",
  orderId: "orderId",
  productId: "productId"
};
var ReviewsScalarFieldEnum = {
  id: "id",
  rating: "rating",
  comment: "comment",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  customerId: "customerId",
  productId: "productId"
};
var CardScalarFieldEnum = {
  id: "id",
  quantity: "quantity",
  customerId: "customerId",
  productId: "productId"
};
var SearchLogScalarFieldEnum = {
  id: "id",
  query: "query",
  createdAt: "createdAt",
  userId: "userId"
};
var ViewLogScalarFieldEnum = {
  id: "id",
  createdAt: "createdAt",
  userId: "userId",
  medicineId: "medicineId"
};
var MedicineEmbeddingScalarFieldEnum = {
  id: "id",
  medicineId: "medicineId",
  content: "content",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/enums.ts
var UserRole = {
  USER: "USER",
  ADMIN: "ADMIN",
  SELLER: "SELLER"
};
var UserStatus = {
  active: "active",
  banned: "banned"
};

// generated/prisma/client.ts
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = process.env.DATABASE_URL;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/app.ts
import express2 from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { oAuthProxy } from "better-auth/plugins";
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  baseURL: process.env.APP_URL,
  trustedOrigins: [
    "https://medi-nest-server-beta.vercel.app",
    "https://medinest-client-pearl.vercel.app",
    "http://localhost:3000",
    "http://localhost:5000"
  ],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60
      // 5 minutes
    }
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: UserRole.USER,
        required: false
      },
      status: {
        type: "string",
        defaultValue: UserStatus.active,
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      accessType: "offline",
      prompt: "select_account consent"
    }
  },
  advanced: {
    cookies: {
      session_token: {
        name: "session_token",
        // Force this exact name
        attributes: {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          partitioned: true
        }
      },
      state: {
        name: "session_token",
        // Force this exact name
        attributes: {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          partitioned: true
        }
      }
    }
  },
  plugins: [oAuthProxy()]
});

// src/modules/medicine/medicine.router.ts
import { Router } from "express";

// src/modules/medicine/medicine.service.ts
var addMedicine = async (data) => {
  const { medicineName, price, image, stock, detels, manufacturer, sellerId, categorieId } = data;
  try {
    const result = await prisma.medicines.create({
      data: {
        medicineName,
        price,
        image,
        stock,
        detels,
        manufacturer,
        sellerId,
        categorieId
      }
    });
    return result;
  } catch (error) {
    return { error: error.message };
  }
};
var getAllMedicine = async (serch, category, minPrice, maxPrice, manufacturer) => {
  try {
    const allSearchAndFilter = {};
    if (serch) {
      allSearchAndFilter.OR = [
        {
          medicineName: {
            contains: serch,
            mode: "insensitive"
          }
        },
        {
          detels: {
            contains: serch,
            mode: "insensitive"
          }
        },
        {
          manufacturer: {
            contains: serch,
            mode: "insensitive"
          }
        }
      ];
    }
    if (category) {
      const categorie = await prisma.categories.findFirst({
        where: {
          categorieName: category
        }
      });
      console.log("categorie", categorie);
      if (!categorie) {
        return [];
      }
      if (categorie) {
        allSearchAndFilter.categorieId = categorie.id;
      }
    }
    if (minPrice || maxPrice) {
      allSearchAndFilter.price = {};
      if (minPrice) {
        allSearchAndFilter.price.gte = Number(minPrice);
      }
      if (maxPrice) {
        allSearchAndFilter.price.lte = Number(maxPrice);
      }
    }
    if (manufacturer) {
      allSearchAndFilter.manufacturer = {
        contains: manufacturer,
        mode: "insensitive"
      };
    }
    const result = await prisma.medicines.findMany({
      where: allSearchAndFilter,
      include: {
        categorie: true
      }
    });
    return result;
  } catch (error) {
    return { error: error.message };
  }
};
var getMedicineByID = async (id) => {
  try {
    const result = await prisma.medicines.findUnique({
      where: {
        id
      },
      include: {
        categorie: true
      }
    });
    return result;
  } catch (error) {
    return { error: error.message };
  }
};
var updateMedicine = async (id, data) => {
  const { medicineName, price, image, stock, detels, manufacturer } = data;
  try {
    const result = await prisma.medicines.update({
      where: {
        id
      },
      data: {
        medicineName,
        price,
        image,
        stock,
        detels,
        manufacturer
      }
    });
    return result;
  } catch (error) {
    return { error: error.message };
  }
};
var deleteMedicine = async (id) => {
  try {
    const result = await prisma.medicines.delete({
      where: {
        id
      }
    });
    return result;
  } catch (error) {
    return { error: error.message };
  }
};
var medicineService = {
  addMedicine,
  getAllMedicine,
  getMedicineByID,
  updateMedicine,
  deleteMedicine
};

// src/modules/medicine/medicine.controler.ts
var addMedicine2 = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await medicineService.addMedicine(data);
    res.send(result);
  } catch (error) {
    next(error);
  }
};
var getAllMedicine2 = async (req, res, next) => {
  try {
    const { serch, category, minPrice, maxPrice, manufacturer } = req.query;
    const result = await medicineService.getAllMedicine(serch, category, minPrice, maxPrice, manufacturer);
    res.send(result);
  } catch (error) {
    next(error);
  }
};
var getMedicineByID2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await medicineService.getMedicineByID(id);
    res.send(result);
  } catch (error) {
    next(error);
  }
};
var updateMedicine2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await medicineService.updateMedicine(id, data);
    console.log(result);
    res.send(result);
  } catch (error) {
    next(error);
  }
};
var deleteMedicine2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await medicineService.deleteMedicine(id);
    res.send(result);
  } catch (error) {
    next(error);
  }
};
var medicineControler = {
  addMedicine: addMedicine2,
  getAllMedicine: getAllMedicine2,
  getMedicineByID: getMedicineByID2,
  updateMedicine: updateMedicine2,
  deleteMedicine: deleteMedicine2
};

// src/middleWare/auth.ts
var auth2 = (...roles) => {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers
      });
      if (!session) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access. Please login."
        });
      }
      req.user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        role: session.user.role,
        status: session.user.status
      };
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: You don't have enough permission"
        });
      }
      next();
    } catch (error) {
      console.error("Auth Middleware Error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
};
var auth_default = auth2;

// src/modules/medicine/medicine.router.ts
var router = Router();
router.post("/api/seller/medicines", auth_default("SELLER" /* seller */, "ADMIN" /* admin */), medicineControler.addMedicine);
router.get("/api/medicines", medicineControler.getAllMedicine);
router.get("/api/medicines/:id", medicineControler.getMedicineByID);
router.patch("/api/medicines/:id", auth_default("SELLER" /* seller */, "ADMIN" /* admin */), medicineControler.updateMedicine);
router.delete("/api/medicines/:id", auth_default("SELLER" /* seller */, "ADMIN" /* admin */), medicineControler.deleteMedicine);
var medicineRouter = router;

// src/modules/categorie/categorie.router.ts
import { Router as Router2 } from "express";

// src/modules/categorie/categorie.service.ts
var addCatagoty = async (categorieName) => {
  const result = await prisma.categories.create({
    data: { categorieName }
  });
  return result;
};
var getAllCatagoty = async () => {
  const result = await prisma.categories.findMany();
  return result;
};
var deleteCatagoty = async (id) => {
  const result = await prisma.categories.delete({
    where: {
      id
    }
  });
  return result;
};
var categorieService = {
  addCatagoty,
  getAllCatagoty,
  deleteCatagoty
};

// src/modules/categorie/categorie.controler.ts
var addCatagoty2 = async (req, res, next) => {
  try {
    const { categorieName } = req.body;
    const result = await categorieService.addCatagoty(categorieName);
    res.send(result);
  } catch (error) {
    next(error);
  }
};
var getAllCatagoty2 = async (req, res, next) => {
  try {
    const result = await categorieService.getAllCatagoty();
    res.send(result);
  } catch (error) {
    next(error);
  }
};
var deleteCatagoty2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await categorieService.deleteCatagoty(id);
    res.send(result);
  } catch (error) {
    next(error);
  }
};
var categorieControler = {
  addCatagoty: addCatagoty2,
  getAllCatagoty: getAllCatagoty2,
  deleteCatagoty: deleteCatagoty2
};

// src/modules/categorie/categorie.router.ts
var router2 = Router2();
router2.post("/api/catagoty", categorieControler.addCatagoty);
router2.get("/api/catagoty", categorieControler.getAllCatagoty);
router2.delete("/api/catagoty/:id", categorieControler.deleteCatagoty);
var categorieRouter = router2;

// src/modules/order/order.router.ts
import { Router as Router3 } from "express";

// src/modules/order/order.service.ts
var addOrder = async (data, userID) => {
  const { shippingAddress, totalAmount, status, items } = data;
  try {
    const result = await prisma.$transaction(async (tx) => {
      const order = await tx.orders.create({
        data: {
          customerId: userID,
          shippingAddress,
          totalAmount,
          status,
          items: {
            create: items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
              medicineName: item.name
            }))
          }
        },
        include: {
          items: true
        }
      });
      return order;
    });
    return result;
  } catch (error) {
    return { error: error.message };
  }
};
var getAllOrder = async () => {
  try {
    const result = await prisma.orders.findMany({
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    return result;
  } catch (error) {
    return { error: error.message };
  }
};
var ggetOrderByID = async (customerId) => {
  console.log("Fetching orders for customerId:", customerId);
  try {
    const result = await prisma.orders.findMany({
      where: {
        customerId
      }
    });
    return result;
  } catch (error) {
    console.error("Prisma Error:", error.message);
    return { error: error.message };
  }
};
var updateOrder = async (id, status) => {
  try {
    const result = await prisma.orders.update({
      where: {
        id
      },
      data: {
        status
      }
    });
    return result;
  } catch (error) {
    return { error: error.message };
  }
};
var deleteOrder = async (id) => {
  try {
    const result = await prisma.orders.delete({
      where: {
        id
      }
    });
    return result;
  } catch (error) {
    return { error: error.message };
  }
};
var orderService = {
  addOrder,
  getAllOrder,
  ggetOrderByID,
  updateOrder,
  deleteOrder
};

// src/modules/order/order.controler.ts
var addOrder2 = async (req, res, next) => {
  try {
    const data = req.body;
    const userID = req.user?.id;
    if (!userID) {
      return res.send("Your user id is null");
    }
    const result = await orderService.addOrder(data, userID);
    res.send(result);
  } catch (error) {
    next(error);
  }
};
var getAllOrder2 = async (req, res, next) => {
  try {
    const result = await orderService.getAllOrder();
    res.send(result);
  } catch (error) {
    next(error);
  }
};
var getOrderByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("right code now");
    console.log(id);
    const result = await orderService.getOrderByID(id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "No order found with this ID"
      });
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
var updateOrder2 = async (req, res, next) => {
  try {
    const { id } = req.body;
    const { status } = req.body;
    console.log(id, status);
    const result = await orderService.updateOrder(id, status);
    res.send(result);
  } catch (error) {
    next(error);
  }
};
var deleteOrder2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await orderService.deleteOrder(id);
    res.send(result);
  } catch (error) {
    next(error);
  }
};
var orderControler = {
  addOrder: addOrder2,
  getAllOrder: getAllOrder2,
  getOrderByID,
  updateOrder: updateOrder2,
  deleteOrder: deleteOrder2
};

// src/modules/order/order.router.ts
var router3 = Router3();
router3.post("/api/orders", auth_default(), orderControler.addOrder);
router3.get("/api/orders", auth_default(), orderControler.getAllOrder);
router3.get("/api/orders/:id", orderControler.getOrderByID);
router3.patch("/api/orders", auth_default("ADMIN" /* admin */, "SELLER" /* seller */), orderControler.updateOrder);
router3.delete("/api/orders/:id", auth_default("ADMIN" /* admin */), orderControler.updateOrder);
var orderRouter = router3;

// src/modules/review/review.router.ts
import { Router as Router4 } from "express";

// src/modules/review/review.service.ts
var addReview = async (data, id) => {
  const { productId, rating, comment } = data;
  try {
    const result = await prisma.reviews.create({
      data: {
        customerId: id,
        productId,
        rating,
        comment
      }
    });
    return result;
  } catch (error) {
    return { error: error.message };
  }
};
var getAllReview = async (productId) => {
  try {
    const result = await prisma.reviews.findMany({
      where: {
        productId
      }
    });
    return result;
  } catch (error) {
    return { error: error.message };
  }
};
var reviewService = {
  addReview,
  getAllReview
};

// src/modules/review/review.controler.ts
var addReview2 = async (req, res, next) => {
  try {
    const data = req.body;
    const id = req.user?.id;
    if (!id) {
      return res.send("your user id is null");
    }
    const result = await reviewService.addReview(data, id);
    res.send(result);
  } catch (error) {
    next(error);
  }
};
var getAllReview2 = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await reviewService.getAllReview(id);
    res.send(result);
  } catch (error) {
    next(error);
  }
};
var reviewControler = {
  addReview: addReview2,
  getAllReview: getAllReview2
};

// src/modules/review/review.router.ts
var router4 = Router4();
router4.post("/api/review", auth_default(), reviewControler.addReview);
router4.get("/api/review/:id", auth_default(), reviewControler.getAllReview);
var reviedRouter = router4;

// src/modules/user/user.route.ts
import { Router as Router5 } from "express";

// src/modules/user/user.service.ts
var getAllUser = async () => {
  try {
    const result = await prisma.user.findMany();
    return result;
  } catch (error) {
    return { error: error.message };
  }
};
var updateUser = async (id, status) => {
  try {
    const result = await prisma.user.update({
      where: {
        id
      },
      data: {
        status
      }
    });
    return result;
  } catch (error) {
    return { error: error.message };
  }
};
var manageProfile = async (id, data) => {
  const { name, role, image } = data;
  try {
    const result = await prisma.user.update({
      where: {
        id
      },
      data: {
        name,
        role,
        image
      }
    });
    return result;
  } catch (error) {
    return { error: error.message };
  }
};
var userService = {
  getAllUser,
  updateUser,
  manageProfile
};

// src/modules/user/user.controller.ts
var getAllUser2 = async (req, res, next) => {
  try {
    const result = await userService.getAllUser();
    res.send(result);
  } catch (error) {
    next(error);
  }
};
var updateUser2 = async (req, res, next) => {
  try {
    const { id, status } = req.body;
    const result = await userService.updateUser(id, status);
    res.send(result);
  } catch (error) {
    next(error);
  }
};
var manageProfile2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    console.log(id, data);
    const result = await userService.manageProfile(id, data);
    res.send(result);
  } catch (error) {
    next(error);
  }
};
var userController = {
  getAllUser: getAllUser2,
  updateUser: updateUser2,
  manageProfile: manageProfile2
};

// src/modules/user/user.route.ts
var router5 = Router5();
router5.get("/api/user", auth_default("ADMIN" /* admin */), userController.getAllUser);
router5.patch("/api/user", auth_default("ADMIN" /* admin */), userController.updateUser);
router5.patch("/api/user/:id", auth_default(), userController.manageProfile);
var userRouter = router5;

// src/modules/card/card.router.ts
import { Router as Router6 } from "express";

// src/modules/card/card.service.ts
var addCard = async (card) => {
  const { customerId, productId, quantity } = card;
  const result = await prisma.card.create({
    data: {
      customerId,
      productId,
      quantity
    }
  });
  return result;
};
var getAllCard = async () => {
  const result = await prisma.card.findMany({
    include: {
      customer: true,
      product: true
    }
  });
  return result;
};
var deleteCard = async (ids) => {
  const result = await prisma.card.deleteMany({
    where: {
      id: {
        in: ids
      }
    }
  });
  return result;
};
var cardService = {
  addCard,
  deleteCard,
  getAllCard
};

// src/modules/card/card.controler.ts
var addCard2 = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await cardService.addCard(data);
    res.send(result);
  } catch (error) {
    next(error);
  }
};
var deleteCard2 = async (req, res, next) => {
  try {
    const ids = req.body.ids;
    console.log(ids);
    const result = await cardService.deleteCard(ids);
    res.send(result);
  } catch (error) {
    next(error);
  }
};
var getAllCard2 = async (req, res, next) => {
  try {
    const result = await cardService.getAllCard();
    res.send(result);
  } catch (error) {
    next(error);
  }
};
var cardControler = {
  addCard: addCard2,
  deleteCard: deleteCard2,
  getAllCard: getAllCard2
};

// src/modules/card/card.router.ts
var router6 = Router6();
router6.post("/addcard", cardControler.addCard);
router6.delete("/deletecard", cardControler.deleteCard);
router6.get("/getcard", cardControler.getAllCard);
var cardRouter = router6;

// src/modules/payment/payment.router.ts
import express from "express";

// src/Errors/AppError.ts
var AppError = class extends Error {
  statusCode;
  isOperational;
  errors;
  constructor(message, statusCode = 500, errors) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.errors = errors;
    this.name = "AppError";
    Error.captureStackTrace(this, this.constructor);
  }
};

// src/modules/payment/payment.controller.ts
var getStripe = async () => {
  const { default: Stripe } = await import("stripe");
  return new Stripe(process.env.STRIPE_SECRET_KEY);
};
var createPaymentIntent = async (req, res, next) => {
  try {
    const stripe = await getStripe();
    const { totalAmount, shippingAddress, phone, name, items } = req.body;
    if (!totalAmount || !name || !phone || !shippingAddress || !items?.length) {
      return next(new AppError("Not all necessary information was provided.", 400));
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(totalAmount) * 100),
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        customerName: name,
        phone,
        shippingAddress,
        itemCount: String(items.length)
      }
    });
    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    return next(error);
  }
};
var handleWebhook = async (req, res, next) => {
  const stripe = await getStripe();
  const sig = req.headers["stripe-signature"];
  if (!sig) return next(new AppError("Signature not found", 400));
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return next(err);
  }
  if (event.type === "payment_intent.succeeded") {
    console.log("\u2705 Payment succeeded:", event.data.object.id);
  }
  if (event.type === "payment_intent.payment_failed") {
    console.warn("\u274C Payment failed");
  }
  return res.json({ received: true });
};

// src/modules/payment/payment.router.ts
var router7 = express.Router();
router7.post("/create-intent", createPaymentIntent);
router7.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  handleWebhook
);
var paymentrouter = router7;

// src/Errors/errorMiddleware.ts
import { ZodError } from "zod";

// src/Errors/PrismaError.ts
function handlePrismaError(err) {
  switch (err.code) {
    case "P2002": {
      const field = err.meta?.target?.join(", ");
      return new AppError(
        `This ${field} Already in use`,
        409
      );
    }
    case "P2025":
      return new AppError("Information not found", 404);
    case "P2003":
      return new AppError("Related information does not exist", 400);
    case "P2014":
      return new AppError("Missed the necessary relationship", 400);
    default:
      return new AppError("There was a database problem.", 500);
  }
}

// src/Errors/stripeError.ts
function handleStripeError(err) {
  switch (err.type) {
    case "StripeCardError":
      return new AppError(err.message ?? "Card payment failed", 402);
    case "StripeInvalidRequestError":
      return new AppError("Payment information is incorrect", 400);
    case "StripeAuthenticationError":
      return new AppError("Payment service is temporarily closed", 503);
    case "StripeRateLimitError":
      return new AppError("Too many requests, please try again later", 429);
    case "StripeConnectionError":
    case "StripeAPIError":
      return new AppError("There was a problem with payment, please try again later.", 502);
    default:
      return new AppError("payment failed", 500);
  }
}

// src/Errors/errorMiddleware.ts
function errorMiddleware(err, req, res, next) {
  let error;
  if (err instanceof AppError) {
    error = err;
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    error = handlePrismaError(err);
  } else if (err && typeof err === "object" && "type" in err && typeof err.type === "string" && err.type.startsWith("Stripe")) {
    error = handleStripeError(err);
  } else if (err instanceof ZodError) {
    error = new AppError("Data verification failed", 422, err.flatten().fieldErrors);
  } else if (err instanceof Error) {
    error = new AppError(err.message, 500);
  } else {
    error = new AppError("An unknown problem has occurred", 500);
  }
  const isProd = process.env.NODE_ENV === "production";
  if (isProd && error.statusCode === 500) {
    error = new AppError("There is a problem with the server", 500);
  }
  res.status(error.statusCode).json({
    success: false,
    statusCode: error.statusCode,
    message: error.message,
    ...error.errors && { errors: error.errors },
    ...!isProd && { stack: error.stack }
  });
}

// src/modules/ai/ai.routes.ts
import { Router as Router7 } from "express";

// src/modules/ai/ai.validation.ts
import { z } from "zod";
var chatSchema = z.object({
  message: z.string().min(1, "Message required"),
  history: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      // ✅ "model" বাদ
      content: z.string()
    })
  ).optional().default([])
});
var searchSchema = z.object({
  query: z.string().min(2, "Query too short")
});
var recommendationSchema = z.object({
  viewedItems: z.array(z.string()).default([]),
  searchHistory: z.array(z.string()).default([])
});
var dashboardInsightSchema = z.object({
  totalSales: z.number(),
  totalUsers: z.number(),
  topProducts: z.array(z.string()),
  revenueByMonth: z.array(
    z.object({
      month: z.string(),
      revenue: z.number()
    })
  )
});
var anomalySchema = z.object({
  data: z.array(
    z.object({
      label: z.string(),
      value: z.number()
    })
  )
});

// src/config/groq.config.ts
import Groq from "groq-sdk";
import "dotenv/config";
if (!process.env.GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY is missing in .env file");
}
var groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// src/config/voyage.config.ts
import "dotenv/config";
if (!process.env.VOYAGE_API_KEY) {
  throw new Error("VOYAGE_API_KEY missing in .env");
}
var voyageClient;
var getVoyageClient = async () => {
  if (!voyageClient) {
    const { VoyageAIClient } = await import("voyageai");
    voyageClient = new VoyageAIClient({
      apiKey: process.env.VOYAGE_API_KEY
    });
  }
  return voyageClient;
};

// src/modules/ai/vector/embedding.service.ts
var getEmbedding = async (text) => {
  const client = await getVoyageClient();
  const result = await client.embed({
    input: text,
    model: "voyage-3-lite"
  });
  const embedding = result.data?.[0]?.embedding;
  if (!embedding) {
    throw new Error("Voyage AI returned empty embedding");
  }
  return embedding;
};
var toVectorString = (embedding) => {
  return `[${embedding.join(",")}]`;
};

// src/modules/ai/vector/search.service.ts
var vectorSearchService = async (query, topK = 5) => {
  try {
    const queryEmbedding = await getEmbedding(query);
    const vectorString = toVectorString(queryEmbedding);
    const results = await prisma.$queryRaw`
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
      similarity: parseFloat(r.similarity)
    }));
  } catch (error) {
    console.error("Vector search error:", error);
    return [];
  }
};
var ragChatService = async (message, history) => {
  const relevantMedicines = await vectorSearchService(message, 5);
  const context = relevantMedicines.length > 0 ? relevantMedicines.map(
    (m) => `- ${m.name} (${m.category}): ${m.description}. Price: ${m.price} taka`
  ).join("\n") : "No specific medicines found in database.";
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
- Answer in the same language the user writes in`
      },
      ...history.map((h) => ({
        role: h.role,
        content: h.content
      })),
      { role: "user", content: message }
    ],
    max_tokens: 400,
    temperature: 0.7
  });
  return completion.choices[0]?.message?.content || "Sorry, I could not process your request.";
};
var vectorSearchSuggestionsService = async (query) => {
  try {
    const results = await vectorSearchService(query, 6);
    return results.map((r) => r.name).filter(Boolean);
  } catch {
    return [];
  }
};
var vectorRecommendationService = async (viewedItems, searchHistory) => {
  try {
    const combinedQuery = [...viewedItems, ...searchHistory].slice(0, 5).join(", ");
    if (!combinedQuery.trim()) return [];
    const results = await vectorSearchService(combinedQuery, 4);
    return results.map((r) => ({
      name: r.name,
      reason: "Based on your interests",
      price: r.price,
      image: r.image
    }));
  } catch {
    return [];
  }
};

// src/modules/ai/vector/seed.service.ts
var seedMedicinesToPgVector = async () => {
  const allMedicines = await prisma.medicines.findMany({
    include: {
      categorie: true,
      embedding: true
    }
  });
  const medicines = allMedicines.filter((m) => m.embedding === null);
  if (medicines.length === 0) {
    console.log("\u2705 All medicines already embedded");
    return { success: true, count: 0 };
  }
  console.log(`\u{1F4E6} Embedding ${medicines.length} medicines...`);
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
          vectoredAt: /* @__PURE__ */ new Date()
        }
      });
      successCount++;
      console.log(`\u2705 ${successCount}. ${medicine.medicineName}`);
      await new Promise((r) => setTimeout(r, 200));
    } catch (error) {
      console.error(`\u274C Failed: ${medicine.medicineName}`, error);
    }
  }
  console.log(`
\u{1F389} Done! ${successCount}/${medicines.length} embedded.`);
  return { success: true, count: successCount };
};
var resetEmbeddings = async () => {
  await prisma.medicineEmbedding.deleteMany({});
  await prisma.medicines.updateMany({
    data: { isVectored: false, vectoredAt: null }
  });
  console.log("\u2705 All embeddings reset");
};

// src/modules/ai/ai.service.ts
var dashboardInsightService = async (data) => {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `You are a business analyst for MediNest medical e-commerce platform in Bangladesh.
Analyze the data and return ONLY a JSON array. No explanation, no markdown.
Format: [{"insight": "...", "suggestion": "..."}]`
      },
      {
        role: "user",
        content: `Analyze this data and give 3 business insights:
- Total Sales: ${data.totalSales} taka
- Total Users: ${data.totalUsers}
- Top Products: ${data.topProducts.join(", ")}
- Revenue by Month: ${JSON.stringify(data.revenueByMonth)}`
      }
    ],
    max_tokens: 600,
    temperature: 0.5
  });
  const text = completion.choices[0]?.message?.content || "[]";
  const cleaned = text.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
};
var anomalyService = async (data) => {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `You are an anomaly detection AI for MediNest dashboard.
Return ONLY a JSON array. Empty array [] if no anomalies. No markdown.
Format: [{"label": "...", "issue": "...", "severity": "low|medium|high"}]`
      },
      {
        role: "user",
        content: `Detect anomalies in this revenue data: ${JSON.stringify(data)}`
      }
    ],
    max_tokens: 400,
    temperature: 0.3
  });
  const text = completion.choices[0]?.message?.content || "[]";
  const cleaned = text.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
};
var getRealDashboardData = async () => {
  const [totalUsers, medicines, orders] = await Promise.all([
    prisma.user.count(),
    prisma.medicines.findMany({
      include: { orderItems: true }
    }),
    prisma.orders.findMany({
      select: { totalAmount: true, createdAt: true }
    })
  ]);
  const topProducts = [...medicines].sort((a, b) => b.orderItems.length - a.orderItems.length).slice(0, 5).map((m) => m.medicineName);
  const revenueByMonth = Array.from({ length: 6 }, (_, i) => {
    const date = /* @__PURE__ */ new Date();
    date.setMonth(date.getMonth() - (5 - i));
    const month = date.toLocaleString("default", { month: "short" });
    const revenue = orders.filter((o) => {
      const d = new Date(o.createdAt);
      return d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear();
    }).reduce((sum, o) => sum + o.totalAmount, 0);
    return { month, revenue };
  });
  return {
    totalSales: orders.reduce((sum, o) => sum + o.totalAmount, 0),
    totalUsers,
    totalOrders: orders.length,
    topProducts,
    revenueByMonth
  };
};

// src/modules/ai/ai.controller.ts
var chatController = async (req, res) => {
  try {
    const parsed = chatSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: parsed.error.issues[0]?.message
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
var searchSuggestionsController = async (req, res) => {
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
var recommendationController = async (req, res) => {
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
var dashboardInsightController = async (req, res) => {
  try {
    const realData = await getRealDashboardData();
    const insights = await dashboardInsightService(realData);
    res.status(200).json({ success: true, insights, stats: realData });
  } catch (error) {
    console.error("Insight error:", error);
    res.status(500).json({ success: false, insights: [] });
  }
};
var anomalyController = async (req, res) => {
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
var seedController = async (req, res) => {
  try {
    const result = await seedMedicinesToPgVector();
    res.status(200).json({
      success: true,
      message: `Seeded ${result.count} medicines to Neon DB`
    });
  } catch (error) {
    console.error("Seed error:", error);
    res.status(500).json({ success: false, message: "Seeding failed" });
  }
};
var resetController = async (req, res) => {
  try {
    await resetEmbeddings();
    res.status(200).json({
      success: true,
      message: "All embeddings reset"
    });
  } catch (error) {
    console.error("Reset error:", error);
    res.status(500).json({ success: false, message: "Reset failed" });
  }
};

// src/modules/ai/ai.routes.ts
var router8 = Router7();
router8.post("/chat", chatController);
router8.post("/search-suggestions", searchSuggestionsController);
router8.post("/recommendations", recommendationController);
router8.post("/dashboard-insights", dashboardInsightController);
router8.post("/anomaly-detection", anomalyController);
router8.post("/seed-vector-db", seedController);
router8.post("/reset-embeddings", resetController);
var aiRouter = router8;

// src/app.ts
var app = express2();
var allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5000",
  "https://medi-nest-server-beta.vercel.app",
  "https://medinest-client-pearl.vercel.app"
].filter(Boolean);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const isAllowed = allowedOrigins.includes(origin) || /^https:\/\/.*\.vercel\.app$/.test(origin);
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"]
  })
);
app.use(
  "/api/payment/webhook",
  express2.raw({ type: "application/json" })
);
app.use(express2.json());
app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use("/api/payment", paymentrouter);
app.use("/", medicineRouter);
app.use("/", categorieRouter);
app.use("/", orderRouter);
app.use("/", reviedRouter);
app.use("/", userRouter);
app.use("/", cardRouter);
app.use("/api/ai", aiRouter);
app.use(errorMiddleware);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// src/server.ts
async function main() {
  const port = process.env.PORT;
  try {
    await prisma.$connect();
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    await prisma.$disconnect();
    console.log(error);
  }
}
main();
