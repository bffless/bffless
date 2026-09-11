import { useState } from 'react';
import { hostTargets, deployYaml, LINKS } from '../../content/site';
import { revealDelay } from '../../hooks/useReveal';
import SectionHead from './SectionHead';

export default function HostSection() {
  const [showYaml, setShowYaml] = useState(false);

  return (
    <section id="host" className="scroll-mt-20">
      <div className="container-page py-16 md:py-20 grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-14">
        <SectionHead eyebrow="01 · Host" title="Where your AI-generated apps and internal tools live." />

        <div className="flex flex-col gap-7">
          <p className="text-[16px] leading-[1.55] text-ink-soft max-w-[560px] text-pretty" data-reveal>
            The HTML apps your AI agents generate, SPAs, docs, Storybooks, coverage reports — the static builds
            every team already produces, except they need to sit behind SSO or call your API. One platform, every
            static target.
          </p>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-paper-line border rule" data-reveal>
            {hostTargets.map((t, i) => (
              <li key={t.title} className="bg-paper p-5 md:p-6" data-reveal style={revealDelay(i * 50)}>
                <p className="font-semibold text-[15px] text-ink leading-snug">{t.title}</p>
                <p className="text-[13px] text-ink-mute mt-1.5 leading-[1.5]">{t.body}</p>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 text-[14px] text-ink-soft" data-reveal>
            <span className="font-mono text-[12px] bg-ink text-paper px-3 py-2 rounded">
              git push → CI → bffless upload → live URL
            </span>
            <span>Same flow as GitHub Pages.</span>
            <button
              type="button"
              onClick={() => setShowYaml((v) => !v)}
              aria-expanded={showYaml}
              aria-controls="deploy-yaml"
              className="text-coffee font-semibold hover:text-terracotta transition-colors"
            >
              {showYaml ? 'Hide the YAML' : '14 lines of YAML →'}
            </button>
          </div>

          {showYaml && (
            <div id="deploy-yaml" className="animate-slide-up">
              <div className="rounded-md bg-ink text-paper p-5 md:p-6 overflow-x-auto">
                <p className="font-mono text-[11px] text-coffee-soft tracking-[0.1em] mb-4">.github/workflows/deploy.yml</p>
                <pre className="font-mono text-[12.5px] leading-[1.7] whitespace-pre">{deployYaml}</pre>
              </div>
              <p className="mt-3 text-[13px] text-ink-mute">
                Every push uploads an immutable, SHA-keyed artifact and points the alias at it. Rollback is moving
                the pointer back.{' '}
                <a href={LINKS.quickstart} className="text-coffee font-semibold hover:text-terracotta">
                  Quickstart →
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
