"use client";
import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import { ModeToggle } from "@/components/custom/ToggleBtn";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { theme } = useTheme();
  return (
    <header className="shadow-sm">
      <div className="max-w-7xl 2xl:max-w-[1536px] p-3 mx-auto flex justify-between items-center w-full">
        <Link href={"/resumes"} className="flex items-center gap-2">
          <div className="h-8 w-8 relative">
            <Image src={logo} alt="logo" fill className="rounded-full" />
          </div>
          <span className="font-bold text-xl">AutoCV</span>
        </Link>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <UserButton
            appearance={{
              baseTheme: theme === "dark" || "system" ? dark : undefined,
              elements: {
                avatarBox: {
                  width: 32,
                  height: 32,
                },
              },
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Link
                label="Billing"
                labelIcon={<CreditCard className="h-4 w-4" />}
                href="/billing"
              />
            </UserButton.MenuItems>
          </UserButton>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
