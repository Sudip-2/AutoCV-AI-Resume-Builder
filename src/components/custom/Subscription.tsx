"use client";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { DeleteSubscription } from "@/app/Actions/paymentActions";
import { toast } from "sonner";
import { usePremiumModalStore } from "@/hooks/useModals";
import { format } from "date-fns";

interface subscriptionProps {
  subscriptionLevel: boolean;
  subscribedUserData?: any;
}

export default function Subscription({
  subscriptionLevel,
  subscribedUserData,
}: subscriptionProps) {
  let [isSubscribed, setIsSubscribed] = useState(subscriptionLevel);
  const [isProcessing, setIsProcessing] = useState(false);
  const { setOpen } = usePremiumModalStore();
  useEffect(() => {
    console.log(subscriptionLevel);
    setIsSubscribed(subscriptionLevel);
  }, [subscriptionLevel]);
  const handleSubscriptionCancel = async () => {
    setIsProcessing(true);
    try {
      await DeleteSubscription();
      toast.success(
        "Subscription cancelled successfully, Refresh the page to see changes"
      );
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      toast.error("Error cancelling subscription");
    } finally {
      setIsProcessing(false);
    }
  };
  const handleSubscription = () => {
    setOpen(true);
  };
  return (
    <main className="container mx-auto px-3 py-6 space-y-3">
      <h1 className="text-2xl font-bold">Subscription</h1>
      <Paragraph text={"Manage your subscription details below"} />
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-3">
          Subscription version{" "}
          <BadgeElem children={isSubscribed ? "AutoCV Premium" : "Free"} />
        </h2>
        <Paragraph
          text={
            isSubscribed
              ? "You are currently subscribed to the Pro plan"
              : "If you paid already, it might take a minute or two to activate subscription"
          }
        />
        {isSubscribed && (
          <p className="text-gray-500">
            Next billing date:{" "}
            <span className="font-medium">
              {format(
                new Date(subscribedUserData.currentPeriodEnd),
                "dd-MMMM-yyyy"
              )}
            </span>
          </p>
        )}
        {isSubscribed ? (
          <SubscriptionBtn
            text={"Cancel subscription"}
            variant="destructive"
            onclick={handleSubscriptionCancel}
            disabled={isProcessing}
          />
        ) : (
          <SubscriptionBtn
            text={"Subscribe now"}
            variant="default"
            onclick={handleSubscription}
          />
        )}
        <p className="text-sm text-muted-foreground">
          Any problem regarding subscriptions, please contact: p452570@gmail.com
        </p>
      </div>
    </main>
  );
}

function Paragraph({ text }: { text: string }) {
  return <p className="text-muted-foreground">{text}</p>;
}

function BadgeElem({ children }: { children: React.ReactNode }) {
  return <Badge variant={"default"}>{children}</Badge>;
}

function SubscriptionBtn({
  text,
  variant,
  onclick,
  disabled,
}: {
  text: string;
  variant: any;
  onclick: () => void;
  disabled?: boolean;
}) {
  return (
    <Button
      variant={variant}
      className="hover:scale-105"
      onClick={onclick}
      disabled={disabled}
    >
      {text}
    </Button>
  );
}
