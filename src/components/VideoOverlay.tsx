import React from 'react';

export interface VideoOverlayProps {
  /** Main headline text */
  title?: string;
  /** Alias for title prop */
  text?: string;
  /** Subtitle or descriptor text */
  description?: string;
  /** Optional custom class name */
  className?: string;
}

/**
 * VideoOverlay: Reusable bottom 15% white gradient overlay component for video scrubbers.
 * 
 * Styled with `bg-gradient-to-t from-white/85 to-transparent` and responsive dental typography.
 */
export const VideoOverlay: React.FC<VideoOverlayProps> = ({
  title,
  text,
  description,
  className = '',
}) => {
  const displayTitle = title || text;

  return (
    <div
      className={`absolute bottom-0 left-0 right-0 z-20 h-[22%] sm:h-[18%] md:h-[16%] bg-gradient-to-t from-white/85 via-white/50 to-transparent flex flex-col justify-end items-center px-4 sm:px-6 pb-6 md:pb-8 text-center pointer-events-none select-none transition-all duration-300 ${className}`}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-1 sm:gap-1.5">
        {displayTitle && (
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight text-slate-900 drop-shadow-sm font-sans leading-tight">
            {displayTitle}
          </h2>
        )}
        {description && (
          <p className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-slate-700 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default VideoOverlay;
