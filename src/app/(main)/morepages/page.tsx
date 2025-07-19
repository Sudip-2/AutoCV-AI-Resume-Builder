import ContactUs from "@/components/custom/ContactUs";
import PrivacyPolicy from "@/components/custom/PrivacyPolicy";
import TermsOfService from "@/components/custom/TermsOfService";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function page({ searchParams }: PageProps) {
  const { page } = await searchParams;
  switch (page) {
    case "contact":
      return <ContactUs />;
      break;
    case "privacy":
      return <PrivacyPolicy />;
      break;
    case "terms":
      return <TermsOfService />;
      break;
    default:
      return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <h1 className="text-3xl font-bold text-center mb-8">
            <Link href={"/"} className="flex items-center justify-center gap-2">
              Go back to Main page
              <ArrowRight />
            </Link>
          </h1>
          <p className="text-center text-muted-foreground mb-4">
            This is a placeholder for more pages. Please select a valid page.
          </p>
        </div>
      );
      break;
  }
}
