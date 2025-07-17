import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Bot, Download, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: Upload,
      title: "Fill your details",
      description:
        "start building from by filling details using our intuitive editor.",
      details: [
        "Supports PDF and DOCX",
        "Smart fill AI",
        "Autosaves your data",
      ],
    },
    {
      step: "02",
      icon: Bot,
      title: "AI Analysis & Optimization",
      description:
        "Our AI analyzes your resume and provides personalized suggestions for improvement.",
      details: [
        "Content optimization",
        "Keyword analysis",
        "ATS compatibility check",
      ],
    },
    {
      step: "03",
      icon: Download,
      title: "Download & Apply",
      description:
        "Download your optimized resume and start applying with confidence.",
      details: [
        "PDF exports",
        "Professional formatting",
        "Ready for any application",
      ],
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 dark:bg-[#0c131e]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Simple Process,{" "}
            <span className="text-blue-500">Powerful Results</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Get from zero to interview-ready in just three easy steps. Our
            streamlined process makes professional resume building effortless.
          </p>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-6 mb-16">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              <Card
                className="h-full group hover:shadow-elegant dark:bg-gray-900/80 transition-all duration-300 border-border/50 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader>
                  {/* Step Number */}
                  <div className="text-6xl font-bold text-primary/20 mb-4 group-hover:text-primary/30 transition-colors">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-foreground">
                      {step.title}
                    </CardTitle>
                  </div>

                  <CardDescription className="text-muted-foreground text-base leading-relaxed mb-6">
                    {step.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li
                        key={detailIndex}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Arrow connector (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <div className="bg-background border border-border rounded-full p-2 shadow-soft">
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-hero rounded-2xl p-8 lg:p-12 animate-fade-in">
          <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
            Ready to Build Your Perfect Resume?
          </h3>
          <p className="text-muted-foreground mb-8 text-lg">
            Join thousands of job seekers who have already improved their
            resumes with our AI-powered platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" className="group" asChild>
              <Link href={"/resumes"}>
                Start Building Now
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Free to start • No credit card required • 5-minute setup
          </p>
        </div>
      </div>
    </section>
  );
}
