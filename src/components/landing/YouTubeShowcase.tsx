import { useEffect, useState } from 'react';
import { trackConversion } from '../../hooks/useAnalytics';
import { revealDelay } from '../../hooks/useReveal';

type Video = {
  id: string;
  ep: string;
  title: string;
  publishedAt: string | null;
};

const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const thumbHi = (id: string) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

export default function YouTubeShowcase() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch('/api/episodes');
        if (!res.ok) {
          if (!cancelled) {
            setVideos([]);
            setLoading(false);
          }
          return;
        }
        const data = (await res.json()) as Video[];
        if (!cancelled) {
          setVideos(data);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setVideos([]);
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const active = videos[activeIndex];

  const select = (i: number) => {
    setActiveIndex(i);
    setPlaying(false);
    trackConversion('video_selected', { ep: videos[i].ep, id: videos[i].id });
  };

  const play = () => {
    if (!active) return;
    setPlaying(true);
    trackConversion('video_played', { ep: active.ep, id: active.id });
  };

  // The headline, standfirst, and CTAs are static — they must never wait on the
  // episodes fetch. Gating the whole section behind `loading` put the LCP heading
  // behind a YouTube-backed API call, and (because useReveal snapshots
  // `[data-reveal]` once on mount) any element that appeared afterwards was never
  // observed and stayed at opacity 0 forever. Only the figure below is async.
  return (
    <section className="border-b rule">
      <div className="container-page py-16 md:py-24">
        <div className="flex items-center justify-between mb-10 md:mb-14" data-reveal>
          <span className="meta-label">
            N°-01 · Watch{videos.length > 0 ? ` · ${videos.length} episodes` : ''}
          </span>
          <span className="hidden md:inline-flex items-center gap-2 meta-label">
            <span className="h-1.5 w-1.5 rounded-full bg-terracotta" aria-hidden="true" />
            Atlanta · GA · Source-available
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 md:gap-10 items-end mb-10 md:mb-12">
          <div className="lg:col-span-8">
            <h1
              className="font-serif text-[44px] md:text-[64px] lg:text-[76px] leading-[0.96] tracking-[-0.025em] text-ink text-balance"
              data-reveal
              style={revealDelay(80)}
            >
              <span className="font-sans font-bold">GitHub Pages</span>
              <span className="text-terracotta">.</span>{' '}
              <em className="not-italic font-serif italic font-medium">With auth, a proxy,</em>{' '}
              <span className="font-sans font-bold">and a BFF.</span>
            </h1>
            <div
              className="mt-6 h-[3px] w-16 origin-left bg-terracotta"
              data-reveal-rule
              style={revealDelay(320)}
              aria-hidden="true"
            />
            <p
              className="mt-6 text-[16px] md:text-[17px] leading-relaxed text-ink-soft max-w-2xl text-pretty"
              data-reveal
              style={revealDelay(180)}
            >
              The home for your AI-generated apps, internal tools, and HTML docs. Drop in any static build — hand-written or agent-made — and get forms, auth, and a reverse proxy without writing a backend. Watch how it works.
            </p>
          </div>
          <div
            className="lg:col-span-4 flex flex-wrap items-center gap-3 lg:justify-end"
            data-reveal
            style={revealDelay(260)}
          >
            <a
              href="https://docs.bffless.app/getting-started/quickstart/"
              onClick={() => trackConversion('get_started_clicked', { source: 'hero' })}
              className="pill-cta"
            >
              Quickstart
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="https://github.com/bffless/ce"
              onClick={() => trackConversion('github_clicked', { source: 'hero' })}
              className="pill-ghost"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                />
              </svg>
              GitHub
            </a>
          </div>
        </div>

        <div className="relative" data-reveal style={revealDelay(360)}>
          <div className="absolute -top-6 left-0 right-0 flex items-center justify-between pointer-events-none">
            <span className="meta-label">Fig. 01 · Episodes</span>
            <span className="meta-label">YouTube · @bffless</span>
          </div>

          <div className="relative corner-marks p-4 md:p-6 border border-ink/10 bg-paper-deep/40">
            {loading && (
              <div className="h-[560px] bg-ink/5 animate-pulse" aria-hidden="true" />
            )}

            {/* Episodes unavailable (cold cache + a YouTube outage). Keep the figure's
                frame rather than collapsing the hero, and point at the channel so the
                section still does its job. Accepted risk, documented in the spec. */}
            {!loading && !active && (
              <div className="h-[560px] flex flex-col items-center justify-center gap-4 text-center">
                <p className="meta-label">Episodes unavailable</p>
                <a
                  href="https://www.youtube.com/@bffless"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-ghost"
                >
                  Watch on YouTube
                </a>
              </div>
            )}

            {!loading && active && (
            <div className="grid lg:grid-cols-12 gap-4 md:gap-6">
              <ol className="order-2 lg:order-1 lg:col-span-4 lg:max-h-[560px] lg:overflow-y-auto pr-1 -mr-1 space-y-2" aria-label="Video episodes">
                {videos.map((v, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <li key={v.id}>
                      <button
                        type="button"
                        onClick={() => select(i)}
                        className={[
                          'group w-full flex items-center gap-3 text-left p-2 transition-colors',
                          'border',
                          isActive
                            ? 'border-ink bg-paper'
                            : 'border-transparent hover:border-ink/30 hover:bg-paper/70',
                        ].join(' ')}
                        aria-current={isActive ? 'true' : undefined}
                      >
                        <span className="relative flex-shrink-0 w-[88px] aspect-video overflow-hidden bg-ink/10">
                          <img
                            src={thumb(v.id)}
                            alt=""
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          {isActive && (
                            <span className="absolute inset-0 ring-2 ring-terracotta ring-inset" aria-hidden="true" />
                          )}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block meta-label mb-1">
                            EP {v.ep}{isActive ? ' · Now playing' : ''}
                          </span>
                          <span
                            className={[
                              'block font-serif text-[15px] md:text-[16px] leading-[1.2] tracking-[-0.005em]',
                              isActive ? 'text-ink' : 'text-ink-soft group-hover:text-ink',
                            ].join(' ')}
                          >
                            {v.title}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>

              <div className="order-1 lg:order-2 lg:col-span-8">
                <div className="relative w-full aspect-video bg-ink overflow-hidden border border-ink">
                  {playing ? (
                    <iframe
                      key={active.id}
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1&rel=0&modestbranding=1`}
                      title={active.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={play}
                      className="absolute inset-0 w-full h-full group"
                      aria-label={`Play ${active.title}`}
                    >
                      <img
                        src={thumbHi(active.id)}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = thumb(active.id);
                        }}
                        alt={active.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <span className="absolute inset-0 bg-ink/20 group-hover:bg-ink/10 transition-colors" aria-hidden="true" />
                      <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                        <span className="flex items-center justify-center w-20 h-20 rounded-full bg-terracotta text-paper group-hover:bg-terracotta-hover transition-colors shadow-2xl">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9 ml-1">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>
                      </span>
                    </button>
                  )}
                </div>

                <div className="mt-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                  <div className="min-w-0">
                    <p className="meta-label mb-2">Episode {active.ep}</p>
                    <h2 className="font-serif text-[22px] md:text-[26px] leading-tight tracking-[-0.01em] text-ink">
                      {active.title}
                    </h2>
                  </div>
                  <a
                    href={`https://www.youtube.com/watch?v=${active.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackConversion('youtube_clicked', { ep: active.ep, id: active.id })}
                    className="pill-ghost flex-shrink-0 self-start sm:self-end"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M23.498 6.186a2.999 2.999 0 0 0-2.115-2.122C19.505 3.55 12 3.55 12 3.55s-7.505 0-9.383.514A2.999 2.999 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a2.999 2.999 0 0 0 2.115 2.122C4.495 20.45 12 20.45 12 20.45s7.505 0 9.383-.514a2.999 2.999 0 0 0 2.115-2.122C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.546 15.568V8.432L15.818 12l-6.272 3.568z" />
                    </svg>
                    Watch on YouTube
                  </a>
                </div>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
