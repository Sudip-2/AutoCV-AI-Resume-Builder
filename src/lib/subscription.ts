import { cache } from "react";
import prisma from "./prisma";

export type subScriptionLevel = "free" | "premium";

export const getUserSubscriptionLevel = cache(
  async (userId: string): Promise<subScriptionLevel> => {
    const subscription = await prisma.userSubscription.findUnique({
      where: {
        userId,
      },
    });
    if(!subscription || subscription.currentPeriodEnd < new Date()){
        return "free"
    }
    if(subscription.priceId === process.env.NEXT_PUBLIC_AutoCV_Premium_Prod_Id){
        return "premium"
    }
    throw new Error("Invalid subscription")
  }
);
