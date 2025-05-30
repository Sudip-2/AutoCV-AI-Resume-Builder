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
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

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

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "activites",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      move(oldIndex, newIndex);
      return arrayMove(fields, oldIndex, newIndex);
    }
  }

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
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              modifiers={[restrictToVerticalAxis]}
            >
              <SortableContext
                items={fields}
                strategy={verticalListSortingStrategy}
              >
                {fields.map((field, index) => (
                  <ActivityItem
                    id={field.id}
                    key={field.id}
                    form={form}
                    index={index}
                    remove={remove}
                  />
                ))}
              </SortableContext>
            </DndContext>
            <div className="flex justify-center">
              <Button
                type="button"
                className="mb-3"
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
  id: string;
  form: UseFormReturn<activityValues>;
  index: number;
  remove: (index: number) => void;
}

const ActivityItem = ({ id, form, index, remove }: ActivityItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  return (
    <div
      className={cn(
        "space-y-3 border rounded-md bg-background p-3",
        isDragging && "shadow-xl z-50 cursor-grab relative"
      )}
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <div className="flex justify-between gap-2">
        <span className="font-semibold">Activity {index + 1}</span>
        <GripHorizontal
          className="text-muted-foreground cursor-grab"
          {...attributes}
          {...listeners}
        />
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
