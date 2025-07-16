import { Button } from "@/components/ui/button";
import { Activity, Play, Search, Star, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="max-w-2xl animate-fade-in">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-accent/50 rounded-full px-4 py-2 text-sm font-medium text-accent-foreground mb-4">
                <Zap className="h-4 w-4 text-primary" />
                AI-Powered Resume Builder
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Build Your <span className="text-blue-600">Perfect Resume</span>{" "}
              in Minutes
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Create professional resumes with AI-powered analysis and
              optimization. Get personalized suggestions to boost your chances
              of landing your dream job.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                variant="default"
                size="lg"
                className="flex items-center gap-2"
                asChild
              >
                <Link href="/resumes">
                  <TrendingUp className="h-5 w-5" />
                  Start Building Free
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex items-center gap-2"
                asChild
              >
                <Link href="/analyze">
                  <Activity className="h-4 w-4" />
                  Analyze resume
                </Link>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <span className="ml-2">AI-Powered Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
                <span>Free to Start</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in-up">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img
                src={"https://via.placeholder.com/800x600"}
                alt="Resume Builder Interface"
                className="w-full h-auto object-cover"
              />
              {/* Overlay for better contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent"></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-card border border-border rounded-lg p-4 shadow-soft animate-scale-in">
              <div className="flex items-center gap-2 text-sm font-medium">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-foreground">AI Analysis Complete</span>
              </div>
            </div>

            <div
              className="absolute -bottom-4 -left-4 bg-card border border-border rounded-lg p-4 shadow-soft animate-scale-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="text-sm font-medium text-foreground">
                95% Match Score
              </div>
              <div className="text-xs text-muted-foreground">
                Resume Optimized
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl transform -translate-x-32 translate-y-32"></div>
      </div>
    </section>
  );
}
