import { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { resumeDataInclude } from "@/lib/types";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import { canUsePremiumTemplates } from "@/lib/permission";

interface PageProps {
  searchParams: Promise<{ resumeId?: string }>;
}

export const metadata: Metadata = {
  title: "Design your resume",
};

const page = async ({ searchParams }: PageProps) => {
  const { resumeId } = await searchParams;

  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({
        where: { id: resumeId, userId },
        include: resumeDataInclude,
      })
    : null;

  const subSriptionLevel = await getUserSubscriptionLevel(userId);

  return (
    <ResumeEditor
      resumeToEdit={resumeToEdit}
      canUserPremTempl={!canUsePremiumTemplates(subSriptionLevel)}
    />
  );
};

export default page;
