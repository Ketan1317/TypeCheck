type UserTypingType = {
  userInput: string;
};

const UserTyping = ({ userInput }: UserTypingType) => {
  const typedCharacter = userInput.split("");
  return (
    <div className="absolute inset-0">
      {typedCharacter.map((char: string, idx: number) => {
        return <Character key={idx} char={char} />;
      })}
    </div>
  );
};

const Character = ({ char }: { char: string }) => {
  return <span className="text-yellow-400">{char}</span>;
};

export default UserTyping;
