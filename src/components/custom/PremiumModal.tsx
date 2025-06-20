"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, IndianRupeeIcon } from "lucide-react";
import { Button } from "../ui/button";
import { usePremiumModalStore } from "@/hooks/useModals";
import { paymentActions } from "@/app/Actions/paymentActions";
import Script from "next/script";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { toast } from "sonner";

const freeFeatures = ["Upto 2 Resume", "Basic templates"];
const premiumFeatures = ["Unlimited resumes", "Unlock more templates"];

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PremiumModal() {
  const { open, setOpen } = usePremiumModalStore();
  const { isSignedIn, user } = useUser();
  const [isProcessing, setIsProcessing] = useState(false);
  const logo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmCpavs3eER7e6lV63rJvOV1XDrE3l3bhrfQ&s"
  if (!isSignedIn) return;
  let openRazorPay = async () => {
    setIsProcessing(true);
    try {
      const subscription = await paymentActions(
        process.env.NEXT_PUBLIC_AutoCV_Premium_Prod_Id!
      );
      const { id } = subscription;
      let options = {
        key: process.env.NEXT_PUBLIC_RazorPay_Test_Key_Id,
        subscription_id: id,
        name: "AutoCV Premium",
        description:
          "Unlock more features and capabilities with AutoCV Premium.",
        image: logo,
        callback_url: "/billing",
        prefill: {
          name: user?.fullName || "",
          email: user?.emailAddresses[0]?.emailAddress || "",
          contact: user?.phoneNumbers[0]?.phoneNumber || "",
        },
        theme: {
          color: "#3B82F6",
        },
      };
      let rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log("Error opening Razorpay:", error);
      toast.error("Something went wrong. try again");
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <div>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
      <Dialog
        open={open}
        onOpenChange={(state) => {
          if (!isProcessing) {
            setOpen(state);
          }
        }}
      >
        <DialogContent>
          <DialogHeader className="text-center">
            <DialogTitle>Buy AutoCV premium now</DialogTitle>
            <DialogDescription>
              Unlock more features and capabilities with AutoCV Premium.
            </DialogDescription>
          </DialogHeader>
          <div className="flex">
            <div className="flex flex-col w-1/2 items-center px-4">
              <h3 className="font-bold text-base ">AutoCV Free tier</h3>
              <ul className="mt-5 space-y-2">
                {freeFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="size-5 text-blue-500 mr-1.5" /> {feature}
                  </li>
                ))}
              </ul>
              <Button
                className="mt-4 w-full"
                onClick={() => setOpen(false)}
                disabled={isProcessing}
              >
                Use free tier
              </Button>
            </div>
            <div className="flex flex-col items-center border-l w-1/2 px-4">
              <h3 className="font-bold text-base text-blue-500">
                AutoCV premium
              </h3>
              <ul className="mt-5 space-y-2">
                {premiumFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="size-5 text-blue-500 mr-1.5" /> {feature}
                  </li>
                ))}
              </ul>
              <Button
                className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white hover:text-white flex gap-x-0"
                onClick={openRazorPay}
                disabled={isProcessing}
              >
                Get Premium <span className="flex items-center"><IndianRupeeIcon/>29</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
