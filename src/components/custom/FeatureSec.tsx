import { FileText, Shield, Zap } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function FeatureSec() {
  return (
    <div>
      <section id="features" className="py-24 md:py-30 lg:py-32 xl:py-36">
        {" "}
        <div className="container px-4 md:px-6">
          {" "}
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            {" "}
            <div className="space-y-2">
              <Badge variant="outline">Features</Badge>{" "}
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Everything you need to land your dream job{" "}
              </h2>{" "}
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our resume builder provides professional templates, AI-powered
                content suggestions, and ATS optimization to help you create
                resumes that get noticed by employers.{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
          <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            {" "}
            <Card>
              {" "}
              <CardHeader>
                <FileText className="h-10 w-10 text-primary" />
                <CardTitle>Professional Templates</CardTitle>{" "}
                <CardDescription>
                  Choose from 50+ professionally designed templates that are
                  loved by recruiters and hiring managers.{" "}
                </CardDescription>{" "}
              </CardHeader>{" "}
            </Card>{" "}
            <Card>
              {" "}
              <CardHeader>
                <Shield className="h-10 w-10 text-primary" />
                <CardTitle>ATS-Optimized</CardTitle>{" "}
                <CardDescription>
                  All templates are optimized for Applicant Tracking Systems to
                  ensure your resume gets past the bots.{" "}
                </CardDescription>{" "}
              </CardHeader>{" "}
            </Card>{" "}
            <Card>
              {" "}
              <CardHeader>
                <Zap className="h-10 w-10 text-primary" />
                <CardTitle>AI-Powered Suggestions</CardTitle>{" "}
                <CardDescription>
                  Get intelligent content suggestions and keyword optimization
                  to make your resume stand out.{" "}
                </CardDescription>{" "}
              </CardHeader>{" "}
            </Card>{" "}
          </div>{" "}
        </div>{" "}
      </section>
    </div>
  );
}
