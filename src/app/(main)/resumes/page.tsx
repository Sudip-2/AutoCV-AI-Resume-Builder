import ResumeItem from "@/components/custom/ResumeItem";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { PlusSquare } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

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

  const totalResumes = await prisma.resume.count({ where: { userId } });

  return (
    <main className="max-w-7xl 2xl:max-w-[1536px] w-full mx-auto px-3 py-6">
      <div className="space-y-3">
        <h1 className="text-xl font-semibold">Your resumes {totalResumes}</h1>
        <div className="flex flex-col sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <div className="sm:h-full sm:rounded-lg sm:border border-transparent sm:bg-secondary sm:p-3 sm:transition-colors sm:hover:border-border sm:hover:shadow-sm flex justify-center sm:items-center">
            <Button asChild>
              <Link href={"/editor"} >
                <PlusSquare className="size-5"/>
                <span className="text-lg">New resume</span>
              </Link>
            </Button>
          </div>
          {resumes.map((resume) => (
            <ResumeItem resume={resume} key={resume.id} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default page;
