import { personalInfoSchema, PersonalInfoValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Input } from "@/components/ui/input";
import { useEffect, useRef } from "react";
import { EditorFormProps } from "@/lib/types";
import { Button } from "@/components/ui/button";

const PersonalInfoForm = ({ resumeData, setResumeData }: EditorFormProps) => {
  const form = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: resumeData.firstName || "",
      lastName: resumeData.lastName || "",
      jobTitle: resumeData.jobTitle || "",
      city: resumeData.city || "",
      country: resumeData.country || "",
      phone: resumeData.phone || "",
      email: resumeData.email || "",
      linkedin: resumeData.linkedin || "",
      github: resumeData.github || "",
    },
  });

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const { unsubscribe } = form.watch((values) => {
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        const isValid = await form.trigger();
        if (!isValid) return;
      }, 300);
      setResumeData({ ...resumeData, ...values });
    });

    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, [form, setResumeData, resumeData]);

  const photoInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="max-w-xl mx-auto px-3 py-6">
      <div className="text-center space-y-1.5">
        <h2 className="text-2xl font-semibold">Personal Info</h2>
        <span className="text-muted-foreground text-sm">
          Tell us about yourself
        </span>
      </div>
      <Form {...form}>
        <form className="space-y-3 pt-2">
          <FormField
            control={form.control}
            name="photo"
            render={({ field: { value, ...fieldValues } }) => (
              <FormItem>
                <FormLabel>Choose Photo</FormLabel>
                <div className="flex  gap-2">
                  <FormControl>
                    <Input
                      {...fieldValues}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        fieldValues.onChange(file);
                      }}
                      ref={photoInputRef}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      fieldValues.onChange(null);
                      if (photoInputRef.current) {
                        photoInputRef.current.value = "";
                      }
                    }}
                  >
                    Remove
                  </Button>
                </div>
                <FormDescription>Choose image</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input {...field} autoFocus />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} type="tel" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Social url 1</FormLabel>
                <FormControl>
                  <Input {...field} type="url" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="github"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Social url 2</FormLabel>
                <FormControl>
                  <Input {...field} type="url" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default PersonalInfoForm;
