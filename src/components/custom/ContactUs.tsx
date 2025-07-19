import { Mail, Linkedin, Github, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactUs() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Get In <span className="text-blue-600">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Have questions about AutoCV? Want to collaborate? I'd love to hear from you!
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Email Card */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl font-semibold">Email Me</CardTitle>
              <CardDescription>
                Send me a message and I'll get back to you within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                variant="outline"
                className="w-full"
                asChild
              >
                <a href="mailto:p452570@gmail.com" className="flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4" />
                  p452570@gmail.com
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* LinkedIn Card */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Linkedin className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl font-semibold">LinkedIn</CardTitle>
              <CardDescription>
                Connect with me professionally and see my latest updates
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                variant="outline"
                className="w-full"
                asChild
              >
                <a 
                  href="https://linkedin.com/in/sudip-paul20" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <Linkedin className="h-4 w-4" />
                  Connect on LinkedIn
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* GitHub Card */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-border/50">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Github className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl font-semibold">GitHub</CardTitle>
              <CardDescription>
                Check out my projects and contribute to open source
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                variant="outline"
                className="w-full"
                asChild
              >
                <a 
                  href="https://github.com/Sudip-2" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  View GitHub Profile
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <MessageCircle className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Let's Collaborate!</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                I'm always interested in exciting projects, freelance opportunities, 
                or just having a chat about technology and development.
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
                <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full border">Frontend Development</span>
                <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full border">Full-Stack Projects</span>
                <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full border">AI Integration</span>
                <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full border">Open Source</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Response Time */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-full text-sm font-medium">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            Typically responds within 24 hours
          </div>
        </div>
      </div>
    </section>
  );
}