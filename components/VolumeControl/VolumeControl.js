import { useAudioPlayer } from "@/utils/AudioPlayerContext/AudioPlayerContext";

export default function VolumeControl() {
  const { handleVolumeChange, volume, isMuted, handleMute } = useAudioPlayer();

  return (
    <div className="flex justify-center items-center pr-10">
      <button
        className="flex text-[#c9c9c9] hover:text-white bg-transparent border-none cursor-pointer"
        onClick={handleMute}
        value={0}
      >
        {isMuted ? (
          <i class="material-symbols-outlined">volume_off</i>
        ) : (
          <i class="material-symbols-outlined">volume_up</i>
        )}
      </button>

      <input
        className="cursor-pointer lg:w-36 xl:w-48"
        type="range"
        step="0.001"
        min="0"
        max="1"
        value={isMuted ? 0 : volume}
        onChange={handleVolumeChange}
      />
    </div>
  );
}
