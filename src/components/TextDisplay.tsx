type TextDisplayProps = {
  text: string;
};

export default function TextDisplay({ text }: TextDisplayProps) {
  // Gerar uma string longa de letras aleatórias
  const backgroundLetters = Array.from({ length: 1000 }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26))
  ).join("");

  return (
    <div className="relative overflow-hidden">
      {/* Letras de fundo */}
      <div className="absolute top-0 inset-0 z-10 text-gray-500 whitespace-pre-wrap drop-shadow-lg">
        {backgroundLetters}
      </div>

      {/* Texto principal centralizado */}
      <div className="relative z-0 h-full px-4">
        <h1 className="text-black font-bold">{text}</h1>
      </div>
    </div>
  );
}
