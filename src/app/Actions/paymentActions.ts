"use server";
import razorPay from "@/lib/razorpay";
import { clerkClient, currentUser } from "@clerk/nextjs/server";

export async function paymentActions(planId: string) {
  const user = await currentUser();
  let razorpayCustomerId = user?.privateMetadata.razorpayCustomerId as
    | string
    | undefined;
  if (!user) {
    throw new Error("Unauthorized");
  }

  if (!razorpayCustomerId) {
    const customer = await razorPay.customers.create({
      name: user?.fullName || "",
      contact: user?.phoneNumbers[0]?.phoneNumber || "",
      email: user?.emailAddresses[0]?.emailAddress || "",
      fail_existing: true,
    });

    (await clerkClient()).users.updateUserMetadata(user.id, {
      privateMetadata: {
        razorpayCustomerId: customer.id,
      },
    });
    razorpayCustomerId = customer.id;
  }

  const subscription = await razorPay.subscriptions.create({
    customer_id: razorpayCustomerId,
    plan_id: planId,
    customer_notify: true,
    quantity: 1,
    total_count: 120,
    notes: {
      userId: user.id,
    },
  } as any);
  return subscription;
}
