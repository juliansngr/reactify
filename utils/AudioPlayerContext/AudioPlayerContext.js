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
    { defaultValue: [] }
  );
  const [historyPointer, setHistoryPointer] = useState(0);

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
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }

  function playNewTrack(song) {
    if (historyPointer !== 0) {
      const newHistory = playbackHistory.slice(historyPointer);
      setPlaybackHistory([song, ...newHistory]);
    } else {
      // Normales Verhalten (ganz vorne in der History)
      if (!playbackHistory[0] || playbackHistory[0].id !== song.id) {
        const trimmed =
          playbackHistory.length >= 5
            ? playbackHistory.slice(0, 4)
            : playbackHistory;

        setPlaybackHistory([song, ...trimmed]);
      }
    }

    // Track setzen & abspielen
    setCurrentSong(song);
    handleTrackSelection(song.path);
    setHistoryPointer(0); // weil wir wieder ganz vorne sind
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

  // Playback History

  function handlePlaybackHistory(songToAdd) {
    if (playbackHistory.length < 5) {
      // console.log(playbackHistory.length);
      if (!playbackHistory[0] || playbackHistory[0].id !== songToAdd.id) {
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

  function handlePreviousTrack() {
    // console.log("historypointer:", historyPointer);
    // console.log(playbackHistory[historyPointer]);
    if (playbackHistory.length === 1) {
      // console.log("Nur ein Song in der History!");
      setCurrentSong(playbackHistory[historyPointer]);
      handleTrackSelection(playbackHistory[historyPointer].path);
      return;
    }

    if (!(historyPointer + 1 >= playbackHistory.length)) {
      setHistoryPointer(historyPointer + 1);
      setCurrentSong(playbackHistory[historyPointer + 1]);
      handleTrackSelection(playbackHistory[historyPointer + 1].path);
    }
  }

  function handleNextTrack() {
    // console.log("historypointerNext:", historyPointer - 1);
    // console.log(playbackHistory[historyPointer]);

    setCurrentSong(playbackHistory[historyPointer - 1]);
    handleTrackSelection(playbackHistory[historyPointer - 1].path);
    setHistoryPointer(historyPointer - 1);
  }

  //Volume Change

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
        playbackHistory,
        historyPointer,
        handlePreviousTrack,
        handleNextTrack,
        playNewTrack,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}
