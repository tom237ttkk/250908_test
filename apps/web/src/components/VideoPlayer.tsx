import type { Video } from '../types';
import YouTubePlayer from './YouTubePlayer';
import { createEmbedUrl } from '../lib/video-utils';

interface VideoPlayerProps {
  video: Video;
  autoplay?: boolean;
  className?: string;
}

export default function VideoPlayer({ video, autoplay = false, className = '' }: VideoPlayerProps) {
  const containerClassName = [
    'aspect-video w-full overflow-hidden rounded-lg bg-black shadow-sm',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (video.videoType === 'youtube') {
    return (
      <YouTubePlayer
        videoUrl={video.videoUrl}
        autoplay={autoplay}
        title={video.title}
        className={className}
        data-provider="youtube"
      />
    );
  }

  if (video.videoType === 'vimeo') {
    const vimeoEmbedUrl = createEmbedUrl(video, { autoplay });

    return (
      <div className={containerClassName} data-provider="vimeo">
        <iframe
          className="h-full w-full"
          src={vimeoEmbedUrl}
          title={video.title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  if (video.videoType === 'direct') {
    return (
      <div className={containerClassName} data-provider="direct">
        {/* biome-ignore lint/a11y/useMediaCaption: 字幕トラックは今後の仕様対応で追加予定 */}
        <video
          className="h-full w-full bg-black"
          src={video.videoUrl}
          poster={video.thumbnailUrl}
          controls
          playsInline
          autoPlay={autoplay}
        />
      </div>
    );
  }

  return (
    <div className={containerClassName} data-provider="unknown">
      <div className="flex h-full items-center justify-center bg-gray-900 text-sm text-gray-200">
        この動画タイプにはまだ対応していません。
      </div>
    </div>
  );
}
