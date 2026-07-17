import { useState, useEffect, useRef } from 'react';
import { trackConversion } from '../hooks/useAnalytics';

interface DeveloperReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  rating: number;
  name: string;
  email: string;
  github_handle: string;
  role: string;
  company: string;
  review: string;
  use_case: string;
  permission_to_display: boolean;
  website: string; // honeypot
}

const roles = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'DevOps / SRE',
  'Engineering Manager',
  'Founder / CTO',
  'Student',
  'Other',
];

const useCases = [
  'Personal project',
  'Side project / SaaS',
  'Agency / client work',
  'Internal tool',
  'Open source project',
  'Learning / experimenting',
  'Other',
];

const initialFormData: FormData = {
  rating: 0,
  name: '',
  email: '',
  github_handle: '',
  role: '',
  company: '',
  review: '',
  use_case: '',
  permission_to_display: false,
  website: '',
};

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="p-0.5 transition-transform hover:scale-110 focus:outline-none"
          aria-label={`Rate ${star} out of 5`}
        >
          <svg
            className={`w-8 h-8 transition-colors ${
              star <= (hover || value) ? 'text-amber-400' : 'text-charcoal-muted/30'
            }`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

export default function DeveloperReviewModal({ isOpen, onClose }: DeveloperReviewModalProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ratingError, setRatingError] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      trackConversion('developer_review_opened', {});
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setFormData(initialFormData);
        setIsSubmitted(false);
        setError(null);
        setRatingError(false);
      }, 300);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setRatingError(false);

    if (formData.rating === 0) {
      setRatingError(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/developer-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          visible: false,
          source: 'landing-page',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      trackConversion('developer_review_submitted', {
        rating: formData.rating,
        hasGithub: !!formData.github_handle,
        permissionToDisplay: formData.permission_to_display,
      });

      setIsSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again or reach out on Discord.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const update = (field: keyof FormData, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-amber-500 to-orange-500 shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Share Your Experience</h2>
              <p className="text-sm text-white/80 mt-1">
                Help other developers discover BFFless CE
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
        <div className="p-6 overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Thank you for your review!</h3>
              <p className="text-gray-600 mb-6">
                Your feedback means a lot to us and helps the community grow.
                {formData.permission_to_display && (
                  <span className="block mt-2 text-sm text-charcoal-muted">
                    We may feature your review on our site after approval.
                  </span>
                )}
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-charcoal text-white rounded-lg font-medium hover:bg-charcoal-light transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="review-website">Website</label>
                <input
                  type="text"
                  id="review-website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) => update('website', e.target.value)}
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Overall Rating <span className="text-red-500">*</span>
                </label>
                <StarRating value={formData.rating} onChange={(v) => { update('rating', v); setRatingError(false); }} />
                {ratingError && (
                  <p className="text-red-500 text-xs mt-1">Please select a rating</p>
                )}
              </div>

              {/* Review */}
              <div>
                <label htmlFor="review-text" className="block text-sm font-medium text-charcoal mb-1">
                  Your Review <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="review-text"
                  rows={3}
                  required
                  value={formData.review}
                  onChange={(e) => update('review', e.target.value)}
                  className="w-full px-4 py-2 border border-charcoal-muted/30 rounded-lg bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all resize-none"
                  placeholder="What do you like about BFFless CE? How has it helped your workflow?"
                />
              </div>

              {/* Name + GitHub - side by side */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="review-name" className="block text-sm font-medium text-charcoal mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="review-name"
                    value={formData.name}
                    onChange={(e) => update('name', e.target.value)}
                    className="w-full px-4 py-2 border border-charcoal-muted/30 rounded-lg bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="review-github" className="block text-sm font-medium text-charcoal mb-1">
                    GitHub Handle
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-muted text-sm">@</span>
                    <input
                      type="text"
                      id="review-github"
                      value={formData.github_handle}
                      onChange={(e) => update('github_handle', e.target.value.replace(/^@/, ''))}
                      className="w-full pl-8 pr-4 py-2 border border-charcoal-muted/30 rounded-lg bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                      placeholder="username"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="review-email" className="block text-sm font-medium text-charcoal mb-1">
                  Email <span className="text-charcoal-muted">(optional, not displayed)</span>
                </label>
                <input
                  type="email"
                  id="review-email"
                  value={formData.email}
                  onChange={(e) => update('email', e.target.value)}
                  className="w-full px-4 py-2 border border-charcoal-muted/30 rounded-lg bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                  placeholder="you@example.com"
                />
              </div>

              {/* Role + Company - side by side */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="review-role" className="block text-sm font-medium text-charcoal mb-1">
                    Role
                  </label>
                  <select
                    id="review-role"
                    value={formData.role}
                    onChange={(e) => update('role', e.target.value)}
                    className="w-full px-4 py-2 border border-charcoal-muted/30 rounded-lg bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                  >
                    <option value="">Select role...</option>
                    {roles.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="review-company" className="block text-sm font-medium text-charcoal mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    id="review-company"
                    value={formData.company}
                    onChange={(e) => update('company', e.target.value)}
                    className="w-full px-4 py-2 border border-charcoal-muted/30 rounded-lg bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                    placeholder="Company name"
                  />
                </div>
              </div>

              {/* Use Case */}
              <div>
                <label htmlFor="review-usecase" className="block text-sm font-medium text-charcoal mb-1">
                  How are you using BFFless CE?
                </label>
                <select
                  id="review-usecase"
                  value={formData.use_case}
                  onChange={(e) => update('use_case', e.target.value)}
                  className="w-full px-4 py-2 border border-charcoal-muted/30 rounded-lg bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                >
                  <option value="">Select use case...</option>
                  {useCases.map((uc) => (
                    <option key={uc} value={uc}>{uc}</option>
                  ))}
                </select>
              </div>

              {/* Permission checkbox */}
              <label className="flex items-start gap-3 p-3 rounded-lg bg-cream-dark/50 border border-cream-dark cursor-pointer hover:bg-cream-dark transition-colors">
                <input
                  type="checkbox"
                  checked={formData.permission_to_display}
                  onChange={(e) => update('permission_to_display', e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-charcoal-muted/30 text-amber-500 focus:ring-amber-500"
                />
                <span className="text-sm text-charcoal">
                  I give permission to display my review on the BFFless website.
                  <span className="block text-charcoal-muted text-xs mt-0.5">
                    Your name, role, company, and GitHub handle may be shown alongside your review.
                  </span>
                </span>
              </label>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
                  isSubmitting
                    ? 'bg-amber-400 opacity-70 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 hover:shadow-lg'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Review'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
