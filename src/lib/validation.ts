import { z } from "zod";

export const optionalStr = z.string().trim().optional().or(z.literal(""));

export const generalInfoSchema = z.object({
  title: optionalStr,
  description: optionalStr,
});

export type generalInfoValues = z.infer<typeof generalInfoSchema>;

export const personalInfoSchema = z.object({
  photo: z
    .custom<File | undefined>()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      "Must be an image file"
    )
    .refine(
      (file) => !file || file.size <= 1024 * 1024 * 4,
      "File size must be less than 4MB"
    ),
  firstName: optionalStr,
  lastName: optionalStr,
  jobTitle: optionalStr,
  city: optionalStr,
  country: optionalStr,
  phone: optionalStr,
  email: optionalStr,
  linkedin: optionalStr,
  github: optionalStr,
});

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

export const workExperienceSchema = z.object({
  workExperience: z
    .array(
      z.object({
        position: optionalStr,
        company: optionalStr,
        startDate: optionalStr,
        endDate: optionalStr,
        description: optionalStr,
      })
    )
    .optional(),
});

export type workExperienceValues = z.infer<typeof workExperienceSchema>;

export type workExperience = NonNullable<
  z.infer<typeof workExperienceSchema>["workExperience"]
>[number];

export const educationSchema = z.object({
  education: z
    .array(
      z.object({
        degree: optionalStr,
        school: optionalStr,
        startDate: optionalStr,
        endDate: optionalStr,
      })
    )
    .optional(),
});

export type educationValues = z.infer<typeof educationSchema>;

export const skillSchema = z.object({
  skills: z.array(z.string().trim()).optional(),
});

export type skillsValues = z.infer<typeof skillSchema>;

export const summarySchema = z.object({
  summary: optionalStr,
});

export type summaryValues = z.infer<typeof summarySchema>;

export const projectSchema = z.object({
  projects: z
    .array(
      z.object({
        name: optionalStr,
        description: optionalStr,
        gitHubLink: optionalStr,
        liveLink: optionalStr,
        startDate: optionalStr,
        endDate: optionalStr,
      })
    )
    .optional(),
});

export type projectValues = z.infer<typeof projectSchema>;

export const activitySchema = z.object({
  activites: z
    .array(
      z.object({
        name: optionalStr,
        description: optionalStr,
        certLink: optionalStr,
        startDate: optionalStr,
        endDate: optionalStr,
      })
    )
    .optional(),
});

export type activityValues = z.infer<typeof activitySchema>;

export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillSchema.shape,
  ...summarySchema.shape,
  ...projectSchema.shape,
  ...activitySchema.shape,
  colorHex: optionalStr,
  borderStyle: optionalStr,
  template: optionalStr,
});

export type resumeValues = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: File | string | null;
};

export const generateWorkExperienceSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Required")
    .min(20, "Must be at least 20 characters"),
});

export type generateWorkExperienceValues = z.infer<
  typeof generateWorkExperienceSchema
>;

export const generateSummarySchema = z.object({
  jobTitle: optionalStr,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillSchema.shape,
});

export type GenerateSummaryInput = z.infer<typeof generateSummarySchema>;

// Analyze part of the app
export const analyzeResumeSchema = z.object({
  resume: z
    .instanceof(File, { message: "Upload required" })
    .refine(
      (file) =>
        [
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type),
      {
        message: "PDF or DOCX only",
      }
    )
    .refine((file) => file.size <= 1024 * 1024 * 2, {
      message: "Max size is 2MB",
    }),
});

export type analyzeResumeSchemaValues = z.infer<typeof analyzeResumeSchema>;
