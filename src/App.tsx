// App.tsx
import RestartButton from "./components/RestartButton";
import Results from "./components/Results";
import UserTyping from "./components/UserTyping";
import useEngine from "./hooks/useEngine";
import { calculateAccuracyPercentage } from "./utils/helper";

const App = () => {
  const { state, words, timeLeft, typed, errors, totalTyped, restart } =
    useEngine();

  return (
    <div>
      <Timer timeLeft={timeLeft} />
      <div className="relative max-w-2xl mt-3 text-3xl leading-relaxed break-all">
        <GenerateWords words={words} />
        <UserTyping words={words} userInput={typed} />
      </div>

      <RestartButton onRestart={() => restart()} />
      <Results
        state={state}
        errors={errors}
        accuracyPercentage={calculateAccuracyPercentage(errors, totalTyped)}
        total={totalTyped}
      />
    </div>
  );
};

const GenerateWords = ({ words }: { words: string }) => {
  return <div className="text-3xl text-center">{words}</div>;
};

const Timer = ({ timeLeft }: { timeLeft: number }) => {
  return (
    <div>
      <h1 className="text-2xl mb-10 text-yellow-400 text-center">
        Time : {timeLeft}
      </h1>
    </div>
  );
};

export default App;
