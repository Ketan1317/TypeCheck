// hooks/useWords.ts
import { generate } from "random-words";
import { useCallback, useState } from "react";

const generateWords = (count: number) => {
  return generate({ exactly: count, join: " " }) as string;
};

const useWords = (count: number) => {
  const [words, setWords] = useState<string>(generateWords(count));

  const updateWords = useCallback(() => {
    setWords(generateWords(count));
  }, [count]);

  return { words, updateWords };
};

export default useWords;
