"use client";

import { mapToResumeValues, ResumeServerData } from "@/lib/types";
import { formatDate } from "date-fns";
import Link from "next/link";
import ResumePreview from "./ResumePreview";
import { useRef, useState, useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { DownloadIcon, MoreVertical, Printer, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import deleteResume from "@/app/Actions/resumeActions";
import LoadingBtn from "./LoadingBtn";
import { useReactToPrint } from "react-to-print";

interface ResumeItemProps {
  resume: ResumeServerData;
}

export default function ResumeItem({ resume }: ResumeItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrint = useReactToPrint({
    contentRef,
    documentTitle: resume.title || "Resume",
  });
  const wasUpdated = resume.updatedAt!;
  return (
    <div className="rounded-lg relative border border-transparent bg-secondary p-3 transition-colors hover:border-border hover:shadow-sm">
      <MoreMenu resumeId={resume.id} onPrintClick={reactToPrint} />
      <div className="space-y-5">
        <Link
          href={`editor?resumeId=${resume.id}`}
          className="inline-block text-center w-full"
          target="_blank"
        >
          <p className="font-semibold line-clamp-1">
            {resume.title || "No title"}
          </p>
          {resume.description && (
            <p className="line-clamp-2 text-sm">{resume.description}</p>
          )}
          <p className="text-xs text-muted-foreground">
            {wasUpdated ? "Updated" : "Created"} on{" "}
            {formatDate(resume.updatedAt, "MMM d, yyyy h:mm a")}
          </p>
        </Link>
        <Link
          href={`editor?resumeId=${resume.id}`}
          target="_blank"
          className="inline-block w-full"
        >
          <ResumePreview
            resumeData={mapToResumeValues(resume)}
            className="overflow-hidden"
            contentRef={contentRef}
          />
        </Link>
      </div>
    </div>
  );
}

interface MoreMenuProps {
  resumeId: string;
  onPrintClick: () => void;
  // onDownloadClick: () => void;
}

function MoreMenu({ resumeId, onPrintClick }: MoreMenuProps) {
  const [showDeleteConformation, setShowDeleteConformation] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="absolute right-0.5 top-0.5"
          >
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex gap-3 items-center"
            onClick={() => setShowDeleteConformation(true)}
          >
            <Trash2 className="size-4" />
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex gap-3 items-center"
            onClick={onPrintClick}
          >
            <Printer className="size-4" />
            Print
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteConformationDialog
        onOpenChange={setShowDeleteConformation}
        resumeId={resumeId}
        open={showDeleteConformation}
      />
    </>
  );
}

interface DeleteConformationDialogProps {
  resumeId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function DeleteConformationDialog({
  onOpenChange,
  open,
  resumeId,
}: DeleteConformationDialogProps) {
  const [isPending, startTransition] = useTransition();

  async function handleDelete() {
    startTransition(async () => {
      try {
        await deleteResume(resumeId);
        onOpenChange(false);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong. try again");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete resume?</DialogTitle>
          <DialogDescription>
            This will permanently delete this resume. This action cannnot be
            undone
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <LoadingBtn
            variant="destructive"
            onClick={handleDelete}
            loading={isPending}
          >
            Delete
          </LoadingBtn>
          <Button variant={"secondary"} onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
