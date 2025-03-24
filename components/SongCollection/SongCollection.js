import SingleSong from "@/components//SingleSong/SingleSong";
import { SingleSongRandom } from "@/components//SingleSong/SingleSong";

import { useAudioPlayer } from "@/utils/AudioPlayerContext/AudioPlayerContext";

import { useState } from "react";

import Tooltip from "@/components//Tooltip/Tooltip";
import Link from "next/link";
import PlayPauseIcon from "@/components//PlayPauseIcon/PlayPauseIcon";
import ControlButton from "@/components//ControlButton/ControlButton";
import GeneralButton from "@/components//GeneralButton/GeneralButton";
import PlaylistElement, {
  CreatePlaylistElement,
} from "../PlaylistElement/PlaylistElement";
import { usePlaylistContext } from "@/utils/PlaylistContext/PlaylistContext";

export default function SongCollection() {
  const {
    audioDB,
    isPlaying,
    setCurrentSong,
    currentSong,
    handleTrackSelection,
    togglePlayPause,
    handlePlaybackHistory,
    playNewTrack,
  } = useAudioPlayer();

  const { playlists } = usePlaylistContext();

  const [randomTrackState, setRandomTrackState] = useState([]);

  async function generateRandomSongID() {
    try {
      const response = await fetch("/data.json");
      const trackIdDatabase = await response.json();

      function getRandomIdNumber() {
        return Math.floor(Math.random() * trackIdDatabase.length);
      }
      const randomTrackID = trackIdDatabase[getRandomIdNumber()].track_id;
      console.log(randomTrackID);
      return randomTrackID;
    } catch (error) {
      console.error("Fehler beim Laden der Track-Daten:", error);
      return null;
    }
  }

  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

  const body = "grant_type=client_credentials";

  async function getSpotifyToken() {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    };

    try {
      const response = await fetch(`https://accounts.spotify.com/api/token`, {
        method: "POST",
        headers: headers,
        body: body,
      });
      const data = await response.json("");

      if (!response.ok) {
        throw new Error(`Fetch Error! ${response.headers}`);
      }

      return data.access_token;
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchRandomTrack(trackId, token) {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/tracks/${trackId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json("");

      console.log(data);

      if (!response.ok) {
        if (response.status === 404) {
          console.log(`Track ${trackId} does not exist!`);
          return;
        }
        throw new Error(`Fetch Error! ${response.status}`);
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex flex-wrap justify-center">
        {audioDB.map((audio) => {
          return (
            <div class="relative group" key={audio.id}>
              <ControlButton
                className="opacity-0 scale-125 invisible absolute right-10 bottom-20 z-10 bg-transparent border-none transition-all duration-300 md:group-hover:bottom-24 md:group-hover:opacity-100 md:group-hover:visible"
                buttonImage={PlayPauseIcon(isPlaying && audio === currentSong)}
                onClick={() => {
                  if (audio === currentSong) {
                    handlePlaybackHistory(audio);

                    togglePlayPause();
                  } else {
                    handlePlaybackHistory(audio);
                    setCurrentSong(audio);
                    playNewTrack(audio);
                    // handleTrackSelection(audio.path);
                  }
                }}
              />

              <Link href={`/track/${audio.id}`}>
                <SingleSong
                  coverPath={audio.cover}
                  songName={audio.name}
                  artistName={audio.artist}
                  key={audio.id}
                />
              </Link>
            </div>
          );
        })}
        <hr className="flex justify-center items-center my-20 border-[#ababab] w-[90vw]" />
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-3xl">Playlists:</h2>

        <div className="flex flex-wrap justify-center">
          {playlists.map((playlist) => {
            return (
              <Link href={`/playlist/${playlist.id}`}>
                <PlaylistElement
                  coverPath={playlist.tracks[0].cover}
                  playlistTitle={playlist.title}
                  playlistDesc={playlist.description}
                  playlistImage={playlist.image}
                  key={playlist.id}
                />
              </Link>
            );
          })}
          <CreatePlaylistElement />
        </div>
      </div>
      <div className="flex justify-center items-center flex-col pt-24">
        <div className="flex mb-6">
          <GeneralButton
            buttonText="Feelin' lucky today?"
            onClick={async () => {
              const access_token = await getSpotifyToken();
              const randomID = await generateRandomSongID();
              const randomTrack = await fetchRandomTrack(
                randomID,
                access_token
              );
              console.log("Random Track:", randomTrack);

              setRandomTrackState([randomTrack]);
            }}
          />

          <Tooltip
            className="tooltip--padding"
            text={
              "Press to get a completely random song you've probably never heard before!"
            }
          >
            <span class="material-symbols-outlined">info</span>
          </Tooltip>
        </div>
        {randomTrackState.map((track) => {
          if (randomTrackState) {
            return (
              <SingleSongRandom
                coverPath={track.album.images[0].url}
                songName={track.album.name}
                artistName={track.artists[0].name}
                link={track.external_urls.spotify}
                uri={track.uri}
                key={track.uri}
              />
            );
          }
        })}
      </div>
    </>
  );
}
