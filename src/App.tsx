import { generate } from "random-words";
import RestartButton from "./components/RestartButton";
import Results from "./components/Results";
import UserTyping from "./components/UserTyping";

const typingText = generate({ exactly: 15, join: " " });

const App = () => {
  return (
    <div>
      <Timer timeLeft="60s" />
      <div className="relative max-w-xl mt-3 text-3xl leading-relaxed break-all">
        <GenerateWords words= {typingText} />
        <UserTyping userInput={"typingText"} />
      </div>

      <RestartButton onRestart={() => null} />
      <Results errors={10} accuracyPercentage={100} total={200} />
    </div>
  );
};

const GenerateWords = ({ words }: { words: string }) => {
  return <div className="text-4xl text-center">{words}</div>;
};

const Timer = ({ timeLeft }: { timeLeft: string }) => {
  return (
    <div>
      <h1 className="text-2xl mb-10 text-yellow-400 text-center">
        Time : {timeLeft}
      </h1>
    </div>
  );
};

export default App;
