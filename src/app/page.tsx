import GenerateWorkExpBtn from "@/components/custom/GenerateWorkExpBtn";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="h-svh flex items-center justify-center flex-col gap-5">
        AutoCV AI resume builder
        <Button asChild>
          <Link href={"/resumes"}>Editor</Link>
        </Button>
      </div>
    </>
  );
}
