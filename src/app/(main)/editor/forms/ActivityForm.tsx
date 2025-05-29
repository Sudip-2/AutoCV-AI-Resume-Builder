import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/types";
import {
  activitySchema,
  activityValues,
  workExperienceSchema,
  workExperienceValues,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";

const WorkExperienceForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<activityValues>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      activites: resumeData.activites || [],
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
        activites: values.activites?.filter((act) => act !== undefined) || [],
      });
    });

    return () => {
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, [form, setResumeData, resumeData]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "activites",
  });

  return (
    <div>
      <div className="max-w-xl mx-auto px-3">
        <div className="text-center space-y-1.5 py-6">
          <h2 className="text-2xl font-semibold">Activites</h2>
          <span className="text-muted-foreground text-sm">
            Add activites, contest or any other extracurriculars
          </span>
        </div>
        <Form {...form}>
          <form className="space-y-3">
            {fields.map((field, index) => (
              <ActivityItem
                key={field.id}
                form={form}
                index={index}
                remove={remove}
              />
            ))}
            <div className="flex justify-center">
              <Button
                type="button"
                onClick={() =>
                  append({
                    name: "",
                    description: "",
                    certLink: "",
                    startDate: "",
                    endDate: "",
                  })
                }
              >
                Add activity
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default WorkExperienceForm;

interface ActivityItemProps {
  form: UseFormReturn<activityValues>;
  index: number;
  remove: (index: number) => void;
}

const ActivityItem = ({ form, index, remove }: ActivityItemProps) => {
  return (
    <div className="space-y-3 border rounded-md bg-background p-3">
      <div className="flex justify-between gap-2">
        <span className="font-semibold">Activity {index + 1}</span>
        <GripHorizontal className="text-muted-foreground cursor-grab" />
      </div>
      <FormField
        control={form.control}
        name={`activites.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Activity name</FormLabel>
            <FormControl>
              <Input {...field} autoFocus />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`activites.${index}.certLink`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Certificate url</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-2">
        <FormField
          control={form.control}
          name={`activites.${index}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  value={field.value?.slice(0, 10)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`activites.${index}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>End date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  value={field.value?.slice(0, 10)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormDescription>
        Leave <span className="font-semibold">end date</span> empty if you are
        currently work there
      </FormDescription>
      <FormField
        control={form.control}
        name={`activites.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button variant="destructive" onClick={() => remove(index)}>
        Remove
      </Button>
    </div>
  );
};
