import { useEffect } from "react";
import type { RefObject } from "react";
import type { ProgressListener } from "./useScrollProgress";

interface VideoScrubOptions {
  videoRef: RefObject<HTMLVideoElement | null>;
  subscribe: (listener: ProgressListener) => () => void;
  enabled: boolean;
}

/**
 * Desktop scrub: maps shared scroll progress to `video.currentTime`.
 *
 * The clip is all-intra H.264 (every frame a keyframe) so per-frame
 * seeks are cheap. We never seek until `duration` is known — before
 * that the native `poster` covers the gap (no `|| 56` magic fallback;
 * 56s is just the known clip length, kept here only as a note).
 */
export function useVideoScrub({
  videoRef,
  subscribe,
  enabled,
}: VideoScrubOptions) {
  useEffect(() => {
    if (!enabled) return;
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;

    const unsubscribe = subscribe((progress) => {
      const duration = video.duration;
      if (!Number.isFinite(duration) || duration <= 0) return;
      video.currentTime = Math.min(
        Math.max(progress * duration, 0),
        duration - 0.05
      );
    });

    return unsubscribe;
  }, [videoRef, subscribe, enabled]);
}
