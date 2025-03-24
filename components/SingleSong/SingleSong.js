export default function SingleSong({
  coverPath,
  songName,
  artistName,
  onClick,
}) {
  return (
    <div className="relative flex flex-col items-start h-auto p-2 xl:p-6 rounded-2xl cursor-pointer transition-all duration-500 hover:bg-neutral-800">
      <img
        className="max-w-40 mb-3 sm:max-w-48 md:max-w-66 lg:max-w-78 xl:max-w-84 rounded-md"
        src={coverPath}
      ></img>
      <p className="text-xl/5 mb-1 max-w-40 sm:max-w-48 md:max-w-66 lg:max-w-78 xl:max-w-84 truncate">
        {songName}
      </p>
      <p className="text-sm text-[#ababab]">{artistName}</p>
    </div>
  );
}

export function SingleSongSmall({ coverPath, songName, artistName, onClick }) {
  return (
    <div className="relative flex flex-col items-start h-auto p-2 xl:p-6 rounded-2xl cursor-pointer transition-all duration-500 hover:bg-neutral-800">
      <img
        className="max-w-30 mb-3 sm:max-w-38 md:max-w-48 lg:max-w-56 xl:max-w-60 rounded-md"
        src={coverPath}
      ></img>
      <p className="text-xl/5 mb-1 max-w-30 sm:max-w-38 md:max-w-48 lg:max-w-56 xl:max-w-60 truncate">
        {songName}
      </p>
      <p className="text-sm text-[#ababab]">{artistName}</p>
    </div>
  );
}

export function SingleSongRandom({
  coverPath,
  songName,
  artistName,
  onClick,
  link,
  uri,
}) {
  return (
    <a href={uri || link}>
      <div
        className="relative flex flex-col items-start h-auto p-2 xl:p-6 rounded-2xl cursor-pointer transition-all duration-500 hover:bg-neutral-800 hover:scale-103"
        onClick={onClick}
      >
        <div id="cover-image-wrapper">
          <img
            className="max-w-54 mb-3  md:max-w-66 lg:max-w-78 xl:max-w-84 rounded-md"
            src={coverPath}
          ></img>
          {/* <div className="single-song__play-icon">
          <PlayPauseIcon />
        </div> */}
        </div>
        <p className="text-xl text-left mb-1 max-w-40 sm:max-w-48 md:max-w-66 lg:max-w-78 xl:max-w-84">
          {songName}
        </p>
        <p className="text-sm text-[#ababab]">{artistName}</p>
      </div>
    </a>
  );
}
