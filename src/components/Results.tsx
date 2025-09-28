import { motion } from "framer-motion";
import { formatPercentage } from "../utils/helper";
import type { State } from "../hooks/useEngine";

type ResultTypes = {
  errors: number;
  accuracyPercentage: number;
  total: number;
  state: State

};

const Results = ({ errors, accuracyPercentage, total,state }: ResultTypes) => {
    
  const initial = { opacity: 0 };
  const animate = { opacity: 1 };
  const duration = { duration: 0.3 };

  if(state !== "finish"){
    return null;
  }

  return (
    <ul
      className={`flex mt-10 flex-col items-center text-primary-400 space-y-3 `}
    >
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 0 }}
        className="text-2xl font-semibold"
      >
        Results
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 0.5 }}
      >
        Accuracy : {formatPercentage(accuracyPercentage)}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 1 }}
        className="text-red-600"
      >
        Errors : {errors}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 1.5 }}
      >
        Typed: {total} Words
      </motion.li>
    </ul>
  );
};

export default Results;
