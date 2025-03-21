export default function ControlButton({
  buttonImage,
  onClick,
  disabled,
  className: extraClass,
}) {
  return (
    <button
      className={`w-14 border-none bg-transparent ${
        disabled ? "text-neutral-500 cursor-not-allowed" : "text-white"
      }  ${extraClass ? extraClass : null}`}
      onClick={onClick}
      disabled={disabled ? true : false}
    >
      {buttonImage}
    </button>
  );
}
