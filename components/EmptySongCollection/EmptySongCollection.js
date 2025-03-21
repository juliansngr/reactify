export default function EmptySongCollection() {
  return (
    <>
      <div className="h-[20vh] flex flex-col gap-10 justify-center items-center">
        <h2 className="text-xl">
          Please login, to access songs and playlists.
        </h2>
        <div className="flex flex-col gap-2">
          <h3 className="font-bold">Test-Account:</h3>
          <div className="bg-neutral-800 px-4 py-2 rounded-md">
            <p className="font-mono">E-Mail: john@johndoe.de</p>
            <p className="font-mono">Password: john@johndoe.de</p>
          </div>
        </div>
      </div>
    </>
  );
}
