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
import { workExperienceSchema, workExperienceValues } from "@/lib/validation";
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
import GenerateWorkExpBtn from "@/components/custom/GenerateWorkExpBtn";

const WorkExperienceForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<workExperienceValues>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      workExperience: resumeData.workExperience || [],
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
        workExperience:
          values.workExperience?.filter((exp) => exp !== undefined) || [],
      });
    });

    return () => {
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, [form, setResumeData, resumeData]);

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "workExperience",
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
          <h2 className="text-2xl font-semibold">Work experience</h2>
          <span className="text-muted-foreground text-sm">
            Add as many work experience as you like
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
                  <WorkExperienceItem
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
                    position: "",
                    company: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                  })
                }
              >
                Add work experience
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default WorkExperienceForm;

interface WorkExperienceItemProps {
  id: string;
  form: UseFormReturn<workExperienceValues>;
  index: number;
  remove: (index: number) => void;
}

const WorkExperienceItem = ({
  id,
  form,
  index,
  remove,
}: WorkExperienceItemProps) => {
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
        <span className="font-semibold">Work experience {index + 1}</span>
        <GripHorizontal
          className="text-muted-foreground cursor-grab"
          {...attributes}
          {...listeners}
        />
      </div>
      <div className="flex justify-center">
        <GenerateWorkExpBtn
          onWorkExpGenerated={(exp) =>
            form.setValue(`workExperience.${index}`, exp)
          }
        />
      </div>
      <FormField
        control={form.control}
        name={`workExperience.${index}.position`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job title</FormLabel>
            <FormControl>
              <Input {...field} autoFocus />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`workExperience.${index}.company`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company</FormLabel>
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
          name={`workExperience.${index}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  value={field.value ? field.value?.slice(0, 10) : ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`workExperience.${index}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>End date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  value={field.value ? field.value?.slice(0, 10) : ""}
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
        name={`workExperience.${index}.description`}
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
