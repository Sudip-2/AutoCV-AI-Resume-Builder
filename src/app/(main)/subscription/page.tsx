import prisma from "@/lib/prisma";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import Subscription from "@/components/custom/Subscription";

export const metadata: Metadata = {
  title: "Subscription",
};

const page = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const subscriptionLevel = await getUserSubscriptionLevel(userId!);

  const subscribedUserData = await prisma.userSubscription.findUnique({
    where: {
      userId,
    },
  });
  return (
    <Subscription
      subscriptionLevel={subscriptionLevel == "premium" ? true : false}
      subscribedUserData={subscribedUserData}
    />
  );
};

export default page;
