import ContactForm from '../components/ContactForm';

export default function TermsOfService() {
  const effectiveDate = 'February 20, 2026';
  const lastUpdated = 'February 20, 2026';

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
          <h1 className="text-4xl font-bold text-charcoal mb-4">Terms of Service</h1>
          <p className="text-charcoal-muted">
            Effective Date: {effectiveDate} | Last Updated: {lastUpdated}
          </p>
        </div>

        <div className="prose prose-charcoal max-w-none space-y-8">
          {/* Introduction */}
          <section>
            <p className="text-charcoal-light leading-relaxed">
              Welcome to BFFless. These Terms of Service ("Terms") govern your access to and use of
              the BFFless platform, services, and website (collectively, the "Service") operated by
              BFFless, LLC ("BFFless," "we," "us," or "our"). By accessing or using the Service, you
              agree to be bound by these Terms. If you do not agree to these Terms, do not use the
              Service.
            </p>
          </section>

          {/* 1. Acceptance of Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-charcoal mb-4">1. Acceptance of Terms</h2>
            <p className="text-charcoal-light leading-relaxed mb-4">
              By creating an account, accessing, or using the Service, you represent that:
            </p>
            <ul className="list-disc pl-6 text-charcoal-light space-y-2">
              <li>You are at least 18 years of age or the age of majority in your jurisdiction;</li>
              <li>You have the legal capacity to enter into a binding agreement;</li>
              <li>
                If you are using the Service on behalf of an organization, you have the authority to
                bind that organization to these Terms.
              </li>
            </ul>
          </section>

          {/* 2. Description of Service */}
          <section>
            <h2 className="text-2xl font-semibold text-charcoal mb-4">2. Description of Service</h2>
            <p className="text-charcoal-light leading-relaxed mb-4">
              BFFless is a static asset hosting platform that enables users to deploy and serve
              static websites, single-page applications, and other frontend assets. The Service
              includes:
            </p>
            <ul className="list-disc pl-6 text-charcoal-light space-y-2">
              <li>Static file hosting and content delivery;</li>
              <li>Custom domain configuration;</li>
              <li>SSL/TLS certificate provisioning;</li>
              <li>Deployment management and versioning;</li>
              <li>Analytics and monitoring (where available);</li>
              <li>API access for programmatic deployments.</li>
            </ul>
          </section>

          {/* 3. Account Registration */}
          <section>
            <h2 className="text-2xl font-semibold text-charcoal mb-4">3. Account Registration</h2>
            <p className="text-charcoal-light leading-relaxed mb-4">
              To use certain features of the Service, you must create an account. When creating an
              account, you agree to:
            </p>
            <ul className="list-disc pl-6 text-charcoal-light space-y-2">
              <li>Provide accurate, current, and complete information;</li>
              <li>Maintain and promptly update your account information;</li>
              <li>Keep your password secure and confidential;</li>
              <li>
                Accept responsibility for all activities that occur under your account;
              </li>
              <li>
                Notify us immediately of any unauthorized use of your account.
              </li>
            </ul>
            <p className="text-charcoal-light leading-relaxed mt-4">
              We reserve the right to suspend or terminate accounts that violate these Terms or for
              any other reason at our sole discretion.
            </p>
          </section>

          {/* 4. Acceptable Use */}
          <section>
            <h2 className="text-2xl font-semibold text-charcoal mb-4">4. Acceptable Use Policy</h2>
            <p className="text-charcoal-light leading-relaxed mb-4">
              You agree not to use the Service to host, distribute, or transmit any content that:
            </p>
            <ul className="list-disc pl-6 text-charcoal-light space-y-2">
              <li>
                Is illegal, harmful, threatening, abusive, harassing, defamatory, or otherwise
                objectionable;
              </li>
              <li>Infringes on intellectual property rights of others;</li>
              <li>Contains malware, viruses, or other malicious code;</li>
              <li>Is used for phishing, scamming, or fraudulent purposes;</li>
              <li>Distributes spam or unsolicited communications;</li>
              <li>Violates the privacy rights of others;</li>
              <li>
                Promotes illegal activities or violates applicable laws and regulations;
              </li>
              <li>
                Interferes with or disrupts the Service or servers connected to the Service.
              </li>
            </ul>
            <p className="text-charcoal-light leading-relaxed mt-4">
              We reserve the right to remove any content that violates this policy and to suspend or
              terminate accounts engaged in prohibited activities.
            </p>
          </section>

          {/* 5. Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold text-charcoal mb-4">5. Intellectual Property</h2>
            <h3 className="text-lg font-medium text-charcoal mb-2">Your Content</h3>
            <p className="text-charcoal-light leading-relaxed mb-4">
              You retain all ownership rights to the content you upload, deploy, or otherwise make
              available through the Service ("Your Content"). By using the Service, you grant
              BFFless a limited, non-exclusive, royalty-free license to host, store, and serve Your
              Content solely for the purpose of providing the Service to you.
            </p>
            <h3 className="text-lg font-medium text-charcoal mb-2">Our Service</h3>
            <p className="text-charcoal-light leading-relaxed">
              The Service, including its design, features, and underlying technology, is owned by
              BFFless and protected by intellectual property laws. You may not copy, modify,
              distribute, sell, or lease any part of the Service without our prior written consent.
            </p>
          </section>

          {/* 6. Service Level */}
          <section>
            <h2 className="text-2xl font-semibold text-charcoal mb-4">6. Service Availability</h2>
            <p className="text-charcoal-light leading-relaxed mb-4">
              We strive to maintain high availability of the Service but do not guarantee
              uninterrupted access. The Service may be temporarily unavailable due to:
            </p>
            <ul className="list-disc pl-6 text-charcoal-light space-y-2">
              <li>Scheduled maintenance (with reasonable advance notice when possible);</li>
              <li>Emergency maintenance or security updates;</li>
              <li>Factors beyond our control, including third-party service outages;</li>
              <li>Force majeure events.</li>
            </ul>
          </section>

          {/* 7. Data and Privacy */}
          <section>
            <h2 className="text-2xl font-semibold text-charcoal mb-4">7. Data and Privacy</h2>
            <p className="text-charcoal-light leading-relaxed mb-4">
              Your privacy is important to us. Our collection and use of personal information is
              governed by our Privacy Policy. By using the Service, you consent to our data
              practices as described in the Privacy Policy.
            </p>
            <p className="text-charcoal-light leading-relaxed">
              You are responsible for ensuring that your use of the Service complies with applicable
              data protection laws, including obtaining necessary consents from your users when
              collecting personal information through content hosted on BFFless.
            </p>
          </section>

          {/* 8. Third-Party Services */}
          <section>
            <h2 className="text-2xl font-semibold text-charcoal mb-4">8. Third-Party Services</h2>
            <p className="text-charcoal-light leading-relaxed">
              The Service may integrate with or link to third-party services. We are not responsible
              for the content, privacy policies, or practices of third-party services. Your use of
              third-party services is at your own risk and subject to their respective terms and
              conditions.
            </p>
          </section>

          {/* 9. Disclaimer of Warranties */}
          <section>
            <h2 className="text-2xl font-semibold text-charcoal mb-4">9. Disclaimer of Warranties</h2>
            <p className="text-charcoal-light leading-relaxed mb-4 uppercase text-sm">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND,
              EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
            </p>
            <p className="text-charcoal-light leading-relaxed uppercase text-sm">
              WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE
              OF VIRUSES OR OTHER HARMFUL COMPONENTS.
            </p>
          </section>

          {/* 10. Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-charcoal mb-4">10. Limitation of Liability</h2>
            <p className="text-charcoal-light leading-relaxed mb-4 uppercase text-sm">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, BFFLESS AND ITS OFFICERS, DIRECTORS,
              EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
              CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS,
              DATA, USE, OR GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE.
            </p>
            <p className="text-charcoal-light leading-relaxed uppercase text-sm">
              IN NO EVENT SHALL OUR TOTAL LIABILITY EXCEED THE AMOUNTS PAID BY YOU TO BFFLESS IN THE
              TWELVE (12) MONTHS PRECEDING THE CLAIM, OR ONE HUNDRED DOLLARS ($100), WHICHEVER IS
              GREATER.
            </p>
          </section>

          {/* 11. Indemnification */}
          <section>
            <h2 className="text-2xl font-semibold text-charcoal mb-4">11. Indemnification</h2>
            <p className="text-charcoal-light leading-relaxed">
              You agree to indemnify, defend, and hold harmless BFFless and its officers, directors,
              employees, and agents from and against any claims, liabilities, damages, losses, and
              expenses (including reasonable attorneys' fees) arising out of or related to: (a) your
              use of the Service; (b) Your Content; (c) your violation of these Terms; or (d) your
              violation of any rights of a third party.
            </p>
          </section>

          {/* 12. Termination */}
          <section>
            <h2 className="text-2xl font-semibold text-charcoal mb-4">12. Termination</h2>
            <p className="text-charcoal-light leading-relaxed mb-4">
              You may terminate your account at any time by contacting us or through your account
              settings. We may suspend or terminate your access to the Service at any time, with or
              without cause, with or without notice.
            </p>
            <p className="text-charcoal-light leading-relaxed">
              Upon termination: (a) your right to use the Service will immediately cease; (b) we may
              delete Your Content after a reasonable retention period; (c) any provisions of these
              Terms that by their nature should survive termination shall survive.
            </p>
          </section>

          {/* 13. DMCA */}
          <section>
            <h2 className="text-2xl font-semibold text-charcoal mb-4">
              13. Copyright Infringement (DMCA)
            </h2>
            <p className="text-charcoal-light leading-relaxed mb-4">
              We respect the intellectual property rights of others. If you believe that content
              hosted on our Service infringes your copyright, please submit a DMCA takedown notice
              using the contact form at the bottom of this page.
            </p>
            <p className="text-charcoal-light leading-relaxed">
              Your notice must include: (a) identification of the copyrighted work; (b) identification
              of the infringing material and its location; (c) your contact information; (d) a
              statement of good faith belief; (e) a statement of accuracy under penalty of perjury;
              and (f) your physical or electronic signature.
            </p>
          </section>

          {/* 14. Changes to Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-charcoal mb-4">14. Changes to Terms</h2>
            <p className="text-charcoal-light leading-relaxed">
              We may modify these Terms at any time. We will notify you of material changes by
              posting the updated Terms on this page and updating the "Last Updated" date. Your
              continued use of the Service after changes become effective constitutes acceptance of
              the revised Terms.
            </p>
          </section>

          {/* 15. Governing Law */}
          <section>
            <h2 className="text-2xl font-semibold text-charcoal mb-4">15. Governing Law</h2>
            <p className="text-charcoal-light leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the
              State of Georgia, United States, without regard to its conflict of law provisions.
              Any disputes arising under these Terms shall be resolved in the state or federal
              courts located in Georgia, and you consent to the personal jurisdiction of such
              courts.
            </p>
          </section>

          {/* 16. General Provisions */}
          <section>
            <h2 className="text-2xl font-semibold text-charcoal mb-4">16. General Provisions</h2>
            <ul className="list-disc pl-6 text-charcoal-light space-y-2">
              <li>
                <strong>Entire Agreement:</strong> These Terms constitute the entire agreement
                between you and BFFless regarding the Service.
              </li>
              <li>
                <strong>Severability:</strong> If any provision of these Terms is found
                unenforceable, the remaining provisions will continue in effect.
              </li>
              <li>
                <strong>Waiver:</strong> Our failure to enforce any right or provision shall not
                constitute a waiver of such right or provision.
              </li>
              <li>
                <strong>Assignment:</strong> You may not assign these Terms without our prior
                written consent. We may assign these Terms without restriction.
              </li>
              <li>
                <strong>No Agency:</strong> Nothing in these Terms creates any agency, partnership,
                or joint venture between you and BFFless.
              </li>
            </ul>
          </section>

          {/* 17. Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-charcoal mb-4">17. Contact Us</h2>
            <p className="text-charcoal-light leading-relaxed mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <ContactForm
              source="terms-of-service"
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
