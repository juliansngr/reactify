import "@/styles/globals.css";

// import "./index.css";
// import App from "./App.jsx";
// import Track from "./Track.jsx";
// import NotFoundPage from "./NotFoundPage.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

import { AudioPlayerProvider } from "../utils/AudioPlayerContext/AudioPlayerContext";
import Head from "next/head";

// Clerk Authentication
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

// React Router Setup
// const router = createBrowserRouter([
//   { path: "/", element: <App /> },
//   // { path: "/track", element: <Track /> },
//   { path: "/track/:id", element: <Track /> },
//   { path: "*", element: <NotFoundPage /> },
//   { path: "/track/*", element: <NotFoundPage /> },
// ]);

export default function App({ Component, pageProps }) {
  return (
    <AudioPlayerProvider>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        afterSignOutUrl="/"
        appearance={{
          baseTheme: dark,
        }}
      >
        <Head>
          {" "}
          <link rel="icon" type="image/png" href="/favicon.png" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>
            Reactify - Spotify Clone using React, Next and TailwindCSS
          </title>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols"
          />
        </Head>
        <Component {...pageProps} />{" "}
      </ClerkProvider>
    </AudioPlayerProvider>
  );
}
