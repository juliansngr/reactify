import { createContext, useContext, useEffect, useRef, useState } from "react";
import { audioDatabase } from "@/utils/AudioDatabase/AudioDatabase";

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
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}
