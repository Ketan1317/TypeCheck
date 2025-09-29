import RestartButton from "./components/RestartButton";
import Results from "./components/Results";
import { BackgroundRippleEffect } from "./components/ui/spotlight-new";
import UserTyping from "./components/UserTyping";
import useEngine from "./hooks/useEngine";
import { calculateAccuracyPercentage } from "./utils/helper";

const App = () => {
  const { state, words, timeLeft, typed, errors, totalTyped, restart, wpm } =
    useEngine();

  return (
    <div>
      <BackgroundRippleEffect rows={12} cols={27} cellSize={56} />
      <Timer timeLeft={timeLeft} />
      <div className="relative max-w-2xl mt-3 text-3xl leading-relaxed break-all">
        <UserTyping words={words} userInput={typed} />
        <GenerateWords words={words} />
      </div>

      <RestartButton timeLeft={timeLeft} onRestart={() => restart()} />
      <Results
        state={state}
        errors={errors}
        accuracyPercentage={calculateAccuracyPercentage(errors, totalTyped)}
        total={totalTyped}
        speed={wpm}
      />
    </div>
  );
};

const GenerateWords = ({ words }: { words: string }) => {
  return <div className="text-3xl">{words}</div>;
};

const Timer = ({ timeLeft }: { timeLeft: number }) => {
  return (
    <div>
      <h1
        className={`text-2xl mb-10 font-semibold text-yellow-400 ${
          timeLeft <= 10 ? "animate-ping font-semibold" : ""
        }`}
      >
        Time : {timeLeft}
      </h1>
    </div>
  );
};

export default App;

