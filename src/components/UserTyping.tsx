import Caret from "./Caret";
import cn from "classnames";

type UserTypingType = {
  userInput: string; // what the user has typed so far
  words: string;     // the target words to type
};

//each individual character 
type CharacterType = {
  actual: string;   // character typed by the user
  expected: string; // the correct character from the words string
};

const UserTyping = ({ userInput, words }: UserTypingType) => {
  // Split user input into characters for cmparison
  const typedCharacter = userInput.split("");

  return (
    <div className="absolute inset-0 left-[2px] text-left text-3xl">
      {typedCharacter.map((char: string, idx: number) => {
        return (
          <Character
            key={idx}
            actual={char}       
            expected={words[idx]} 
          />
        );
      })}

      <Caret />
    </div>
  );
};

const Character = ({ actual, expected }: CharacterType) => {
  const isCorrect = actual === expected;
  const isWhitespace = expected === " ";

  return (
    <span
      className={cn({
        "text-red-500 bg-rose-500/20 rounded-sm": !isCorrect && !isWhitespace,       // wrong character
        "text-yellow-400": isCorrect && !isWhitespace,     // correct character
        "bg-yellow-200": !isCorrect && isWhitespace,       // wrong space
      })}
    >
      {expected}
    </span>
  );
};

export default UserTyping;
