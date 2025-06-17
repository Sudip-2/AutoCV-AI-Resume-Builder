"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { usePremiumModalStore } from "@/hooks/useModals";

const freeFeatures = ["Upto 3 Resumes", "Basic templates"];
const premiumFeatures = ["Unlimited resumes", "Unlock more templates"];

export default function PremiumModal() {
    const {open,setOpen} = usePremiumModalStore()
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader className="text-center">
            <DialogTitle>Buy AutoCV premium now</DialogTitle>
            <DialogDescription>
              Unlock more features and capabilities with AutoCV Premium.
            </DialogDescription>
          </DialogHeader>
          <div className="flex">
            <div className="flex flex-col w-1/2 items-center px-4">
              <h3 className="font-bold text-base ">
                AutoCV Free tier
              </h3>
              <ul className="mt-5 space-y-2">
                {freeFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="size-5 text-blue-500 mr-1.5" /> {feature}
                  </li>
                ))}
              </ul>
              <Button className="mt-4 w-full" onClick={() => setOpen(false)}>
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
              <Button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white hover:text-white">
                Get Premium
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
