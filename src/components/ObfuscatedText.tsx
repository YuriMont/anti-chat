import { useEffect, useRef } from "react";

export default function ObfuscatedText({ text }: { text: string }) {
  const width = 700,
    height = 60;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Limpa
    ctx.clearRect(0, 0, width, height);

    // Fundo com ruído leve
    for (let i = 0; i < 300; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const alpha = Math.random() * 0.1;
      ctx.fillStyle = `rgba(0,0,0,${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, Math.random() * 0.7 + 0.3, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Texto com distorções
    ctx.font = "16px ui-monospace";
    ctx.textBaseline = "top";

    let x = 10;
    for (let char of text) {
      const yOffset = Math.random() * 20; // aumento do ruído vertical
      const alpha = 0.9 + Math.random() * 0.4; // variação leve de opacidade
      ctx.fillStyle = `rgba(20, 20, 20, ${alpha})`;

      ctx.fillText(char, x, 10 + yOffset);
      const spacing = char === " " ? 10 : 2;
      x += ctx.measureText(char).width + spacing;
    }
  }, [text, width, height]);

  return (
    <div className="relative">
      <canvas ref={canvasRef} width={width} height={height} />
      <span className="sr-only">{text}</span>
    </div>
  );
}
