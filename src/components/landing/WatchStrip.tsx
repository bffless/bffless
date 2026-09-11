import { useEffect, useState } from 'react';
import { LINKS } from '../../content/site';
import { trackConversion } from '../../hooks/useAnalytics';
import { revealDelay } from '../../hooks/useReveal';

type Video = { id: string; ep: string; title: string; publishedAt: string | null };

const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/mqdefault.jpg`;

// The channel is the proof this is real: a slim rail of the latest episodes,
// linking straight out to YouTube. Renders nothing if the feed is unreachable.
export default function WatchStrip() {
  const [videos, setVideos] = useState<Video[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/episodes')
      .then((r) => (r.ok ? (r.json() as Promise<Video[]>) : []))
      .then((v) => !cancelled && setVideos(v))
      .catch(() => !cancelled && setVideos([]));
    return () => {
      cancelled = true;
    };
  }, []);

  if (!videos || videos.length === 0) return null;
  const latest = videos.slice(0, 4);

  return (
    <section aria-labelledby="watch-heading">
      <div className="container-page pb-16 md:pb-20">
        <div className="border-t rule pt-8 flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
          <div className="md:w-[280px] flex-none" data-reveal>
            <p className="meta-label mb-3">Watch · {videos.length} episodes</p>
            <h2 id="watch-heading" className="font-bold text-[20px] leading-tight tracking-[-0.01em] text-ink">
              Built in public, one episode at a time.
            </h2>
            <a
              href={LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackConversion('youtube_channel_clicked', { source: 'watch_strip' })}
              className="inline-block mt-3 text-[13px] font-semibold text-coffee hover:text-terracotta transition-colors"
            >
              YouTube · @bffless →
            </a>
          </div>
          <ol className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {latest.map((v, i) => (
              <li key={v.id} data-reveal style={revealDelay(i * 60)}>
                <a
                  href={`https://www.youtube.com/watch?v=${v.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackConversion('video_selected', { ep: v.ep, id: v.id, source: 'watch_strip' })}
                  className="group block"
                >
                  <span className="block aspect-video overflow-hidden rounded-[3px] border border-paper-edge bg-paper-deep">
                    <img
                      src={thumb(v.id)}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </span>
                  <span className="block meta-label !text-ink-mute mt-2.5">EP {v.ep}</span>
                  <span className="block text-[13px] leading-snug text-ink mt-1 group-hover:text-coffee transition-colors">
                    {v.title}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
