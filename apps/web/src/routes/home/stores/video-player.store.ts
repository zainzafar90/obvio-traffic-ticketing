import { create } from "zustand";

interface VideoControlState {
  // State
  isPlaying: boolean;
  currentTime: number;
  videoDuration: number;

  // Actions
  playVideo: () => void;
  pauseVideo: () => void;
  seekToTime: (time: number) => void;
  setVideoDuration: (duration: number) => void;
  resetStore: () => void;
}

export const useVideoPlayerStore = create<VideoControlState>((set) => ({
  isPlaying: false,
  currentTime: 0,
  videoDuration: 0,

  playVideo: () => set((s) => ({ ...s, isPlaying: true })),
  pauseVideo: () => set((s) => ({ ...s, isPlaying: false })),
  seekToTime: (time: number) => set((s) => ({ ...s, currentTime: time })),
  setVideoDuration: (duration: number) =>
    set((s) => ({ ...s, videoDuration: duration })),
  resetStore: () =>
    set({
      isPlaying: false,
      currentTime: 0,
      videoDuration: 0,
    }),
}));
