import Caret from "./Caret";
import cn from "classnames";

type UserTypingType = {
  userInput: string;
  words: string;
};
type CharacterType = {
  actual: string;
  expected: string;
};

const UserTyping = ({ userInput,words }: UserTypingType) => {
  const typedCharacter = userInput.split("");
  return (
    <div className="absolute inset-0 left-[2px] text-3xl">
      {typedCharacter.map((char: string, idx: number) => {
        return <Character key={idx} actual={char} expected={words[idx]} />;
      })}
      <Caret />
    </div>
  );
};

const Character = ({ actual, expected }: CharacterType) => {
  const isCorrect = actual === expected;
  const isWhitespace = expected === " ";

  return <span className={cn({"text-red-500":!isCorrect && !isWhitespace,"text-yellow-400" : isCorrect && !isWhitespace,"bg-transparent" : !isCorrect && isWhitespace})}>{expected}</span>;
};

export default UserTyping;
