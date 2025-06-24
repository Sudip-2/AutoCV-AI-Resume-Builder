import prisma from "@/lib/prisma";
import razorPay from "@/lib/razorpay";
import { NextRequest } from "next/server";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";

export async function POST(req: NextRequest) {
  try {
    let webhookSignature = req.headers.get("x-razorpay-signature");
    const payload = await req.text();
    const payloadObj = JSON.parse(payload);
    if (!webhookSignature) {
      return new Response("Signature missing", { status: 400 });
    }
    if (
      !validateWebhookSignature(
        payload,
        webhookSignature!,
        process.env.RazorPay_Test_Key!
      )
    ) {
      return new Response("Invalid Signature", { status: 400 });
    }

    switch (payloadObj.event) {
      // case "payment.captured":
      //   await handlePaymentCaptured(payloadObj);
      //   break;
      case "subscription.activated":
      case "subscription.updated":
        await handleSubCreatedOrUpdated(
          payloadObj.payload.subscription.entity.id
        );
        break;
      case "subscription.cancelled":
        await handleSubDeleted(payloadObj);
        break;
      default:
        console.log(`The unhandled event type is: ${payloadObj.event}`);
    }

    return new Response("Event received", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Internal server error", { status: 500 });
  }
}

// async function handlePaymentCaptured(session: string) {}
async function handleSubCreatedOrUpdated(subscriptionId: string) {
  let subscription = await razorPay.subscriptions.fetch(subscriptionId);
  console.log(subscription);
  let cancelAtPeriodEnd = subscription.status == "cancelled";
  if (subscription.status === "active" || subscription.status === "expired") {
    await prisma.userSubscription.upsert({
      where: {
        userId: subscription.notes.userId,
      },
      create: {
        userId: subscription.notes.userId,
        customerId: subscription.customer_id,
        subscriptionId: subscription.id,
        priceId: subscription.plan_id,
        currentPeriodEnd: new Date(subscription.current_end! * 1000),
        cancelAtPeriodEnd: cancelAtPeriodEnd,
      },
      update: {
        priceId: subscription.plan_id,
        currentPeriodEnd: new Date(subscription.current_end! * 1000),
        cancelAtPeriodEnd: cancelAtPeriodEnd,
      },
    });
  }
}
async function handleSubDeleted(subscription: string) {}
