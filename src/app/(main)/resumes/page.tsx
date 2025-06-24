import CreateResumeBtn from "@/components/custom/CreateResumeBtn";
import ResumeItem from "@/components/custom/ResumeItem";
import canCreateResume from "@/lib/permission";
import prisma from "@/lib/prisma";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import { resumeDataInclude } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your resumes",
};

const page = async () => {
  const { userId } = await auth();

  if (!userId) return null;

  const resumes = await prisma.resume.findMany({
    where: {
      userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: resumeDataInclude,
  });

  const subLevel = await getUserSubscriptionLevel(userId);

  const totalResumes = await prisma.resume.count({ where: { userId } });

  return (
    <main className="max-w-7xl 2xl:max-w-[1536px] w-full mx-auto px-3 py-6">
      <div className="space-y-3">
        <h1 className="text-xl font-semibold">My resumes {totalResumes}</h1>
        <div className="flex flex-col sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <CreateResumeBtn
            canCreate={canCreateResume(subLevel, totalResumes)}
          />
          {resumes.map((resume) => (
            <ResumeItem resume={resume} key={resume.id} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default page;
