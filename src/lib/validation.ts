import { z } from "zod"; //The z object contains all the functions and types from Zod

export const optionalStr = z.string().trim().optional().or(z.literal(""));

export const generalInfoSchema = z.object({
  title: optionalStr,
  description: optionalStr,
});

export type generalInfoValues = z.infer<typeof generalInfoSchema>; //z.infer extract the typescript type version from the schema Example - title: optionalStr will be string,

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
  summary:optionalStr,
})

export type summaryValues = z.infer<typeof summarySchema>

export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillSchema.shape,
  ...summarySchema.shape
});

export type resumeValues = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: File | string | null;
};
