"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";
import { Menu, X, FileText } from "lucide-react";
import { ModeToggle } from "./ToggleBtn";

export default function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">AutoCV</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Pricing
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="text-muted-foreground hover:text-primary"
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button> */}
            <ModeToggle />
            <Button variant="outline">Sign In</Button>
            <Button variant="default">Get Started</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="text-muted-foreground hover:text-primary"
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button> */}
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <a
                href="#features"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                How It Works
              </a>
              <a
                href="#pricing"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Pricing
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
                <Button variant="default" className="w-full">
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
