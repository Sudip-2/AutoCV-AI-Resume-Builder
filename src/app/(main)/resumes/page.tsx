import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Your resumes",
};

const page = () => {
  return (
    <main className="max-w-7xl mx-auto px-3 py-6">
      <Button asChild>
        <Link href={"/editor"}>
          <PlusSquare />
          New resume
        </Link>
      </Button>
    </main>
  );
};

export default page;
