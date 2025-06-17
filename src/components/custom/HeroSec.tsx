import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Badge } from "../ui/badge";

export default function HeroSec() {
  return (
    <section className="pt-24 md:pt-30 lg:pt-32 xl:pt-36 flex flex-col space-y-4">
      <div className="flex flex-col items-start text-center space-y-1 xl:space-y-3 2xl:space-y-5">
        <Badge variant={"outline"} className="text-xs text-gray-400 lg:text-base rounded-xl">
          ATS-Optimized Resumes
        </Badge>
        <div className="text-primary font-bold text-xl md:text-4xl lg:text-5xl xl:text-6xl max-w-[200px] md:max-w-[700px] lg:max-w-[1040px] text-start">
          <span className="text-blue-500 hover:text-blue-600 text-2xl md:text-5xl lg:text-6xl xl:text-7xl">
            Create Professional Resumes
          </span>{" "}
          <span className="inline-block md:mt-4">That Get You Hired</span>
        </div>
        <p className="text-sm md:text-lg text-gray-500 max-w-[360px] md:max-w-[450px] text-start">
          Build stunning, ATS-friendly resumes with AutoCV in minutes using
          templates used by professionals and AI-powered suggestions.
        </p>
      </div>
      <div className="flex flex-col items-center space-y-3">
        <Button
          size="lg"
          className="h-11 px-8 group bg-blue-500 hover:bg-blue-600 duration-150 w-full sm:w-auto"
          asChild
        >
          <Link href="/resumes">
            Build My Resume Free
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform " />
          </Link>
        </Button>
        <Button variant="outline" size="lg" className="group h-11 px-8 w-full sm:w-auto" asChild>
          <Link href="#">
            Analyze Resume
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
      <div className="flex flex-wrap  space-x-3 items-center justify-center max-w-[400px] mx-auto">
        <span className="flex items-center text-muted-foreground text-sm">
          <CheckCircle className="h-4 w-4 text-green-500" />
          Free forever plan
        </span>

        <span className="flex items-center text-muted-foreground text-sm">
          <CheckCircle className="h-4 w-4 text-green-500" />
          No credit card required
        </span>

        <span className="flex items-center text-muted-foreground text-sm">
          <CheckCircle className="h-4 w-4 text-green-500" />
          ATS-optimized resumes
        </span>
      </div>
    </section>
  );
}

// {/* Features Section */}
//         <section id="features" className="w-full py-12 md:py-24 lg:py-32">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <Badge variant="outline">Features</Badge>
//                 <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
//                   Everything you need to land your dream job
//                 </h2>
//                 <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//                   Our resume builder provides professional templates, AI-powered
//                   content suggestions, and ATS optimization to help you create
//                   resumes that get noticed by employers.
//                 </p>
//               </div>
//             </div>
//             <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
//               <Card>
//                 <CardHeader>
//                   <FileText className="h-10 w-10 text-primary" />
//                   <CardTitle>Professional Templates</CardTitle>
//                   <CardDescription>
//                     Choose from 50+ professionally designed templates that are
//                     loved by recruiters and hiring managers.
//                   </CardDescription>
//                 </CardHeader>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <Shield className="h-10 w-10 text-primary" />
//                   <CardTitle>ATS-Optimized</CardTitle>
//                   <CardDescription>
//                     All templates are optimized for Applicant Tracking Systems
//                     to ensure your resume gets past the bots.
//                   </CardDescription>
//                 </CardHeader>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <Zap className="h-10 w-10 text-primary" />
//                   <CardTitle>AI-Powered Suggestions</CardTitle>
//                   <CardDescription>
//                     Get intelligent content suggestions and keyword optimization
//                     to make your resume stand out.
//                   </CardDescription>
//                 </CardHeader>
//               </Card>
//             </div>
//           </div>
//         </section>

