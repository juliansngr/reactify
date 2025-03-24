import { createContext, useContext, useEffect, useRef, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

const PlaylistContext = createContext();

export function usePlaylistContext() {
  return useContext(PlaylistContext);
}

export function PlaylistContextProvider({ children }) {
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
            name: "Idea 1",
            artist: "Gibran Alcocer",
            cover: "../cover/idea1.webp",
            path: "../audio/idea1.mp3",
            year: "2022",
            id: "13070a5b-a2f4-4fae-b93b-fd80130a5faa",
          },
          {
            name: "Idea 10",
            artist: "Gibran Alcocer",
            cover: "../cover/idea10.webp",
            path: "../audio/idea10.mp3",
            year: "2022",
            id: "02ed5347-e98e-404f-9bc8-455580f572fb",
          },
          {
            name: "Idea 5",
            artist: "Gibran Alcocer",
            cover: "../cover/idea5.webp",
            path: "../audio/idea5.mp3",
            year: "2024",
            id: "03aff24e-58f1-439a-a680-776b29324883",
          },
        ],
        id: crypto.randomUUID(),
      },
    ],
  });

  function createPlaylist(playlistData) {
    setPlaylists([playlistData, ...playlists]);
  }

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        createPlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}
