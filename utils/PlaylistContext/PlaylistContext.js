import { createContext, useContext, useEffect, useRef, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { useAudioPlayer } from "../AudioPlayerContext/AudioPlayerContext";

const PlaylistContext = createContext();

export function usePlaylistContext() {
  return useContext(PlaylistContext);
}

export function PlaylistContextProvider({ children }) {
  const { audioDB } = useAudioPlayer();

  const [playlists, setPlaylists] = useLocalStorageState("playlists", {
    defaultValue: [
      {
        title: "My awesome playlist!",
        description:
          "This is my awesome first playlist with lots of cool music!",
        image:
          "https://images.unsplash.com/photo-1740768081816-f6837061ae86?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3Mjc3MjF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDI4MDM4ODF8&ixlib=rb-4.0.3&q=85",
        tracks: [
          {
            id: "b012e12b-a0ba-4da7-b5e8-bcff793bf818",
            title: "LIGHT ONLY",
            artist: [{ name: "San Holo" }],
            cover: "../cover/b012e12b-a0ba-4da7-b5e8-bcff793bf818.webp",
            path: "../audio/b012e12b-a0ba-4da7-b5e8-bcff793bf818.mp3",
            year: "2023",
            genre: "house",
            tags: ["emotional", "melodic", "uplifting"],
          },
          {
            id: "06d44607-d0dc-462a-acd6-4a00c61c1d67",
            title: "meant to be",
            artist: [{ name: "bbno$" }],
            cover: "../cover/06d44607-d0dc-462a-acd6-4a00c61c1d67.webp",
            path: "../audio/06d44607-d0dc-462a-acd6-4a00c61c1d67.mp3",
            year: "2024",
            genre: "indie",
            tags: ["chill", "melodic", "ambient"],
          },
          {
            id: "3a13805e-715a-496e-ad04-6b88c68cc284",
            title: "On My Mind",
            artist: [{ name: "Curbi" }],
            cover: "../cover/3a13805e-715a-496e-ad04-6b88c68cc284.webp",
            path: "../audio/3a13805e-715a-496e-ad04-6b88c68cc284.mp3",
            year: "2025",
            genre: "house",
            tags: ["energetic", "bouncy", "bass-driven"],
          },
        ],
        id: crypto.randomUUID(),
      },
    ],
  });

  function createPlaylist(playlistData) {
    setPlaylists([playlistData, ...playlists]);
  }

  function handleAddTrackToPlaylist(trackIdToAdd, playlistIdToAdd) {
    const selectedPlaylist = playlists.find(
      (list) => list.id === playlistIdToAdd
    );

    const selectedTrack = audioDB.find((track) => track.id === trackIdToAdd);

    selectedPlaylist.tracks.push(selectedTrack);

    const newPlaylistData = playlists.map((list) =>
      list.id === selectedPlaylist.id ? selectedPlaylist : list
    );

    setPlaylists(newPlaylistData);
  }

  function handleRemoveTrackFromPlaylist(trackIdToRemove, playlistIdToRemove) {
    const selectedPlaylist = playlists.find(
      (list) => list.id === playlistIdToRemove
    );

    const removeTrack = selectedPlaylist.tracks.filter(
      (track) => track.id !== trackIdToRemove
    );

    const rebuild = { ...selectedPlaylist, tracks: [...removeTrack] };

    const newPlaylistData = playlists.map((list) =>
      list.id === rebuild.id ? rebuild : list
    );

    setPlaylists(newPlaylistData);
  }

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        createPlaylist,
        handleAddTrackToPlaylist,
        handleRemoveTrackFromPlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}
