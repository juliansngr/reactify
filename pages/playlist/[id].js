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
import { usePlaylistContext } from "@/utils/PlaylistContext/PlaylistContext";
import AddIcon from "@/components/AddIcon/AddIcon";
import { SingleSongSmall } from "@/components/SingleSong/SingleSong";
import RemoveIcon from "@/components/RemoveIcon/RemoveIcon";

export default function Track() {
  const {
    audioDB,
    setCurrentSong,
    currentSong,
    isPlaying,
    togglePlayPause,
    handleTrackSelection,
    playNewTrack,
  } = useAudioPlayer();

  const { playlists, handleAddTrackToPlaylist, handleRemoveTrackFromPlaylist } =
    usePlaylistContext();

  const router = useRouter();

  const { id } = router.query;
  const [duration, setDuration] = useState("");
  const [songSectionVisibility, setSongSectionVisibility] = useState(false);

  const selectedPlaylist = playlists.find((playlist) => {
    return playlist.id === id;
  });

  const songsPossibleToAdd = selectedPlaylist?.tracks
    ? audioDB.filter((trackDB) => {
        return !selectedPlaylist.tracks.find(
          (trackPlay) => trackPlay.id === trackDB.id
        );
      })
    : [];

  function toggleSongSection() {
    setSongSectionVisibility(!songSectionVisibility);
  }

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

  if (!selectedPlaylist) {
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
              src={selectedPlaylist.image}
              className="w-full max-w-64 rounded-md md:mr-3 aspect-square object-cover"
              alt="Track Cover"
            />
            <span className="flex flex-col gap-3 text-left">
              <p>Playlist</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-6xl">
                {selectedPlaylist.title}
              </h2>
              <h3 className="text-[#ababab]">{selectedPlaylist.description}</h3>
            </span>
          </div>
          <div className="flex gap-10">
            <ControlButton
              className="bg-transparent border-none scale-150"
              buttonImage={PlayPauseIcon(isPlaying)}
              //   onClick={() => {
              //     if (selectedTrack === currentSong) {
              //       togglePlayPause();
              //     } else {
              //       setCurrentSong(selectedTrack);
              //       playNewTrack(selectedTrack);
              //       // handleTrackSelection(selectedTrack.path);
              //     }
              //   }}
            />
          </div>
          <div>
            <div className="flex justify-between items-center pl-5 pr-5">
              <span className="text-[#ababab]">#</span>
              <span className="text-[#ababab]">Track</span>
              <span className="text-[#ababab]">Remove</span>
            </div>
            <hr className="border-[#ababab] mb-5" />
            {selectedPlaylist &&
              selectedPlaylist.tracks.map((track, index) => {
                return (
                  <div
                    key={track.id}
                    className="flex justify-between items-center py-2 px-5 rounded-md lg:hover:bg-[#212121] group"
                    onClick={() => {
                      setCurrentSong(track);
                      playNewTrack(track);
                    }}
                  >
                    <span className=" block group-hover:hidden text-[#ababab] w-4">
                      {index + 1}
                    </span>
                    <span className=" hidden group-hover:block text-[#ababab] w-4">
                      ▶
                    </span>
                    <span className="flex flex-col items-start">
                      <span className="text-lg">{track.title}</span>
                      <span className="text-sm text-[#ababab]">
                        {track.artist[0].name}
                      </span>
                    </span>
                    <span>
                      <ControlButton
                        buttonImage={RemoveIcon()}
                        className=" scale-125 bg-transparent border-none size-8"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleRemoveTrackFromPlaylist(
                            track.id,
                            selectedPlaylist.id
                          );
                        }}
                      />
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
        <ControlButton
          className="bg-transparent border-none"
          buttonImage={AddIcon()}
          onClick={toggleSongSection}
        />
        <div className="flex flex-wrap justify-center">
          {songSectionVisibility
            ? songsPossibleToAdd.map((audio) => {
                return (
                  <div class="relative group" key={audio.id}>
                    <ControlButton
                      className="opacity-0 scale-100 invisible absolute right-10 bottom-20 z-10 bg-transparent border-none transition-all duration-300 md:group-hover:bottom-24 md:group-hover:opacity-100 md:group-hover:visible"
                      buttonImage={AddIcon()}
                      onClick={() => {
                        handleAddTrackToPlaylist(audio.id, selectedPlaylist.id);
                      }}
                    />

                    <Link href={`/track/${audio.id}`}>
                      <SingleSongSmall
                        coverPath={audio.cover}
                        songName={audio.title}
                        artistName={audio.artist[0].name}
                      />
                    </Link>
                  </div>
                );
              })
            : ""}
        </div>
        <Link href={"/"}>
          <GeneralButton buttonText="← Back to Home" />
        </Link>
      </main>
      <PlaybackControls />
    </>
  );
}
