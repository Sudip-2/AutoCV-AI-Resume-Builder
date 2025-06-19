"use server";
import razorPay from "@/lib/razorpay";
import { currentUser } from "@clerk/nextjs/server";

export async function paymentActions(planId: string) {
  const user = await currentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const subscription = await razorPay.subscriptions.create({
    plan_id: planId,
    customer_notify: true,
    quantity: 1,
    total_count: 1,
  });
  console.log(subscription);
  return subscription;
}
