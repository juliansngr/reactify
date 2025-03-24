"use client";
import Header from "@/components/Header/Header";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAudioPlayer } from "@/utils/AudioPlayerContext/AudioPlayerContext";

import { useEffect, useState } from "react";
import PlaybackControls from "@/components/PlaybackControls/PlaybackControls";
// import NotFoundPage from "@/NotFoundPage";
import ControlButton from "@/components/ControlButton/ControlButton";
import PlayPauseIcon from "@/components/PlayPauseIcon/PlayPauseIcon";
import GeneralButton from "@/components/GeneralButton/GeneralButton";
import { useAuth } from "@clerk/nextjs";

export default function Track() {
  const { userId, isLoaded } = useAuth();

  if (!isLoaded) return <p>Lädt...</p>;

  if (!userId) return <p>Kein Zugriff!</p>;

  const {
    audioDB,
    setCurrentSong,
    currentSong,
    isPlaying,
    togglePlayPause,
    handleTrackSelection,
    playNewTrack,
  } = useAudioPlayer();

  const router = useRouter();

  const { id } = router.query;
  const [duration, setDuration] = useState("");

  const selectedTrack = audioDB.find((track) => {
    return track.id === id;
  });

  useEffect(() => {
    if (selectedTrack?.path) {
      getAudioDuration(selectedTrack.path);
    }
  }, [selectedTrack]);

  function getAudioDuration(filePath) {
    const audioForDuration = new Audio(filePath);

    // Event-Listener, der ausgelöst wird, wenn Metadaten geladen sind
    audioForDuration.addEventListener("loadedmetadata", () => {
      const durationInSeconds = audioForDuration.duration; // Dauer in Sekunden

      // Optional: Umwandlung in Minuten und Sekunden
      const minutes = Math.floor(durationInSeconds / 60);
      const seconds = Math.floor(durationInSeconds % 60);

      const durationString = `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;

      setDuration(durationString);
    });
  }

  if (!selectedTrack) {
    return (
      <>
        <Header />
        <main className="pt-[6vh] pb-[40vh] flex flex-col items-center justify-center">
          <h1 className="text-3xl">Track nicht gefunden</h1>
          <Link href="/">
            <GeneralButton buttonText="← Zurück zur Startseite" />
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-[6vh] pb-[40vh] sm:pb-[30vh] md:pb-[40vh] lg:pb-[20vh] flex flex-col items-center gap-12">
        <div className="flex flex-col gap-12 m-auto w-[70vw]">
          <div className="flex flex-col md:flex-row gap-2 md:items-end">
            <img
              src={selectedTrack.cover}
              className="w-full max-w-64 rounded-md md:mr-3"
              alt="Track Cover"
            />
            <span className="flex flex-col text-left">
              <p>Single</p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                {selectedTrack.title}
              </h1>
              <h3 className="text-[#ababab]">
                {selectedTrack.artist[0].name} - {selectedTrack.year}
              </h3>
            </span>
          </div>
          <div className="flex">
            <ControlButton
              className="bg-transparent border-none scale-150"
              buttonImage={PlayPauseIcon(
                isPlaying && selectedTrack === currentSong
              )}
              onClick={() => {
                if (selectedTrack === currentSong) {
                  togglePlayPause();
                } else {
                  setCurrentSong(selectedTrack);
                  playNewTrack(selectedTrack);
                  // handleTrackSelection(selectedTrack.path);
                }
              }}
            />
          </div>
          <div>
            <div className="flex justify-between items-center pl-5 pr-5">
              <span className="text-[#ababab]">#</span>
              <span className="text-[#ababab]">Track</span>
              <span className="text-[#ababab]">Dauer</span>
            </div>
            <hr className="border-[#ababab] mb-5" />
            <div
              className="flex justify-between items-center py-2 px-5 rounded-md lg:hover:bg-[#212121] group"
              onClick={() => {
                setCurrentSong(selectedTrack);
                playNewTrack(selectedTrack);
                // handleTrackSelection(selectedTrack.path);
              }}
            >
              <span className=" block group-hover:hidden text-[#ababab] w-4">
                1
              </span>
              <span className=" hidden group-hover:block text-[#ababab] w-4">
                ▶
              </span>
              <span className="flex flex-col items-start">
                <span className="text-lg">{selectedTrack.title}</span>
                <span className="text-sm text-[#ababab]">
                  {selectedTrack.artist[0].name}
                </span>
              </span>
              <span>{duration}</span>
            </div>
          </div>
        </div>
        <Link href={"/"}>
          <GeneralButton buttonText="← Back to Home" />
        </Link>
      </main>
      <PlaybackControls />
    </>
  );
}
