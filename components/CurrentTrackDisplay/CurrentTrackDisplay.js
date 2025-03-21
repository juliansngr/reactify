export default function CurrentTrackDisplay({
  songName,
  artistName,
  coverPath,
  imgClassName,
}) {
  return (
    <>
      <img src={coverPath} className="w-20 mr-4 shrink-0 rounded-sm" />
      <div className="text-left text-white">
        <p className="text-xl/5 font-thin">{songName}</p>
        <p className="text-md mt-1 text-[#ababab]">{artistName}</p>
      </div>
    </>
  );
}
