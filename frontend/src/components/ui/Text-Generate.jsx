import { useEffect, useRef } from "react";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { cn } from "../../utils/cn";

export const TextGenerateEffect = ({
  words,
  className,
}) => {
  const [scope, animate] = useAnimate();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  let wordsArray = words.split(" ");
  useEffect(() => {
    if (inView) {
      animate(
        "span",
        {
          opacity: 1,
        },
        {
          duration: 2,
          delay: stagger(0.05),
        }
      );
    }
  }, [inView]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="text-emerald-500 opacity-0"
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div ref={ref} className={cn("font-bold", className)}>
      <div className="max-w-7xl mx-auto sm:py-24 px-4 py-32">
        <div className="text-center text-balance text-2xl sm:text-4xl leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};

