import { useAudioPlayer } from "@/utils/AudioPlayerContext/AudioPlayerContext";

export default function ProgressBar({ disabled }) {
  const { progress, songDuration, handleProgressBar } = useAudioPlayer();

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);

    const secs = Math.floor(seconds % 60);

    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  }

  return (
    <div
      className={`flex justify-center gap-1 sm:gap-2 md:gap-4  w-[350px] sm:w-[600px] md:w-[700px] lg:w-[500px] xl:w-[700px] 2xl:w-[900px]`}
    >
      <p className="text-sm sm:text-base">{formatTime(progress)}</p>
      <input
        type="range"
        className={`w-full ${disabled ? "cursor-not-allowed" : "text-white"}`}
        min={0}
        max={songDuration}
        value={progress}
        onChange={handleProgressBar}
        disabled={disabled ? true : false}
      />
      <p className="text-sm sm:text-base">{formatTime(songDuration)}</p>
    </div>
  );
}
