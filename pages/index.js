// Temporary Imports
import PlaybackControls from "@/components/PlaybackControls/PlaybackControls";

import SongCollection from "@/components/SongCollection/SongCollection";
import Header from "@/components/Header/Header";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import EmptySongCollection from "@/components/EmptySongCollection/EmptySongCollection";

function Home() {
  // const { currentSong, setCurrentSong } = useAudioPlayer();
  // const [currentTrack, setCurrentTrack] = useState([audioDB[0]]);

  // function handleTrackSelection(selectedTrackID) {
  //   // console.log("handleTrackSelection initiated");
  //   const newCurrentTrack = audioDB.filter((track) => {
  //     if (selectedTrackID === track.id) {
  //       return track;
  //     }
  //   });

  //   setCurrentTrack(newCurrentTrack);
  // }

  // console.log("current track: ", currentTrack);

  return (
    <>
      <Header />

      <PlaybackControls />

      <main className="pt-[6vh] pb-[40vh] sm:pb-[30vh] lg:pb-[20vh]">
        <SignedOut>
          <EmptySongCollection />
        </SignedOut>
        <SignedIn>
          <SongCollection />
        </SignedIn>
      </main>
    </>
  );
}

export default Home;
