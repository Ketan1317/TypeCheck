import { useRef } from "react";
import { MdRefresh } from "react-icons/md";

type RestartButtonTypes = {
  onRestart: () => void;
};

const RestartButton = ({ onRestart: handleRestart }: RestartButtonTypes) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    btnRef.current?.blur();
    handleRestart();
  };
  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      className={`block mx-auto mt-12 text-slate-500 rounded px-8 py-2 hover:text-slate-800 `}
    >
      <MdRefresh size={24} />
    </button>
  );
};

export default RestartButton;
