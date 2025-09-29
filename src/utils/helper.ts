export const formatPercentage = (percentage: number) => {
  return percentage.toFixed(0) + "%";
};

export const countErrors = (actual: string, expected: string) => {
  const expectedChars = expected.split("");
  const actualChars = actual.split("");

  return expectedChars.reduce((error, expectedChar, idx) => {
    if (actualChars[idx] === undefined) {
      // no input typed → don't count as error
      return error;
    }
    if (actualChars[idx] !== expectedChar) {
      return error + 1;
    }
    return error;
  }, 0);
};

export function calculateWPM(
  totalChars: number,
  errors: number,
  timeInSeconds: number
): number {
  if (timeInSeconds <= 0) return 0;

  const timeInMinutes = timeInSeconds / 60;

  return Math.max(0, Math.round((totalChars / 5 - errors) / timeInMinutes));
}


export const calculateAccuracyPercentage = (errors: number, total: number) => {
  if (total > 0) {
    const corrects = total - errors;
    return (corrects / total) * 100;
  }
  return 0;
};
