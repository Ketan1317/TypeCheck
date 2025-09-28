// hooks/useEngine.ts
import { useCallback, useEffect, useState } from "react";
import useWords from "./useWords";
import useCountdownTimer from "./useCountdownTimer";
import useTypings from "./useTypings";
import { countErrors } from "../utils/helper";

export type State = "start" | "run" | "finish";

const NUMBER_OF_WORDS = 30;
const COUNTDOWN_SECONDS = 30;

const useEngine = () => {
  const [state, setState] = useState<State>("start");
  const { words, updateWords } = useWords(NUMBER_OF_WORDS);
  const { timeLeft, startCountDown, resetCountdown } =
    useCountdownTimer(COUNTDOWN_SECONDS);
  const { typed, cursor, clearTyped, resetTotalTyped, totalTyped } = useTypings(
    state !== "finish"
  );

  const [errors, setErrors] = useState(0);

  const isStarting = state === "start" && cursor > 0;
  const areWordsFinished = cursor >= words.length;

  const sumErrors = useCallback(() => {
    const wordsReached = words.substring(0, cursor);
    setErrors((prev) => prev + countErrors(typed, wordsReached));
  }, [typed, cursor, words]);

  useEffect(() => {
    if (isStarting) {
      setState("run");
      startCountDown();
    }
  }, [isStarting, startCountDown, cursor]);

  useEffect(() => {
    if (!timeLeft) {
      console.log("Time is up.....");
      setState("finish");
      sumErrors();
    }
  }, [sumErrors,timeLeft]);


  useEffect( () => {
    if(areWordsFinished){
      console.log("Words are finished....")
      sumErrors();
      clearTyped();
      updateWords();
    }

  },[cursor, words, areWordsFinished, sumErrors,clearTyped, updateWords,typed])

  const restart = useCallback(() => {
    console.log("Restarting....");
    setState("start");
    resetCountdown();
    resetTotalTyped();
    clearTyped();
    updateWords();
    setErrors(0);
  },[clearTyped, resetCountdown, resetTotalTyped, updateWords]);

  return { state, words, timeLeft, typed,errors, totalTyped, restart };
};

export default useEngine;
