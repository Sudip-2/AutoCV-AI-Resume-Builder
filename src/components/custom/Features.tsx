import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bot,
  FileText,
  Download,
  BarChart3,
  Palette,
  Shield,
  Sparkles,
  Target,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Features() {
  const features = [
    {
      icon: Bot,
      title: "AI-Powered Analysis",
      description:
        "Get intelligent feedback on your resume content, formatting, and keywords to maximize your chances.",
      video: "/autoCVDemo.mp4",
    },
    {
      icon: Palette,
      title: "Professional Templates",
      description:
        "Choose from multiple ATS-friendly templates designed by professional recruiters and maximize your chances.",
      image: "/subHeroImg.png",
    },
    {
      icon: BarChart3,
      title: "Real-time Scoring",
      description:
        "See your resume score improve in real-time as you make AI-suggested improvements.",
    },
    {
      icon: Target,
      title: "Job-Specific Optimization",
      description:
        "Tailor your resume for specific job postings with targeted keyword optimization.",
    },
    {
      icon: CheckCircle,
      title: "Best in class editor",
      description:
        "Edit your resume with a powerful, user-friendly editor that supports multiple templates and styles.",
    },
    {
      icon: Shield,
      title: "Privacy Protected",
      description:
        "Your data is secure with us. We never share your personal information.",
    },
  ];

  return (
    <section
      id="features"
      className="py-20 lg:py-28 bg-gray-50 dark:bg-[#101624]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-white shadow-sm dark:bg-gray-800/60 rounded-full px-4 py-2 text-sm font-medium text-blue-500 mb-4">
            <Sparkles className="h-4 w-4" />
            Powerful Features
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Everything You Need to Land Your Dream Job
          </h2>
          <p className="text-xl text-muted-foreground">
            Our AI-powered platform combines cutting-edge technology with
            professional expertise to help you create resumes that get noticed.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {features.slice(0, 2).map((feature, index) => (
            <Card
              key={feature.title}
              className="group hover:shadow hover:dark:shadow-blue-800 dark:bg-gray-800/20 transition-all duration-300 border-border/50 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {feature.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-muted-foreground text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              {feature.video && (
                <CardContent>
                  <div className="rounded-lg overflow-hidden shadow-soft group-hover:shadow-elegant transition-shadow duration-300 shadow">
                    <video
                      src={feature.video}
                      loop
                      autoPlay
                      muted
                      className="w-full aspect-video object-cover"
                    />
                  </div>
                </CardContent>
              )}
              {feature.image && (
                <CardContent>
                  <div className="relative rounded-lg overflow-hidden shadow-soft group-hover:shadow-elegant transition-shadow duration-300 shadow">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      // fill
                      className="w-full aspect-video object-cover"
                    />
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Secondary Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.slice(2).map((feature, index) => (
            <Card
              key={feature.title}
              className="group hover:shadow hover:dark:shadow-blue-800 dark:bg-gray-800/20 transition-all duration-300 border-border/50"
              style={{ animationDelay: `${(index + 2) * 0.1}s` }}
            >
              <CardHeader>
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors w-fit mb-4">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center animate-fade-in">
          <Button variant="hero" size="lg" className="group" asChild>
            <Link href={"/resumes"}>
              <FileText className="h-5 w-5 group-hover:scale-110 transition-transform" />
              Try All Features Free
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            No credit card required • Free forever plan available
          </p>
        </div>
      </div>
    </section>
  );
}
