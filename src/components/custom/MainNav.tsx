import Link from "next/link";
import { Button } from "../ui/button";

export default function MainNav() {
  return (
    <header className="sticky top-0 backdrop-blur-md">
      <div className="container mx-auto px-3 flex items-center justify-between py-3">
        <span className="font-semibold text-xl text-blue-500">
          <Link href="/">AutoCV</Link>
        </span>
        <nav>
          <ul className="hidden sm:flex items-center space-x-7">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="#features">Features</Link>
            </li>
            <li>
              <Link href="/billing">Pricing</Link>
            </li>
            <li>
              <Link href="#">Contact</Link>
            </li>
          </ul>
        </nav>
        <div className="space-x-3">
          <Button asChild variant={"ghost"}>
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button asChild variant={"secondary"} className="bg-blue-500 hover:bg-blue-600 text-white hover:text-white">
            <Link href="/resumes">Get started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
