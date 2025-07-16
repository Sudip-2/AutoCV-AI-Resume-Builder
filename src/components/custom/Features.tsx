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
// import aiImage from "@/assets/features-ai.jpg";
// import templatesImage from "@/assets/features-templates.jpg";

export default function Features() {
  const features = [
    {
      icon: Bot,
      title: "AI-Powered Analysis",
      description:
        "Get intelligent feedback on your resume content, formatting, and keywords to maximize your chances.",
      image: "https://via.placeholder.com/800x600",
    },
    {
      icon: Palette,
      title: "Professional Templates",
      description:
        "Choose from dozens of ATS-friendly templates designed by professional recruiters.",
      image: "https://via.placeholder.com/800x600",
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
      icon: Download,
      title: "Multiple Export Formats",
      description:
        "Download your resume in PDF, Word, or plain text formats with perfect formatting.",
    },
    {
      icon: Shield,
      title: "Privacy Protected",
      description:
        "Your data is encrypted and secure. We never share your personal information.",
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 text-sm font-medium text-primary mb-4">
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
              className="group hover:shadow-elegant transition-all duration-300 border-border/50 animate-fade-in-up"
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
              {feature.image && (
                <CardContent>
                  <div className="rounded-lg overflow-hidden shadow-soft group-hover:shadow-elegant transition-shadow duration-300">
                    <img
                      src={"https://via.placeholder.com/800x600"}
                      alt={feature.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
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
              className="group hover:shadow-soft transition-all duration-300 border-border/50 animate-fade-in-up"
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
          <Button variant="default" size="lg" className="group">
            <FileText className="h-5 w-5 group-hover:scale-110 transition-transform" />
            Try All Features Free
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            No credit card required • Free forever plan available
          </p>
        </div>
      </div>
    </section>
  );
}
