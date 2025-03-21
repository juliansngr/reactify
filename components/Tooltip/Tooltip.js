import { useState } from "react";

export default function Tooltip({ text, children }) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div
      className="relative inline-block ml-3"
      onMouseEnter={() => {
        setIsVisible(true);
      }}
      onMouseLeave={() => {
        setIsVisible(false);
      }}
    >
      {children}
      {isVisible && (
        <div className="absolute -translate-y-2/3 -translate-x-1/2 -top-full  bg-neutral-800 text-sm text-white p-3 rounded-md z-10 min-w-48">
          {text}
        </div>
      )}
    </div>
  );
}