//         {/* Feature Showcase */}
//         <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
//           <div className="container px-4 md:px-6 mx-auto">
//             <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
//               <div className="flex flex-col justify-center space-y-4">
//                 <div className="space-y-2">
//                   <Badge variant="outline">Smart Analysis</Badge>
//                   <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
//                     Get instant feedback with AI-powered resume analysis
//                   </h2>
//                   <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//                     Our advanced AI analyzes your resume and provides a detailed
//                     score with actionable feedback. Identify weak spots,
//                     optimize keywords, and improve your chances of getting
//                     hired.
//                   </p>
//                 </div>
//                 <ul className="grid gap-2 py-4">
//                   <li className="flex items-center gap-2">
//                     <CheckCircle className="h-4 w-4 text-green-500" />
//                     <span>Instant resume scoring (0-100)</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <CheckCircle className="h-4 w-4 text-green-500" />
//                     <span>Detailed feedback and suggestions</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <CheckCircle className="h-4 w-4 text-green-500" />
//                     <span>ATS compatibility analysis</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <CheckCircle className="h-4 w-4 text-green-500" />
//                     <span>Keyword optimization recommendations</span>
//                   </li>
//                 </ul>
//                 <div className="flex flex-col gap-2 min-[400px]:flex-row">
//                   <Button>
//                     Analyze My Resume
//                     <ArrowRight className="ml-2 h-4 w-4" />
//                   </Button>
//                   <Button variant="outline">See Sample Analysis</Button>
//                 </div>
//               </div>
//               <Image
//                 alt="Resume analysis dashboard"
//                 className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
//                 height="310"
//                 src="/placeholder.svg?height=310&width=550"
//                 width="550"
//               />
//             </div>
//           </div>
//         </section>

//         {/* Resume Analysis Section */}
//         <section className="w-full py-12 md:py-24 lg:py-32">
//           <div className="container px-4 md:px-6 mx-auto">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <Badge variant="outline">Analysis & Scoring</Badge>
//                 <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center">
//                   Know exactly how your resume performs
//                 </h2>
//                 <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-center mx-auto">
//                   Upload your existing resume and get an instant analysis with
//                   actionable insights to improve your job prospects.
//                 </p>
//               </div>
//             </div>
//             <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-2 lg:gap-12">
//               <Card>
//                 <CardHeader className="text-center">
//                   <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
//                     <span className="text-2xl font-bold text-primary">95</span>
//                   </div>
//                   <CardTitle>Resume Score</CardTitle>
//                   <CardDescription>
//                     Get an instant score from 0-100 based on industry standards,
//                     ATS compatibility, and content quality.
//                   </CardDescription>
//                 </CardHeader>
//               </Card>
//               <Card>
//                 <CardHeader className="text-center">
//                   <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
//                     <FileText className="h-8 w-8 text-primary" />
//                   </div>
//                   <CardTitle>Detailed Feedback</CardTitle>
//                   <CardDescription>
//                     Receive specific suggestions on formatting, keywords,
//                     skills, and content to make your resume stand out.
//                   </CardDescription>
//                 </CardHeader>
//               </Card>
//             </div>
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
//                   Ready to build your winning resume?
//                 </h2>
//                 <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//                   Join over 100,000 job seekers who have successfully landed
//                   their dream jobs with our resume builder.
//                 </p>
//               </div>
//               <div className="w-full max-w-sm space-y-2">
//                 <form className="flex gap-2">
//                   <Input
//                     className="max-w-lg flex-1 bg-primary-foreground text-primary"
//                     placeholder="Enter your email to get started"
//                     type="email"
//                   />
//                   <Button type="submit" variant="secondary">
//                     Start Building
//                   </Button>
//                 </form>
//                 <p className="text-xs text-primary-foreground/60">
//                   Create your first resume for free. No credit card required.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
//         <p className="text-xs text-muted-foreground">
//           © 2024 ResumeBuilder Pro. All rights reserved.
//         </p>
//         <nav className="sm:ml-auto flex gap-4 sm:gap-6">
//           <Link className="text-xs hover:underline underline-offset-4" href="#">
//             Terms of Service
//           </Link>
//           <Link className="text-xs hover:underline underline-offset-4" href="#">
//             Privacy Policy
//           </Link>
//           <Link className="text-xs hover:underline underline-offset-4" href="#">
//             Support
//           </Link>
//         </nav>
//       </footer>
