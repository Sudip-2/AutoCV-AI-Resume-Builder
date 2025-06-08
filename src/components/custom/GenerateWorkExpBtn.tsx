import {
  generateWorkExperienceSchema,
  generateWorkExperienceValues,
  workExperience,
} from "@/lib/validation";
import { Button } from "../ui/button";
import { useState } from "react";
import { WandSparklesIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { generateWorkExperience } from "@/app/Actions/aiAction";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Textarea } from "../ui/textarea";
import LoadingBtn from "./LoadingBtn";

interface GenerateWorkExpBtnProps {
  onWorkExpGenerated: (workExp: workExperience) => void;
}

export default function GenerateWorkExpBtn({
  onWorkExpGenerated,
}: GenerateWorkExpBtnProps) {
  const [showInputDialog, setShowInputDialog] = useState(false);
  return (
    <>
      <Button variant="outline" type = "button" onClick={() => setShowInputDialog(true)}>
        {" "}
        <WandSparklesIcon className="size-4" />
        Smart fill (AI)
      </Button>
      <InputDialog
        open={showInputDialog}
        onOpenChange={setShowInputDialog}
        onWorkExpGenerated={(workExp) => {
          onWorkExpGenerated(workExp);
          setShowInputDialog(false);
        }}
      />
    </>
  );
}

interface InputDialogProps extends GenerateWorkExpBtnProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const InputDialog = ({
  open,
  onOpenChange,
  onWorkExpGenerated,
}: InputDialogProps) => {
  const form = useForm<generateWorkExperienceValues>({
    resolver: zodResolver(generateWorkExperienceSchema),
    defaultValues: {
      description: "",
    },
  });

  async function onSubmit(input: generateWorkExperienceValues) {
    try {
      const response = await generateWorkExperience(input);
      onWorkExpGenerated(response);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. try again");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate work experience</DialogTitle>
          <DialogDescription>
            Describe this work experience and the AI will generate an optimized
            entry for you
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3.5">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={`E.g. "from nov 2020 to dec 2022 I worked at google as a software engineer, tasks were:...`}
                      autoFocus
                    />
                  </FormControl>
                    <LoadingBtn
                      type="submit"
                      loading={form.formState.isSubmitting}
                    >
                      Generate
                    </LoadingBtn>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
