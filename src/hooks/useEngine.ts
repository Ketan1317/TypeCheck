import { useCallback, useEffect, useState } from "react";
import useWords from "./useWords";
import useCountdownTimer from "./useCountdownTimer";
import useTypings from "./useTypings";
import { calculateWPM, countErrors } from "../utils/helper";

export type State = "start" | "run" | "finish";

const NUMBER_OF_WORDS = 30;
export const COUNTDOWN_SECONDS = 30;

const useEngine = () => {
  const [state, setState] = useState<State>("start");
  const { words, updateWords } = useWords(NUMBER_OF_WORDS);
  const { timeLeft, startCountDown, resetCountdown } = useCountdownTimer(COUNTDOWN_SECONDS);
  const { typed, cursor, clearTyped, resetTotalTyped, totalTyped } = useTypings(
    state !== "finish"
  );

  const [errors, setErrors] = useState(0);
  const [wpm, setWpm] = useState<number>(0);

  const isStarting = state === "start" && cursor > 0;
  const areWordsFinished = cursor >= words.length;

  // calculate current errors
  const currentErrors = countErrors(typed, words.substring(0, typed.length));

  // calculate speed continuously
  const calculateSpeed = useCallback(() => {
    const elapsedTime = COUNTDOWN_SECONDS - timeLeft;
    const speed = calculateWPM(totalTyped, currentErrors, elapsedTime);
    setWpm(speed);
  }, [totalTyped, currentErrors, timeLeft]);

    const restart = useCallback(() => {
    setState("start");
    resetCountdown();
    resetTotalTyped();
    clearTyped();
    updateWords();
    setErrors(0);
    setWpm(0);
  },[clearTyped, resetCountdown, resetTotalTyped, updateWords]);

  useEffect(() => {
    if (isStarting) {
      setState("run");
      startCountDown();
    }
  }, [isStarting, startCountDown]);

  // update errors and WPM continuously
  useEffect(() => {
    if (state === "run") {
      setErrors(currentErrors);
      calculateSpeed();
    }
  }, [typed, currentErrors, calculateSpeed, state]);

  // finish on timer end
  useEffect(() => {
    if (timeLeft === 0 && state === "run") {
      setState("finish");
    }
  }, [timeLeft, state]);

  // finish when words done
  useEffect(() => {
    if (areWordsFinished && state === "run") {
      setState("finish");
    }
  }, [areWordsFinished, state]);





  return { state, words, timeLeft, typed, errors, totalTyped, restart, wpm };
};

export default useEngine;
