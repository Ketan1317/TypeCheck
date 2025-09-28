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


export const calculateAccuracyPercentage = (errors: number, total: number) => {
  if (total > 0) {
    const corrects = total - errors;
    return (corrects / total) * 100;
  }
  return 0;
};
