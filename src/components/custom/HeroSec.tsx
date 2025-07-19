"use client";
import { Button } from "@/components/ui/button";
import { Activity, Star, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Hero() {
  const [videoLoading, setVideoLoading] = useState(true);

  return (
    <section
      className="relative overflow-hidden bg-blue-50 dark:bg-gray-900"
      id="hero"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="max-w-2xl animate-fade-in">
            <div className="mb-6">
              <div className="bg-white dark:bg-gray-800/70 text-blue-500 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium mb-4 shadow-sm">
                <Zap className="h-4 w-4" />
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
                variant="hero"
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
                      className="h-4 w-4 fill-blue-500 text-blue-500"
                    />
                  ))}
                </div>
                <span className="ml-2">AI-Powered Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
                <span>Free to Start</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in-up">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant w-full aspect-video shadow-md">
              {/* Loading State */}
              {videoLoading && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm text-muted-foreground">
                      Loading demo...
                    </span>
                  </div>
                </div>
              )}

              <video
                src="/autoCVDemo.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                onLoadedData={() => setVideoLoading(false)}
                onCanPlay={() => setVideoLoading(false)}
                onLoadStart={() => setVideoLoading(true)}
                onError={() => setVideoLoading(false)}
              ></video>
            </div>

            {/* Floating Elements */}
            <div className="hidden sm:block absolute -top-4 -right-4 bg-card border border-border rounded-lg p-4 shadow-soft animate-scale-in ">
              <div className="flex items-center gap-2 text-sm font-medium">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-foreground">AI Analysis Complete</span>
              </div>
            </div>

            <div
              className="hidden sm:block absolute -bottom-4 -left-4 bg-card border border-border rounded-lg p-4 shadow-soft animate-scale-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="text-sm font-medium text-foreground">
                Check Score
              </div>
              <div className="text-xs text-muted-foreground">
                of your resume for free
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
