import { useEffect, useState } from "react";

interface TextBeamProps {
  text: string;
  revealSpeed?: number; // em milissegundos
  visiblePercentage?: number; // porcentagem visível (0-100)
}

const TextBeam = ({
  text,
  revealSpeed = 100,
  visiblePercentage = 30,
}: TextBeamProps) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [maskPosition, setMaskPosition] = useState<number>(0);

  useEffect(() => {
    setDisplayedText(text);
  }, [text]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMaskPosition((prev) => (prev + 1) % 100);
    }, revealSpeed);

    return () => clearInterval(interval);
  }, [revealSpeed]);

  const getVisibleText = () => {
    if (!displayedText) return "";

    const textLength = displayedText.length;
    const visibleLength = Math.floor((textLength * visiblePercentage) / 100);
    const startPos = Math.floor((maskPosition / 100) * textLength);

    let visibleText = "";
    for (let i = 0; i < textLength; i++) {
      const isVisible =
        (i >= startPos && i < startPos + visibleLength) ||
        (startPos + visibleLength > textLength &&
          i < (startPos + visibleLength) % textLength);

      visibleText += isVisible ? displayedText[i] : "░";
    }

    return visibleText;
  };

  return (
    <div className="relative">
      <p className="font-mono whitespace-pre-wrap">{getVisibleText()}</p>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-30"></div>
    </div>
  );
};

export default TextBeam;
