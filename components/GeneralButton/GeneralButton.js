export default function GeneralButton({ onClick, buttonText }) {
  return (
    <button
      className="px-5 py-2 md:px-6 md:py-3 text-l md:text-xl cursor-pointer transition-all duration-500 rounded-4xl text-[#1e1e1e] bg-white hover:scale-105"
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
}
