"use client";
import Link from "next/link";
import { PlusSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePremiumModalStore } from "@/hooks/useModals";
import { cn } from "@/lib/utils";

interface CreateResumeBtnProps {
  canCreate: boolean;
  totalResumes?: number;
}

export default function CreateResumeBtn({
  canCreate,
  totalResumes,
}: CreateResumeBtnProps) {
  const premiumModal = usePremiumModalStore();
  return (
    <>
      {canCreate ? (
        <Link
          href={"/editor"}
          className={cn(
            "sm:h-full sm:rounded-lg sm:border border-transparent sm:bg-secondary sm:p-3 sm:transition-colors sm:hover:border-border sm:hover:shadow-sm flex justify-center sm:justify-center sm:items-center",
            totalResumes! <= 0 &&
              "sm:p-0 sm:bg-transparent sm:hover:border-transparent sm:hover:shadow-none sm:justify-start"
          )}
        >
          <Button>
            <PlusSquare className="size-5" />
            <span className="text-lg">New resume</span>
          </Button>
        </Link>
      ) : (
        <div
          className="sm:h-full sm:rounded-lg sm:border border-transparent sm:bg-secondary sm:p-3 sm:transition-colors sm:hover:border-border sm:hover:shadow-sm flex justify-center sm:items-center"
          onClick={() => premiumModal.setOpen(true)}
        >
          <Button>
            <PlusSquare className="size-5" />
            <span className="text-lg">New resume</span>
          </Button>
        </div>
      )}
    </>
  );
}
