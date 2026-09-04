'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles, Play, Pause } from 'lucide-react';

export interface VideoScrubberProps {
  /** Path to the frame sequence directory (e.g. "/videos/video_1_frames") */
  videoFramePath?: string;
  /** Total number of frames in the sequence (default: 300) */
  totalFrames?: number;
  /** Main overlay headline text */
  overlayTitle?: string;
  /** Sub-headline or tagline description */
  overlayDescription?: string;
  /** Frame filename prefix (default: "frame_") */
  framePrefix?: string;
  /** Number of zero-padded digits (default: 4 for frame_0001.webp) */
  padDigits?: number;
  /** File extension (default: "webp") */
  extension?: string;
  /** Optional custom class name for the hero section */
  className?: string;
}

export const VideoScrubber: React.FC<VideoScrubberProps> = ({
  videoFramePath = '/videos/video_1_frames',
  totalFrames = 300,
  overlayTitle = 'We Make Smiles - Professional Dental Care',
  overlayDescription = 'Your journey to perfect smiles starts here.',
  framePrefix = 'frame_',
  padDigits = 4,
  extension = 'webp',
  className = '',
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // State
  const [currentFrame, setCurrentFrame] = useState<number>(1);
  const [loadedFramesCount, setLoadedFramesCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Cache & animation refs
  const imagesCacheRef = useRef<HTMLImageElement[]>([]);
  const targetFrameRef = useRef<number>(1);
  const currentRenderedFrameRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Drag interaction refs
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const startFrameRef = useRef<number>(1);

  // URL Helper
  const getFrameUrl = useCallback(
    (index: number) => {
      const sanitizedDir = videoFramePath.replace(/\/$/, '');
      const paddedIndex = String(index).padStart(padDigits, '0');
      return `${sanitizedDir}/${framePrefix}${paddedIndex}.${extension}`;
    },
    [videoFramePath, framePrefix, padDigits, extension]
  );

  // Draw frame on canvas
  const renderFrameOnCanvas = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesCacheRef.current[frameIndex - 1];
    if (img && img.complete && img.naturalWidth > 0) {
      if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      currentRenderedFrameRef.current = frameIndex;
    }
  }, []);

  // 1. Preload frames
  useEffect(() => {
    if (totalFrames <= 0) return;

    let isAborted = false;
    const images: HTMLImageElement[] = new Array(totalFrames);
    imagesCacheRef.current = images;
    let loadedCount = 0;

    // Load first frame immediately
    const firstImg = new Image();
    images[0] = firstImg;
    firstImg.src = getFrameUrl(1);

    const onFirstLoad = () => {
      if (!isAborted) {
        loadedCount++;
        setLoadedFramesCount(loadedCount);
        setIsLoading(false);
        renderFrameOnCanvas(1);
      }
    };

    if (firstImg.complete) {
      onFirstLoad();
    } else {
      firstImg.onload = onFirstLoad;
    }

    // Preload remaining frames
    for (let i = 2; i <= totalFrames; i++) {
      const img = new Image();
      images[i - 1] = img;
      img.src = getFrameUrl(i);
      img.onload = () => {
        if (!isAborted) {
          loadedCount++;
          setLoadedFramesCount(loadedCount);
          if (loadedCount >= 10) {
            setIsLoading(false);
          }
          if (targetFrameRef.current === i) {
            renderFrameOnCanvas(i);
          }
        }
      };
    }

    return () => {
      isAborted = true;
    };
  }, [totalFrames, getFrameUrl, renderFrameOnCanvas]);

  // 2. 60fps Lerp Animation Loop
  useEffect(() => {
    const updateLoop = () => {
      const diff = targetFrameRef.current - currentRenderedFrameRef.current;
      if (Math.abs(diff) > 0.05) {
        const next = currentRenderedFrameRef.current + diff * 0.35;
        const targetFrameInt = Math.max(1, Math.min(totalFrames, Math.round(next)));
        if (targetFrameInt !== currentRenderedFrameRef.current) {
          renderFrameOnCanvas(targetFrameInt);
          setCurrentFrame(targetFrameInt);
        }
      }
      animFrameIdRef.current = requestAnimationFrame(updateLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(updateLoop);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [totalFrames, renderFrameOnCanvas]);

  // 3. Scroll Event Listener
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableDistance = sectionRef.current.offsetHeight - window.innerHeight;

      if (scrollableDistance <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

      setScrollProgress(progress);

      const target = Math.max(
        1,
        Math.min(totalFrames, Math.round(progress * (totalFrames - 1)) + 1)
      );
      targetFrameRef.current = target;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [totalFrames]);

  // 4. Autoplay toggle
  useEffect(() => {
    if (!isPlaying) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      targetFrameRef.current = targetFrameRef.current >= totalFrames ? 1 : targetFrameRef.current + 1;
    }, 1000 / 30);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isPlaying, totalFrames]);

  // Direct Pointer / Touch Scrubbing on Video
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startFrameRef.current = targetFrameRef.current;
    setIsPlaying(false);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !stickyRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    const width = stickyRef.current.clientWidth;
    const frameShift = Math.round((deltaX / width) * totalFrames * 1.5);
    const newTarget = Math.max(1, Math.min(totalFrames, startFrameRef.current + frameShift));
    targetFrameRef.current = newTarget;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <section
      ref={sectionRef}
      className={`relative w-full bg-white text-slate-900 ${className}`}
      style={{ height: '200vh' }}
      aria-label="WE MAKE SMILES Clinic Walkthrough Video Experience"
    >
      {/* Sticky Fullscreen 16:9 Viewport */}
      <div
        ref={stickyRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-white cursor-ew-resize select-none"
      >
        <div className="relative aspect-video w-full max-w-full h-full max-h-screen flex items-center justify-center bg-black overflow-hidden shadow-2xl">
          {/* Instant Visual Fallback Frame (always visible) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getFrameUrl(currentFrame)}
            alt="Clinic Walkthrough"
            className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
          />

          {/* Canvas */}
          <canvas
            ref={canvasRef}
            width={1920}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
            aria-label="Dental Clinic interactive walkthrough"
          />

          {/* Loading Indicator */}
          {isLoading && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-950/70 backdrop-blur-sm text-white transition-opacity duration-300 pointer-events-none">
              <div className="relative mb-3 flex items-center justify-center">
                <div className="h-10 w-10 rounded-full border-4 border-[#06b6d4]/20 border-t-[#06b6d4] animate-spin" />
                <span className="absolute text-[10px] font-mono font-bold text-[#06b6d4]">
                  {Math.round((loadedFramesCount / Math.max(1, totalFrames)) * 100)}%
                </span>
              </div>
              <p className="text-xs font-semibold tracking-wider text-slate-200 uppercase">
                Loading Experience
              </p>
            </div>
          )}

          {/* Bottom 15% White Gradient Overlay with Typography */}
          <div className="absolute bottom-0 left-0 right-0 z-20 h-[22%] sm:h-[18%] md:h-[16%] bg-gradient-to-t from-white/90 via-white/60 to-transparent flex flex-col justify-end items-center px-4 pb-6 md:pb-8 text-center pointer-events-none">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight text-slate-900 drop-shadow-sm font-sans">
                {overlayTitle}
              </h1>
              <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-slate-700 max-w-2xl">
                {overlayDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoScrubber;
