import { MdRefresh } from "react-icons/md";

type RestartButtonTypes = {
  onRestart: () => void;
  timeLeft: number;
};

const RestartButton = ({ onRestart, timeLeft }: RestartButtonTypes) => {
  return (
    <button
      onClick={onRestart} 
      className={`block mx-auto mt-14 text-slate-500 rounded px-8 py-2 hover:text-slate-800 
        ${timeLeft === 0 ? "animate-bounce text-yellow-400" : ""}`}
    >
      <MdRefresh size={29} />
    </button>
  );
};

export default RestartButton;
