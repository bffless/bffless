import ContactForm from '../components/ContactForm';

export default function PrivacyPolicy() {
  const effectiveDate = 'March 26, 2026';
  const lastUpdated = 'March 26, 2026';

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="border-b border-cream-dark bg-cream/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src="/images/logo-circle.svg" alt="BFFless" className="w-8 h-8" />
            <span className="font-semibold text-charcoal">BFFless</span>
          </a>
          <a
            href="/"
            className="text-sm text-charcoal-muted hover:text-charcoal transition-colors"
          >
            Back to Home
          </a>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-charcoal mb-4">Privacy Policy</h1>
          <p className="text-charcoal-muted">
            Effective Date: {effectiveDate} | Last Updated: {lastUpdated}
          </p>
        </div>

        <div className="prose prose-charcoal max-w-none space-y-8">
          {/* Introduction */}
          <section>
            <p className="text-charcoal-light leading-relaxed">
              BFFless, LLC ("BFFless," "we," "us," or "our") respects your privacy and is committed
              to protecting your personal information. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you use our platform, services, and
              website (collectively, the "Service"). By using the Service, you consent to the
              practices described in this Privacy Policy.
            </p>
          </section>

          {/* 1. Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-charcoal mb-4">
              1. Information We Collect
            </h2>

            <h3 className="text-lg font-medium text-charcoal mb-2">
              1.1 Information You Provide
            </h3>
            <p className="text-charcoal-light leading-relaxed mb-4">
              We collect information you voluntarily provide when using the Service, including:
            </p>
            <ul className="list-disc pl-6 text-charcoal-light space-y-2">
              <li>
                <strong>Account Information:</strong> Name, email address, and password when you
                create an account;
              </li>
              <li>
                <strong>Profile Information:</strong> Organization name, workspace details, and
                other profile data you choose to provide;
              </li>
              <li>
                <strong>Payment Information:</strong> Billing address and payment method details
                (processed securely by our third-party payment processor);
              </li>
              <li>
                <strong>Communications:</strong> Information you provide when contacting us for
                support, submitting feedback, or filling out forms;
              </li>
              <li>
                <strong>Content:</strong> Files, code, and other assets you upload and deploy
                through the Service.
              </li>
            </ul>

            <h3 className="text-lg font-medium text-charcoal mb-2 mt-6">
              1.2 Information from Third-Party Authentication
            </h3>
            <p className="text-charcoal-light leading-relaxed mb-4">
              When you sign in using a third-party authentication provider (such as Google), we
              receive certain information from that provider, which may include:
            </p>
            <ul className="list-disc pl-6 text-charcoal-light space-y-2">
              <li>Your name and email address;</li>
              <li>Your profile picture (if available);</li>
              <li>A unique identifier from the authentication provider.</li>
            </ul>
            <p className="text-charcoal-light leading-relaxed mt-4">
              We use this information solely for the purpose of authenticating your identity and
              creating or linking your BFFless account. We do not request or store your third-party
              account password.
            </p>

            <h3 className="text-lg font-medium text-charcoal mb-2 mt-6">
              1.3 Information Collected Automatically
            </h3>
            <p className="text-charcoal-light leading-relaxed mb-4">
              When you access the Service, we may automatically collect:
            </p>
            <ul className="list-disc pl-6 text-charcoal-light space-y-2">
              <li>
                <strong>Log Data:</strong> IP address, browser type, operating system, referring
                URLs, pages visited, and timestamps;
              </li>
              <li>
                <strong>Device Information:</strong> Device type, screen resolution, and unique
                device identifiers;
              </li>
              <li>
                <strong>Usage Data:</strong> Features used, actions taken, deployment activity, and
                performance metrics;
              </li>
              <li>
                <strong>Cookies and Similar Technologies:</strong> We use cookies, local storage,
                and similar technologies to maintain sessions, remember preferences, and analyze
                usage patterns.
              </li>
            </ul>
          </section>

          {/* 2. How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-semibold text-charcoal mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-charcoal-light leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-charcoal-light space-y-2">
              <li>Provide, maintain, and improve the Service;</li>
              <li>Authenticate your identity and manage your account;</li>
              <li>Process payments and manage billing;</li>
              <li>Respond to your requests, questions, and support inquiries;</li>
              <li>Send you service-related notices and updates;</li>
              <li>
                Monitor and analyze usage trends to improve user experience and Service performance;
              </li>
              <li>Detect, prevent, and address technical issues, fraud, and security threats;</li>
              <li>Comply with legal obligations and enforce our Terms of Service.</li>
            </ul>
          </section>

          {/* 3. How We Share Your Information */}
          <section>
            <h2 className="text-2xl font-semibold text-charcoal mb-4">
              3. How We Share Your Information
            </h2>
            <p className="text-charcoal-light leading-relaxed mb-4">
              We do not sell your personal information. We may share your information in the
              following circumstances:
            </p>
            <ul className="list-disc pl-6 text-charcoal-light space-y-2">
              <li>
                <strong>Service Providers:</strong> With trusted third-party vendors who assist us
                in operating the Service (e.g., hosting, payment processing, analytics, email
                delivery). These providers are contractually obligated to protect your information;
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law, regulation, legal
                process, or governmental request;
              </li>
              <li>
                <strong>Protection of Rights:</strong> To enforce our Terms of Service, protect our
                rights, privacy, safety, or property, and that of our users or the public;
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with a merger, acquisition, or
                sale of all or a portion of our assets, in which case your information may be
                transferred as part of the transaction;
              </li>
              <li>
                <strong>With Your Consent:</strong> When you have given us explicit consent to share
                your information for a specific purpose.
              </li>
            </ul>
          </section>

          {/* 4. Third-Party Services */}
          <section>
            <h2 className="text-2xl font-semibold text-charcoal mb-4">
              4. Third-Party Services and Analytics
            </h2>
            <p className="text-charcoal-light leading-relaxed mb-4">
              We use the following third-party services that may collect information about you:
            </p>
            <ul className="list-disc pl-6 text-charcoal-light space-y-2">
              <li>
                <strong>Google Analytics:</strong> For website traffic analysis and usage metrics.
                See{' '}
                <a
                  href="https://policies.google.com/privacy"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google's Privacy Policy
                </a>
                ;
              </li>
              <li>
                <strong>Stripe:</strong> For secure payment processing. See{' '}
                <a
                  href="https://stripe.com/privacy"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Stripe's Privacy Policy
                </a>
                ;
              </li>
              <li>
                <strong>Authentication Providers:</strong> Such as Google, for account sign-in. When
                you authenticate via a third party, their privacy policy governs the data they
                collect.
              </li>
            </ul>
          </section>

          {/* 5. Data Retention */}
          <section>
            <h2 className="text-2xl font-semibold text-charcoal mb-4">5. Data Retention</h2>
            <p className="text-charcoal-light leading-relaxed mb-4">
              We retain your personal information for as long as your account is active or as needed
              to provide you with the Service. We may also retain information as necessary to:
            </p>
            <ul className="list-disc pl-6 text-charcoal-light space-y-2">
              <li>Comply with legal obligations;</li>
              <li>Resolve disputes;</li>
              <li>Enforce our agreements;</li>
              <li>Maintain security and prevent fraud.</li>
            </ul>
            <p className="text-charcoal-light leading-relaxed mt-4">
              When you delete your account, we will delete or anonymize your personal information
              within a reasonable timeframe, except where retention is required by law.
            </p>
          </section>

          {/* 6. Data Security */}
          <section>
            <h2 className="text-2xl font-semibold text-charcoal mb-4">6. Data Security</h2>
            <p className="text-charcoal-light leading-relaxed">
              We implement industry-standard technical and organizational measures to protect your
              personal information against unauthorized access, alteration, disclosure, or
              destruction. These measures include encryption in transit (TLS/SSL), secure
              authentication mechanisms, and regular security assessments. However, no method of
              transmission over the Internet or electronic storage is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </section>

          {/* 7. Your Rights and Choices */}
          <section>
            <h2 className="text-2xl font-semibold text-charcoal mb-4">
              7. Your Rights and Choices
            </h2>
            <p className="text-charcoal-light leading-relaxed mb-4">
              Depending on your location, you may have the following rights regarding your personal
              information:
            </p>
            <ul className="list-disc pl-6 text-charcoal-light space-y-2">
              <li>
                <strong>Access:</strong> Request a copy of the personal information we hold about
                you;
              </li>
              <li>
                <strong>Correction:</strong> Request correction of inaccurate or incomplete
                information;
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your personal information, subject to
                legal retention requirements;
              </li>
              <li>
                <strong>Portability:</strong> Request a portable copy of your data in a
                commonly-used format;
              </li>
              <li>
                <strong>Objection:</strong> Object to certain processing of your personal
                information;
              </li>
              <li>
                <strong>Withdraw Consent:</strong> Where processing is based on consent, you may
                withdraw consent at any time.
              </li>
            </ul>
            <p className="text-charcoal-light leading-relaxed mt-4">
              To exercise any of these rights, please contact us using the form below. We will
              respond to your request within 30 days.
            </p>
          </section>

          {/* 8. Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-charcoal mb-4">
              8. Cookies and Tracking Technologies
            </h2>
            <p className="text-charcoal-light leading-relaxed mb-4">We use cookies to:</p>
            <ul className="list-disc pl-6 text-charcoal-light space-y-2">
              <li>Maintain your authenticated session;</li>
              <li>Remember your preferences and settings;</li>
              <li>Analyze site traffic and usage patterns;</li>
              <li>Improve the performance and functionality of the Service.</li>
            </ul>
            <p className="text-charcoal-light leading-relaxed mt-4">
              You can control cookies through your browser settings. Disabling cookies may affect
              some functionality of the Service.
            </p>
          </section>

          {/* 9. Children's Privacy */}
          <section>
            <h2 className="text-2xl font-semibold text-charcoal mb-4">9. Children's Privacy</h2>
            <p className="text-charcoal-light leading-relaxed">
              The Service is not intended for children under the age of 13 (or the applicable age in
              your jurisdiction). We do not knowingly collect personal information from children. If
              we learn that we have collected personal information from a child, we will promptly
              delete it. If you believe a child has provided us with personal information, please
              contact us.
            </p>
          </section>

          {/* 10. International Data Transfers */}
          <section>
            <h2 className="text-2xl font-semibold text-charcoal mb-4">
              10. International Data Transfers
            </h2>
            <p className="text-charcoal-light leading-relaxed">
              Your information may be transferred to and processed in the United States or other
              countries where our service providers operate. These countries may have data protection
              laws that differ from those in your jurisdiction. By using the Service, you consent to
              the transfer of your information to the United States and other countries as described
              in this Privacy Policy.
            </p>
          </section>

          {/* 11. Changes to This Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-charcoal mb-4">
              11. Changes to This Privacy Policy
            </h2>
            <p className="text-charcoal-light leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of material
              changes by posting the updated policy on this page and updating the "Last Updated"
              date. Your continued use of the Service after changes become effective constitutes
              acceptance of the revised Privacy Policy.
            </p>
          </section>

          {/* 12. Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-charcoal mb-4">12. Contact Us</h2>
            <p className="text-charcoal-light leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or wish to exercise your data
              rights, please contact us:
            </p>
            <ContactForm
              source="privacy-policy"
              endpoint="/api/tos-form"
              title="BFFless, LLC"
              subtitle="Send us a message and we'll respond as soon as possible."
            />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-cream-dark py-8 text-center">
        <p className="text-charcoal-muted text-sm">
          &copy; {new Date().getFullYear()} BFFless. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
