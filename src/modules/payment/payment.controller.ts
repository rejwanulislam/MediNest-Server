// payment.controller.ts
import { NextFunction, Request, Response } from "express";
import { AppError } from "../../Errors/AppError";

// ✅ Dynamic import - ESM এ stripe load করো
const getStripe = async () => {
  const { default: Stripe } = await import("stripe");
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
};

export const createPaymentIntent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stripe = await getStripe(); // ✅ এখানে load করো

    const { totalAmount, shippingAddress, phone, name, items } = req.body as {
      totalAmount: number;
      shippingAddress: string;
      phone: string;
      name: string;
      items: { productId: string; quantity: number }[];
    };

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
        itemCount: String(items.length),
      },
    });

    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    return next(error);
  }
};

export const handleWebhook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const stripe = await getStripe();
  const sig = req.headers["stripe-signature"];

  if (!sig) return next(new AppError("Signature not found", 400));

  let event: any;

  try {
    event = stripe.webhooks.constructEvent(
      req.body as Buffer,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return next(err);
  }

  if (event.type === "payment_intent.succeeded") {
    console.log("✅ Payment succeeded:", event.data.object.id);
  }

  if (event.type === "payment_intent.payment_failed") {
    console.warn("❌ Payment failed");
  }

  return res.json({ received: true });
};