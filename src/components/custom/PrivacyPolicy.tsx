import { Shield, Lock, Eye, Users, Database, Mail } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-foreground">
              Privacy Policy
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-border p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Eye className="h-6 w-6 text-blue-600" />
              Introduction
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              At AutoCV ("we," "our," or "us"), we are committed to protecting
              your privacy and ensuring the security of your personal
              information. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you use our
              AI-powered resume builder service.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Database className="h-6 w-6 text-blue-600" />
              Information We Collect
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Personal Information
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Name, email address, and contact information</li>
                  <li>
                    Professional information (work experience, education,
                    skills)
                  </li>
                  <li>Resume content and uploaded documents</li>
                  <li>Profile photos and other media files</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Usage Information</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Device information and browser type</li>
                  <li>Session duration and frequency of use</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Users className="h-6 w-6 text-blue-600" />
              How We Use Your Information
            </h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Provide and improve our resume building services</li>
              <li>Generate AI-powered resume analysis and recommendations</li>
              <li>Process payments and manage subscriptions</li>
              <li>Send important updates and service notifications</li>
              <li>Provide customer support and technical assistance</li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Lock className="h-6 w-6 text-blue-600" />
              Data Security
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We implement industry-standard security measures to protect your
              personal information:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Secure cloud storage with access controls</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Limited access to personal data on a need-to-know basis</li>
              <li>Secure payment processing through certified providers</li>
            </ul>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Third-Party Services
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use trusted third-party services to enhance our platform:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Authentication</h4>
                <p className="text-sm text-muted-foreground">
                  Clerk for secure user authentication and account management
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="font-medium mb-2">AI Processing</h4>
                <p className="text-sm text-muted-foreground">
                  Google Generative AI for resume analysis and optimization
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Payments</h4>
                <p className="text-sm text-muted-foreground">
                  Razorpay for secure payment processing
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="font-medium mb-2">File Storage</h4>
                <p className="text-sm text-muted-foreground">
                  Vercel Blob for secure file uploads and storage
                </p>
              </div>
            </div>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your personal information only as long as necessary to
              provide our services and comply with legal obligations. Resume
              data is kept for the duration of your account .
            </p>
          </section>

          {/* Updates */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Policy Updates</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will
              notify you of any material changes by email or through our
              service. Your continued use of AutoCV after such modifications
              constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Contact */}
          <section className="border-t border-border pt-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Mail className="h-6 w-6 text-blue-600" />
              Contact Us
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or how we
              handle your data, please contact us:
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:p452570@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  p452570@gmail.com
                </a>
                <br />
                <strong>GitHub:</strong>{" "}
                <a
                  href="https://github.com/Sudip-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  @Sudip-2
                </a>
                <br />
                <strong>Response Time:</strong> Within 48 hours
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>
            © 2025 AutoCV. All rights reserved. Built with privacy in mind.
          </p>
        </div>
      </div>
    </div>
  );
}
