import { useMemo } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { createEmbedUrl } from '../lib/video-utils';

interface YouTubePlayerProps extends ComponentPropsWithoutRef<'div'> {
  videoUrl: string;
  title?: string;
  autoplay?: boolean;
}

export default function YouTubePlayer({
  videoUrl,
  title = 'YouTube video player',
  autoplay = false,
  className = '',
  ...rest
}: YouTubePlayerProps) {
  const embedUrl = useMemo(
    () => createEmbedUrl({ videoUrl, videoType: 'youtube' }, { autoplay }),
    [autoplay, videoUrl],
  );

  const containerClassName = [
    'aspect-video w-full overflow-hidden rounded-lg bg-black shadow-sm',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClassName} {...rest}>
      <iframe
        className="h-full w-full"
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
