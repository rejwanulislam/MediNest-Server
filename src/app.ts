
import express, { Request, Response } from "express"
import cors from "cors"
import { toNodeHandler } from "better-auth/node"
import { auth } from "./lib/auth"
import { medicineRouter } from "./modules/medicine/medicine.router"
import { categorieRouter } from "./modules/categorie/categorie.router"
import { orderRouter } from "./modules/order/order.router"
import { reviedRouter } from "./modules/review/review.router"
import { userRouter } from "./modules/user/user.route"
import { cardRouter } from "./modules/card/card.router"
import { paymentrouter } from "./modules/payment/payment.router"
import { errorMiddleware } from "./Errors/errorMiddleware"
import { aiRouter } from "./modules/ai/ai.routes"
export const app = express()

// ── CORS ───────────────────────────────────────────────────────────────────
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5000",
  "https://medi-nest-server-beta.vercel.app",
  "https://medinest-client-pearl.vercel.app",

].filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)
      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^https:\/\/.*\.vercel\.app$/.test(origin)
      if (isAllowed) {
        callback(null, true)
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`))
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  })
)


app.use(
  "/api/payment/webhook",
  express.raw({ type: "application/json" })
)

// ── JSON parser ────────────────────────────────────────────────────────────
app.use(express.json())

// ── Auth ───────────────────────────────────────────────────────────────────
app.all("/api/auth/{*any}", toNodeHandler(auth))

// ── Routes ─────────────────────────────────────────────────────────────────
app.use("/api/payment", paymentrouter)
app.use("/", medicineRouter)
app.use("/", categorieRouter)
app.use("/", orderRouter)
app.use("/", reviedRouter)
app.use("/", userRouter)
app.use("/", cardRouter)
app.use("/api/ai", aiRouter)
app.use(errorMiddleware)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!")
})