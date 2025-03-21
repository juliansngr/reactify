export default function PlayPauseIcon(playbackState) {
  if (playbackState === true) {
    return (
      <svg
        className="icon"
        aria-hidden="true"
        role="img"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          fill="currentColor"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 14c-.55 0-1-.45-1-1V9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1m4 0c-.55 0-1-.45-1-1V9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1"
        ></path>
      </svg>
    );
  } else {
    return (
      <svg
        className="icon"
        aria-hidden="true"
        role="img"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          fill="currentColor"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2M9.5 14.67V9.33c0-.79.88-1.27 1.54-.84l4.15 2.67a1 1 0 0 1 0 1.68l-4.15 2.67c-.66.43-1.54-.05-1.54-.84"
        ></path>
      </svg>
    );
  }
}
