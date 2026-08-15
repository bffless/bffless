import { useState, useEffect } from 'react';
import { trackConversion } from '../hooks/useAnalytics';

interface ConsultingModalProps {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
}

type ProjectType = 'setup' | 'migrate' | 'managed' | 'unsure';

interface FormData {
  name: string;
  email: string;
  projectType: ProjectType;
  message: string;
  website: string; // honeypot field
}

const projectTypes: Record<ProjectType, { label: string; placeholder: string }> = {
  setup: {
    label: 'Set it up for me',
    placeholder: "What are you trying to put online? A website, a shop, files for clients, something else?",
  },
  migrate: {
    label: 'Move my existing site',
    placeholder: 'Where does your site live now, and what would you like to change about it?',
  },
  managed: {
    label: 'Run it for me',
    placeholder: "What do you need looking after — updates, backups, someone to call when it breaks?",
  },
  unsure: {
    label: "I'm not sure yet",
    placeholder: "Describe what you want to end up with and I'll tell you if I can help.",
  },
};

const emptyForm: FormData = {
  name: '',
  email: '',
  projectType: 'setup',
  message: '',
  website: '',
};

export default function ConsultingModal({ isOpen, onClose, source = 'landing-page' }: ConsultingModalProps) {
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      trackConversion('consulting_form_opened', { source });
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, source]);

  useEffect(() => {
    if (!isOpen) {
      // Reset the form once the modal has finished closing.
      const timer = setTimeout(() => {
        setFormData(emptyForm);
        setIsSubmitted(false);
        setError(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/consulting-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          project_type: formData.projectType,
          message: formData.message,
          website: formData.website,
          source,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      trackConversion('consulting_form_submitted', { source, projectType: formData.projectType });

      setIsSubmitted(true);
    } catch {
      setError('Something went wrong sending that. Please try again in a moment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const inputClass =
    'w-full px-4 py-2.5 border border-paper-line rounded-sm bg-paper text-ink placeholder:text-ink-faint focus:ring-1 focus:ring-ink focus:border-ink outline-none transition-all';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consulting-modal-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-md my-8 bg-paper border border-ink shadow-2xl animate-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-paper-line">
          <div>
            <p className="meta-label mb-2">Done for you</p>
            <h2 id="consulting-modal-title" className="font-serif text-2xl leading-tight text-ink">
              <span className="font-sans font-bold">Tell me what you need.</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 -mr-2 -mt-2 rounded-full text-ink-soft hover:bg-paper-deep hover:text-ink transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 mx-auto mb-5 rounded-full border border-terracotta flex items-center justify-center">
                <svg className="w-7 h-7 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-ink mb-2">
                <span className="font-sans font-bold">Got it — thank you.</span>
              </h3>
              <p className="text-ink-soft leading-relaxed mb-6">
                Your message is with me. I read every one of these myself and I'll come back to you by email,
                usually within a couple of days.
              </p>
              <button onClick={onClose} className="pill-ghost">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot field - hidden from users, bots will fill it */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="consulting-website">Website</label>
                <input
                  type="text"
                  id="consulting-website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>

              <div>
                <span className="block text-sm font-medium text-ink mb-2">What do you need?</span>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(projectTypes) as ProjectType[]).map((type) => (
                    <button
                      key={type}
                      type="button"
                      aria-pressed={formData.projectType === type}
                      onClick={() => setFormData({ ...formData, projectType: type })}
                      className={`px-3 py-2 text-sm rounded-sm border transition-all ${
                        formData.projectType === type
                          ? 'border-ink bg-ink text-paper'
                          : 'border-paper-line text-ink hover:border-ink hover:bg-paper-deep'
                      }`}
                    >
                      {projectTypes[type].label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="consulting-name" className="block text-sm font-medium text-ink mb-1">
                  Your name <span className="text-terracotta">*</span>
                </label>
                <input
                  type="text"
                  id="consulting-name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputClass}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="consulting-email" className="block text-sm font-medium text-ink mb-1">
                  Email <span className="text-terracotta">*</span>
                </label>
                <input
                  type="email"
                  id="consulting-email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClass}
                  placeholder="you@example.com"
                />
                <p className="text-xs text-ink-label mt-1">This is where I'll reply.</p>
              </div>

              <div>
                <label htmlFor="consulting-message" className="block text-sm font-medium text-ink mb-1">
                  What are you trying to do? <span className="text-terracotta">*</span>
                </label>
                <textarea
                  id="consulting-message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`${inputClass} resize-none`}
                  placeholder={projectTypes[formData.projectType].placeholder}
                />
              </div>

              {error && (
                <div className="p-3 border border-terracotta/40 bg-terracotta/10 rounded-sm text-sm text-terracotta-ink">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`pill-cta w-full justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send message'
                )}
              </button>

              <p className="text-center text-[13px] text-ink-soft">
                No obligation, no sales pitch — just tell me what you're after.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
