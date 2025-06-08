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
          <Button asChild>
            <Link href={"/editor"}>
              <PlusSquare />
              New resume
            </Link>
          </Button>
          {resumes.map((resume) => (
            <ResumeItem resume={resume} key={resume.id} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default page;
