import GenerateSummaryBtn from "@/components/custom/GenerateSummaryBtn";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/types";
import { summarySchema, summaryValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const SummaryForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<summaryValues>({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      summary: resumeData.summary || "",
    },
  });
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const subscription = form.watch((values) => {
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        const isValid = await form.trigger();
        if (!isValid) return;
      }, 300);
      setResumeData({
        ...resumeData,
        ...values,
      });
    });

    return () => {
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, [form, setResumeData, resumeData]);

  return (
    <div className="max-w-xl mx-auto px-3">
      <div className="text-center space-y-1.5 py-6">
        <h2 className="text-2xl font-semibold">Professional summary</h2>
        <span className="text-muted-foreground text-sm">
          Write a short introduction for your resume or let the AI generate one
          from your entered data.
        </span>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Summary</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="A brief, engaging text about yourself"
                    autoFocus
                  />
                </FormControl>
                <FormMessage />
                <GenerateSummaryBtn resumeData={resumeData} onSummaryGenerated={summary => form.setValue("summary",summary)}/>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default SummaryForm;
