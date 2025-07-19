import {
  FileText,
  Users,
  CreditCard,
  Shield,
  AlertTriangle,
  Mail,
  Scale,
} from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Scale className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-foreground">
              Terms of Service
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
              <FileText className="h-6 w-6 text-blue-600" />
              Agreement to Terms
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to AutoCV! These Terms of Service ("Terms") govern your
              use of our AI-powered resume builder service. By accessing or
              using AutoCV, you agree to be bound by these Terms. If you
              disagree with any part of these terms, you may not access the
              service.
            </p>
          </section>

          {/* Service Description */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Service Description</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              AutoCV is an AI-powered resume building platform that provides:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Professional resume templates and design tools</li>
              <li>AI-powered content analysis and optimization</li>
              <li>ATS (Applicant Tracking System) compatibility scoring</li>
              <li>Resume export in formats like PDF</li>
              <li>Cloud storage for your resume data</li>
              <li>Premium features through subscription plans</li>
            </ul>
          </section>

          {/* User Accounts */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Users className="h-6 w-6 text-blue-600" />
              User Accounts
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Account Creation</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>You must provide accurate and complete information</li>
                  <li>You are responsible for maintaining account security</li>
                  <li>One account per person or entity</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Account Responsibilities
                </h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Keep your login credentials secure</li>
                  <li>Notify us immediately of any unauthorized use</li>
                  <li>You are liable for all activities under your account</li>
                  <li>Do not share your account with others</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Subscription Plans */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <CreditCard className="h-6 w-6 text-blue-600" />
              Subscription and Billing
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Free Plan</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Limited to 2 resume creations</li>
                  <li>Access to basic templates</li>
                  <li>Standard AI analysis features</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Premium Plan</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Unlimited resume creations</li>
                  <li>Access to all premium templates</li>
                  <li>Advanced AI optimization features</li>
                  <li>Priority customer support</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Billing Terms</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Subscriptions are billed monthly </li>
                  <li>Payments are processed through Razorpay</li>
                  <li>Automatic renewal unless cancelled</li>
                  <li>Refunds not allowed</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Acceptable Use */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-6 w-6 text-blue-600" />
              Acceptable Use Policy
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You agree not to use AutoCV for any unlawful or prohibited
              activities:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-red-600">
                  Prohibited Activities:
                </h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                  <li>Creating false or misleading resumes</li>
                  <li>Uploading malicious files or content</li>
                  <li>Attempting to breach security measures</li>
                  <li>Spamming or automated abuse</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-green-600">Encouraged Use:</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                  <li>Creating honest, professional resumes</li>
                  <li>Using AI suggestions to improve content</li>
                  <li>Providing feedback to improve our service</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Intellectual Property
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Your Content</h3>
                <p className="text-muted-foreground leading-relaxed">
                  You retain ownership of all content you create using AutoCV.
                  We only use your data to provide our services and improve the
                  platform as outlined in our Privacy Policy.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Our Platform</h3>
                <p className="text-muted-foreground leading-relaxed">
                  AutoCV's technology, templates are our proprietary
                  intellectual property. You may not copy, modify, or distribute
                  our platform without permission.
                </p>
              </div>
            </div>
          </section>

          {/* Data and Privacy */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Protection</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Your privacy is important to us. Our data practices are governed
              by our Privacy Policy, which covers:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>How we collect and use your information</li>
              <li>Data security measures and encryption</li>
              <li>Your rights regarding your personal data</li>
              <li>Third-party integrations (Clerk, Google AI, Razorpay)</li>
              <li>Data retention and deletion policies</li>
            </ul>
          </section>

          {/* Service Availability */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Service Availability
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We strive to maintain 99.9% uptime but cannot guarantee
              uninterrupted service. We may perform maintenance, updates, or
              temporarily suspend service with reasonable notice. We are not
              liable for any downtime or service interruptions.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
              Limitation of Liability
            </h2>
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="text-sm text-muted-foreground leading-relaxed">
                AutoCV is provided "as is" without warranties. We are not liable
                for any indirect, incidental, or consequential damages. We do
                not guarantee job placement or interview success.
              </p>
            </div>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Termination</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">By You</h3>
                <p className="text-muted-foreground">
                  You may cancel your account at any time through your account
                  settings. Your data will be deleted according to our retention
                  policy.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">By Us</h3>
                <p className="text-muted-foreground">
                  We may suspend or terminate your account for violations of
                  these Terms, illegal activities, or extended periods of
                  inactivity.
                </p>
              </div>
            </div>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Modifications</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update these Terms from time to time. We will notify you of
              material changes via email or through our service. Continued use
              after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          {/* Contact Information */}
          <section className="border-t border-border pt-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Mail className="h-6 w-6 text-blue-600" />
              Contact Us
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have questions about these Terms of Service, please contact
              us:
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
                <strong>Questions:</strong> We typically respond within 48
                hours
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>
            © 2025 AutoCV. All rights reserved. These terms are legally
            binding.
          </p>
        </div>
      </div>
    </div>
  );
}
