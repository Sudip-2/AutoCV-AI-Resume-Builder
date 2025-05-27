import { generalInfoSchema, generalInfoValues } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditorFormProps } from "@/lib/types";
import { useEffect } from "react";

const GeneralInfoForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<generalInfoValues>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
      title: resumeData.title || "",
      description: resumeData.description || "",
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
      setResumeData({ ...resumeData, ...values });
    });

    return () => {
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, [form, setResumeData, resumeData]);

  return (
    <div className="max-w-xl mx-auto px-3 py-6">
      <div className="text-center space-y-1.5">
        <h2 className="text-2xl font-semibold">General Info</h2>
        <span className="text-muted-foreground text-sm">
          This will not appear on your resume
        </span>
      </div>
      <Form {...form}>
        <form className="space-y-6 pt-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project name</FormLabel>
                <FormControl>
                  <Input placeholder="My cool resume" {...field} autoFocus />
                </FormControl>
                <FormDescription>This is your project name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="A resume for my next job" {...field} />
                </FormControl>
                <FormDescription>
                  Describe what this resume is for
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default GeneralInfoForm;
