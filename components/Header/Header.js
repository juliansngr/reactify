import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between w-full items-center p-5 bg-black">
      <Link href={"/"}>
        <img src="../assets/logo.png" className="w-50 md:w-60 cursor-pointer" />
      </Link>
      <SignedOut>
        <SignInButton className="px-5 py-2 md:px-6 md:py-3 text-l md:text-xl transition-all duration-500 rounded-4xl text-[#1e1e1e] bg-white hover:scale-105" />
      </SignedOut>
      <SignedIn>
        <div className="flex content-center">
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "!size-12",
              },
            }}
          />
        </div>
      </SignedIn>
    </header>
  );
}
