import { useEffect, useState } from "react";

const TYPING_SPEED = 50; // ms por letra
const LOOP_DELAY = 1000; // tempo de pausa após terminar

export default function TypewriterLoopText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeoutId: any;

    const updateText = () => {
      const nextIndex = index + 1;

      if (nextIndex <= text.length) {
        const seventyPercent = Math.floor(text.length * 0.7);
        const start =
          nextIndex > seventyPercent ? nextIndex - seventyPercent : 0;
        setDisplayText(text.slice(start, nextIndex));
        setIndex(nextIndex);
      } else {
        timeoutId = setTimeout(() => {
          setIndex(0);
          setDisplayText("");
        }, LOOP_DELAY);
        return;
      }

      timeoutId = setTimeout(updateText, TYPING_SPEED);
    };

    timeoutId = setTimeout(updateText, TYPING_SPEED);

    return () => clearTimeout(timeoutId);
  }, [index]);

  return (
    <p aria-label={text} className="font-mono whitespace-pre-wrap">
      {displayText}
      <span className="animate-pulse">|</span>
    </p>
  );
}
