import { useState } from 'react';
import { trackConversion } from '../hooks/useAnalytics';

interface ContactFormProps {
  source: string;
  endpoint?: string;
  title?: string;
  subtitle?: string;
}

interface FormData {
  name: string;
  email: string;
  message: string;
  website: string; // honeypot field
}

export default function ContactForm({ source, endpoint = '/api/contact-form', title, subtitle }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    website: '', // honeypot - should remain empty
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      trackConversion('contact_form_submitted', { source });

      setIsSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-cream-dark rounded-xl p-6 text-center">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-charcoal mb-2">Message Sent</h3>
        <p className="text-charcoal-light">
          Thank you for reaching out. We'll get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-cream-dark rounded-xl p-6 relative">
      {title && <h3 className="text-lg font-medium text-charcoal mb-2">{title}</h3>}
      {subtitle && <p className="text-charcoal-light text-sm mb-4">{subtitle}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot field - hidden from users, bots will fill it */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-charcoal mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="contact-name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-charcoal-muted/30 rounded-lg bg-white focus:ring-2 focus:ring-charcoal focus:border-charcoal outline-none transition-all"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-charcoal mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="contact-email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border border-charcoal-muted/30 rounded-lg bg-white focus:ring-2 focus:ring-charcoal focus:border-charcoal outline-none transition-all"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="block text-sm font-medium text-charcoal mb-1">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="contact-message"
            rows={4}
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-2 border border-charcoal-muted/30 rounded-lg bg-white focus:ring-2 focus:ring-charcoal focus:border-charcoal outline-none transition-all resize-none"
            placeholder="How can we help?"
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded-lg font-semibold text-white bg-charcoal transition-all ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-charcoal-light hover:shadow-lg'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Sending...
            </span>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </div>
  );
}
