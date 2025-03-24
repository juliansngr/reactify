import { useEffect, useState } from "react";
import GeneralButton from "../GeneralButton/GeneralButton";
import { usePlaylistContext } from "@/utils/PlaylistContext/PlaylistContext";

export default function PlaylistElement({
  playlistTitle,
  playlistDesc,
  playlistImage,
  onClick,
}) {
  return (
    <div className="relative flex flex-col items-start h-auto p-2 xl:p-6 rounded-2xl cursor-pointer transition-all duration-500 hover:bg-neutral-800">
      <img
        className="max-w-40 mb-3 sm:max-w-48 md:max-w-66 lg:max-w-78 xl:max-w-84 rounded-md  aspect-square object-cover"
        src={playlistImage}
        alt="Playlist Cover"
      ></img>
      <p className="text-xl/5 mb-1">{playlistTitle}</p>
      <p className="text-sm text-[#ababab] truncate max-w-40 mb-3 sm:max-w-48 md:max-w-66 lg:max-w-78 xl:max-w-84">
        {playlistDesc}
      </p>
    </div>
  );
}

export function CreatePlaylistElement({ onClick }) {
  const [formVisible, setFormVisible] = useState(false);

  const { createPlaylist } = usePlaylistContext();

  const getCover = async () => {
    try {
      const response = await fetch("/api/cover");
      const data = await response.json();
      return data.imageUrl;
    } catch (error) {
      console.log("Fehler beim Fetchen des Covers:", error);
      return null;
    }
  };

  const handlePlaylistFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const { title, description } = Object.fromEntries(formData);
    const id = crypto.randomUUID();
    await getCover();
    const image = await getCover();

    createPlaylist({
      title,
      description,
      id,
      image,
      tracks: [
        {
          name: "Idea 1",
          artist: "Gibran Alcocer",
          cover: "../cover/idea1.webp",
          path: "../audio/idea1.mp3",
          year: "2022",
          id: "13070a5b-a2f4-4fae-b93b-fd80130a5faa",
        },
      ],
    });
  };

  return (
    <div
      onClick={() => {
        setFormVisible(true);
      }}
      className="relative flex flex-col items-start h-auto p-2 xl:p-6 rounded-2xl cursor-pointer transition-all duration-500 hover:bg-neutral-800 w-96 aspect-square"
    >
      <div className="flex relative justify-center items-center size-full    border-[#ababab] bg-neutral-900 rounded-xl ">
        <div className="absolute top-5 left-5 w-6 h-6 border-t-2 border-l-2 rounded-tl-xl border-[#ababab]"></div>
        <div className="absolute top-5 right-5 w-6 h-6 border-t-2 border-r-2 rounded-tr-xl border-[#ababab]"></div>
        <div className="absolute bottom-5 left-5 w-6 h-6 border-b-2 border-l-2 rounded-bl-xl border-[#ababab]"></div>
        <div className="absolute bottom-5 right-5 w-6 h-6 border-b-2 border-r-2 rounded-br-xl border-[#ababab]"></div>
        {!formVisible ? (
          <span class="material-symbols-outlined !text-4xl text-[#ababab] ">
            add_circle
          </span>
        ) : (
          <form
            className="flex flex-col gap-5"
            onSubmit={handlePlaylistFormSubmit}
          >
            <input
              name="title"
              type="text"
              className="border-1 rounded-xl p-5"
              placeholder="Playlist Title"
            />
            <input
              name="description"
              type="text"
              className="border-1 rounded-xl p-5"
              placeholder="Playlist Description"
            />
            <GeneralButton buttonText="Create" buttonType="submit" />
          </form>
        )}
      </div>
    </div>
  );
}
