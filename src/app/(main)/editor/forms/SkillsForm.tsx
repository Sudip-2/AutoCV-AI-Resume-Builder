import { EditorFormProps } from "@/lib/types";
import { skillSchema, skillsValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
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

const SkillsForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<skillsValues>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      skills: resumeData.skills || [],
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
        skills:
          values.skills
            ?.filter((skill) => skill !== undefined)
            .map((skill) => skill.trim())
            .filter((skill) => skill !== "") || [],
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
        <h2 className="text-2xl font-semibold">Skills</h2>
        <span className="text-muted-foreground text-sm">
          What are you good at?
        </span>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Skills</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="e.g. React.js, Node.js, graphic design, ..."
                    onChange={(e) => {
                      const skills = e.target.value.split(",");
                      field.onChange(skills);
                    }}
                    autoFocus
                  />
                </FormControl>
                <FormDescription>
                  Seperate each skill with a comma ,
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

export default SkillsForm;
