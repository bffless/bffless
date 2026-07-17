import { useState, useEffect, useRef } from 'react';
import { trackConversion } from '../hooks/useAnalytics';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FeedbackCategory = 'feedback' | 'question' | 'bug' | 'feature';

interface FormData {
  name: string;
  email: string;
  category: FeedbackCategory;
  message: string;
  website: string; // honeypot field
}

const categoryLabels: Record<FeedbackCategory, { label: string; placeholder: string }> = {
  feedback: { label: 'General Feedback', placeholder: 'Share your thoughts about BFFless...' },
  question: { label: 'Question', placeholder: 'What would you like to know?' },
  bug: { label: 'Bug Report', placeholder: 'Describe the issue you encountered...' },
  feature: { label: 'Feature Request', placeholder: 'What feature would you like to see?' },
};

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    category: 'feedback',
    message: '',
    website: '', // honeypot - should remain empty
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      trackConversion('feedback_form_opened', { category: formData.category });
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, formData.category]);

  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal closes
      setTimeout(() => {
        setFormData({ name: '', email: '', category: 'feedback', message: '', website: '' });
        setIsSubmitted(false);
        setError(null);
      }, 300);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/feedback-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'landing-page',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      trackConversion('feedback_form_submitted', {
        category: formData.category,
        hasName: !!formData.name,
      });

      setIsSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again or email us at hello@bffless.app');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-charcoal to-charcoal-light">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Send Feedback</h2>
              <p className="text-sm text-white/80 mt-1">
                We'd love to hear from you
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Thank you!</h3>
              <p className="text-gray-600 mb-6">
                Your feedback has been received. We appreciate you taking the time to share your thoughts.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-charcoal text-white rounded-lg font-medium hover:bg-charcoal-light transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field - hidden from users, bots will fill it */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="feedback-website">Website</label>
                  <input
                    type="text"
                    id="feedback-website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>

                {/* Category selector */}
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">
                    What would you like to share?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(Object.keys(categoryLabels) as FeedbackCategory[]).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: cat })}
                        className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                          formData.category === cat
                            ? 'border-charcoal bg-charcoal text-white'
                            : 'border-charcoal-muted/30 text-charcoal hover:border-charcoal hover:bg-cream-dark'
                        }`}
                      >
                        {categoryLabels[cat].label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="feedback-name" className="block text-sm font-medium text-charcoal mb-1">
                    Name <span className="text-charcoal-muted">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="feedback-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-charcoal-muted/30 rounded-lg bg-white focus:ring-2 focus:ring-charcoal focus:border-charcoal outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="feedback-email" className="block text-sm font-medium text-charcoal mb-1">
                    Email <span className="text-charcoal-muted">(optional)</span>
                  </label>
                  <input
                    type="email"
                    id="feedback-email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-charcoal-muted/30 rounded-lg bg-white focus:ring-2 focus:ring-charcoal focus:border-charcoal outline-none transition-all"
                    placeholder="you@example.com"
                  />
                  <p className="text-xs text-charcoal-muted mt-1">
                    Include if you'd like a response
                  </p>
                </div>

                <div>
                  <label htmlFor="feedback-message" className="block text-sm font-medium text-charcoal mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="feedback-message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 border border-charcoal-muted/30 rounded-lg bg-white focus:ring-2 focus:ring-charcoal focus:border-charcoal outline-none transition-all resize-none"
                    placeholder={categoryLabels[formData.category].placeholder}
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
                    'Send Feedback'
                  )}
                </button>

                <p className="text-center text-sm text-charcoal-muted mt-4">
                  Or chat with us on{' '}
                  <a
                    href="https://bffless.app/discord"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-charcoal hover:underline font-medium"
                    onClick={() => trackConversion('discord_clicked', { source: 'feedback_modal' })}
                  >
                    Discord
                  </a>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
