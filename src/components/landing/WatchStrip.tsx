import { useEffect, useState } from 'react';
import { LINKS } from '../../content/site';
import { trackConversion } from '../../hooks/useAnalytics';
import { revealDelay } from '../../hooks/useReveal';

type Video = { id: string; ep: string; title: string; publishedAt: string | null };

const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/mqdefault.jpg`;

// The channel is the proof this is real. Renders nothing if the feed is down.
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
    <section aria-labelledby="watch-heading" className="bg-paper-deep">
      <div className="container-page py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8" data-reveal>
          <div>
            <p className="meta-label mb-3">Watch · {videos.length} episodes</p>
            <h2 id="watch-heading" className="statement text-[28px] md:text-[34px] text-ink">
              Built in public, one episode at a time.
            </h2>
          </div>
          <a
            href={LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackConversion('youtube_channel_clicked', { source: 'watch_strip' })}
            className="text-[14px] font-semibold text-coffee hover:text-terracotta transition-colors"
          >
            YouTube · @bffless →
          </a>
        </div>
        <ol className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {latest.map((v, i) => (
            <li key={v.id} data-reveal style={revealDelay(i * 60)}>
              <a
                href={`https://www.youtube.com/watch?v=${v.id}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackConversion('video_selected', { ep: v.ep, id: v.id, source: 'watch_strip' })}
                className="group block bg-paper rounded-tile p-3 h-full transition-colors hover:bg-coffee-wash"
              >
                <span className="block aspect-video overflow-hidden rounded-[10px] bg-paper-deep">
                  <img
                    src={thumb(v.id)}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </span>
                <span className="block text-[11px] font-semibold text-ink-mute mt-3">EP {v.ep}</span>
                <span className="block text-[13.5px] font-medium leading-snug text-ink mt-1">{v.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
