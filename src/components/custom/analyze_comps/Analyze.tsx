"use client";
import { Button } from "@/components/ui/button";
import {
  analyzeResumeSchema,
  analyzeResumeSchemaValues,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
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
import { useState } from "react";
import LoadingBtn from "../LoadingBtn";
import AnimatedNum from "../AnimatedNum";

interface resumeResponse {
  score: number;
  strongPoints: string[];
  weakPoints: string[];
  recommendations: string[];
}

export default function Analyze() {
  const [resumeData, setResumeData] = useState<resumeResponse | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<analyzeResumeSchemaValues>({
    resolver: zodResolver(analyzeResumeSchema),
    defaultValues: {
      resume: undefined,
    },
  });

  async function onSubmit(values: analyzeResumeSchemaValues) {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("resume", values.resume);
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResumeData(data);
      console.log("Response data:", resumeData);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="container mx-auto py-5 px-3 min-h-screen">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Analyze Your Resume
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6 text-center text-muted-foreground">
        Find out how your resume performs on ATS — get a score out of 100 and
        see what is strong or needs improvement.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center py-10 space-y-5"
        >
          <FormField
            control={form.control}
            name="resume"
            render={({ field: { onChange, onBlur, name, ref } }) => (
              <FormItem className="w-[200px] h-[200px] outline outline-dashed relative rounded-md">
                <FormLabel className="border flex justify-center">
                  <Upload className="size-10" />
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".pdf,.docx"
                    className="absolute outline top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[100px] opacity-0"
                    name={name}
                    onBlur={onBlur}
                    ref={ref}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      onChange(file);
                    }}
                  />
                </FormControl>
                <FormDescription className="absolute bottom-[-30px] left-[-40px] w-[300px]">
                  Upload your resume in PDF or DOCX format
                </FormDescription>
                <FormMessage className="absolute bottom-[-50px] w-[300px] left-11" />
              </FormItem>
            )}
          />
          <LoadingBtn type="submit" className="mt-10" loading={isLoading}>
            Submit
          </LoadingBtn>
        </form>
      </Form>
      {resumeData && (
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Analysis Results
          </h2>
          <p className="flex items-center gap-2">
            <strong className="scroll-m-20 text-xl font-semibold tracking-tight">
              Score:
            </strong>{" "}
            <AnimatedNum number={resumeData.score} /> / 100
          </p>
          <div>
            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Strong Points:
            </h3>
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
              {resumeData.strongPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Weak Points:
            </h3>
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
              {resumeData.weakPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Recommendations:
            </h3>
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
              {resumeData.recommendations.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
