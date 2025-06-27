"use server";
import prisma from "@/lib/prisma";
import razorPay from "@/lib/razorpay";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function paymentActions(planId: string) {
  const user = await currentUser();
  let razorpayCustomerId = user?.privateMetadata.razorpayCustomerId as
    | string
    | undefined;
  let subscriptionObj = await prisma.userSubscription.findUnique({
    where: {
      userId: user?.id,
    },
  });
  if (!user) {
    throw new Error("Unauthorized");
  }
  if (subscriptionObj?.subscriptionId) {
    throw new Error("You already have a subscription, please cancel it first");
  }
  if (!razorpayCustomerId) {
    const customer = await razorPay.customers.create({
      name: user?.fullName || "",
      contact: user?.phoneNumbers[0]?.phoneNumber || "",
      email: user?.emailAddresses[0]?.emailAddress || "",
      fail_existing: true,
    });

    await (
      await clerkClient()
    ).users.updateUserMetadata(user.id, {
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
      planId: planId,
    },
  } as any);
  return subscription;
}

export async function DeleteSubscription() {
  const { userId } = await auth();
  if (!userId) return;
  const subscriptionData = await prisma.userSubscription.findUnique({
    where: {
      userId: userId,
    },
  });
  if (!subscriptionData) throw new Error("No subscription data");
  await razorPay.subscriptions.cancel(subscriptionData?.subscriptionId);
}

export async function saveSubsAfterPayment(params: any) {
  const { userId, subscriptionId } = params;
  if (!userId || !subscriptionId) throw new Error("Invalid parameters");

  const subscription = await razorPay.subscriptions.fetch(subscriptionId);
  if (!subscription) throw new Error("Subscription not found");
  console.log(subscription);
  await prisma.userSubscription.create({
    data: {
      userId: userId,
      customerId: subscription.customer_id!,
      subscriptionId: subscription.id,
      priceId: subscription.plan_id,
      currentPeriodEnd: new Date(subscription.current_end! * 1000),
    },
  });
}
