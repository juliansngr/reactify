import { createContext, useContext, useEffect, useRef, useState } from "react";
import { audioDatabase } from "@/utils/AudioDatabase/AudioDatabase";
import useLocalStorageState from "use-local-storage-state";

const AudioPlayerContext = createContext();

export function useAudioPlayer() {
  return useContext(AudioPlayerContext);
}

export function AudioPlayerProvider({ children }) {
  const [audioDB, setAudioDB] = useState(audioDatabase);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(audioDB[0]);
  const [progress, setProgress] = useState(0);
  const [songDuration, setSongDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackHistory, setPlaybackHistory] = useLocalStorageState(
    "plackbackHistory",
    { defaultValue: [""] }
  );

  useEffect(() => {
    audioRef.current = new Audio(audioDB[0].path);
    audioRef.current.volume = volume;
  }, []);

  useEffect(() => {
    const currentAudio = audioRef.current;

    function handleLoadedMetadata() {
      setSongDuration(currentAudio.duration);
    }

    function handleCurrentTime() {
      setProgress(currentAudio.currentTime);
    }

    currentAudio.addEventListener("loadedmetadata", handleLoadedMetadata);

    currentAudio.addEventListener("timeupdate", handleCurrentTime);

    return () => {
      currentAudio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      currentAudio.removeEventListener("timeupdate", handleCurrentTime);
    };
  }, []);

  function togglePlayPause() {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  function handleTrackSelection(newPath) {
    // console.log(newPath);
    if (audioRef.current) {
      audioRef.current.src = newPath;
      audioRef.current.load();
      audioRef.current.play();

      setIsPlaying(true);
    }
  }

  function handlePlaybackHistory(songToAdd) {
    if (playbackHistory.length < 5) {
      console.log(playbackHistory.length);
      if (playbackHistory[0].id !== songToAdd.id) {
        setPlaybackHistory([songToAdd, ...playbackHistory]);
      }
    } else {
      const playbackHistoryNew = [...playbackHistory].toSpliced(
        playbackHistory.length - 1,
        1
      );
      if (playbackHistoryNew[0].id !== songToAdd.id) {
        setPlaybackHistory([songToAdd, ...playbackHistoryNew]);
      }
    }
  }

  function handleVolumeChange(event) {
    const newVolume = parseFloat(event.target.value);

    setVolume(newVolume);

    if (newVolume === 0) {
      setIsMuted(true);
    }

    if (newVolume > 0) {
      setIsMuted(false);
    }

    audioRef.current.volume = newVolume;
  }

  function handleMute(event) {
    if (isMuted === false) {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
    if (isMuted === true) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    }
  }

  function handleProgressBar(event) {
    audioRef.current.currentTime = event.target.value;
    setProgress(event.target.value);
  }

  return (
    <AudioPlayerContext.Provider
      value={{
        audioDB,
        isPlaying,
        togglePlayPause,
        currentSong,
        setCurrentSong,
        progress,
        setProgress,
        handleTrackSelection,
        songDuration,
        volume,
        handleVolumeChange,
        isMuted,
        setIsMuted,
        handleMute,
        handleProgressBar,
        handlePlaybackHistory,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}
