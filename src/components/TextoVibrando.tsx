import { useEffect, useState } from "react";

function TextoVibrando({ text }: { text: string }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const x = Math.random() * 4 - 2; // -2 a +2 px
      const y = Math.random() * 4 - 2;
      setPosition({ x, y });
    }, 40); // 25 frames por segundo

    return () => clearInterval(interval);
  }, []);

  const style = {
    display: "inline-block",
    transform: `translate(${position.x}px, ${position.y}px)`,
    transition: "transform 0.03s linear",
  };

  return (
    <p className="ruido select-none" style={style}>
      {text}
    </p>
  );
}

export default TextoVibrando;
