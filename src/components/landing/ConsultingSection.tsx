// Done-for-you CTA: the path for people who don't want to touch a server.
// Deliberately paired with SelfHostCE — that section is "run it yourself",
// this one is "I'll run it for you", and they read as two halves of a choice.

import { revealDelay } from '../../hooks/useReveal';

interface ConsultingSectionProps {
  onEnquire: () => void;
}

const included = [
  'Install BFFless on a server — yours, or one I set up for you',
  'Point your domain at it; certificates and HTTPS handled',
  'Move your existing site or files across',
  'Wire up the parts you need: forms, uploads, logins, AI chat',
  'Hand it over with a walkthrough — or keep running it for you',
];

export default function ConsultingSection({ onEnquire }: ConsultingSectionProps) {
  return (
    <section id="setup">
      <div className="container-page pb-20 md:pb-28">
        <div className="relative border border-ink p-10 md:p-16 bg-paper-deep">
          <span className="absolute -top-3 left-8 bg-paper px-3 meta-label">N°-11 · Done for you</span>
          <span className="absolute -top-3 right-8 bg-paper px-3 meta-label">Talk to a human</span>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <div data-reveal>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-mono text-[11px] tracking-widest text-terracotta">02 · Setup</span>
                <span className="h-px flex-1 bg-paper-line" />
                <span className="meta-label">I do it · you don't</span>
              </div>
              <h2 className="font-serif text-4xl md:text-[52px] leading-[1.0] tracking-[-0.015em] text-ink">
                <span className="font-sans font-bold">Or don't touch a server at all.</span>{' '}
                <em className="not-italic italic font-medium">I'll set it up for you.</em>
              </h2>
              <p className="mt-6 text-ink-soft leading-relaxed max-w-md">
                Everything above is free and yours to run. But if none of it sounds like something you want to
                spend a weekend on, you don't have to. I built BFFless — I'll install it, put your site on it,
                and get your domain working, so you end up with a thing that just runs. No servers to learn, no
                command line, no jargon.
              </p>
              <p className="mt-4 text-ink-soft leading-relaxed max-w-md">
                Tell me what you're trying to put online and I'll tell you honestly whether I can help and what
                it would take.
              </p>
            </div>

            <div className="md:border-l md:border-paper-line md:pl-12 md:pt-10" data-reveal style={revealDelay(120)}>
              <p className="meta-label mb-4">What that usually means</p>
              <ul className="space-y-3 text-[14px] text-ink leading-relaxed">
                {included.map((item) => (
                  <li key={item} className="flex items-baseline gap-3">
                    <span className="text-terracotta flex-shrink-0">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button type="button" onClick={onEnquire} className="pill-cta">
                  Get in touch
                </button>
              </div>
              <p className="mt-4 text-[13px] text-ink-soft">
                Prefer email?{' '}
                <a
                  href="mailto:james.charlesworth@bffless.com?subject=Setting%20up%20BFFless"
                  className="text-ink underline underline-offset-2 hover:text-terracotta transition-colors"
                >
                  james.charlesworth@bffless.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
