import disableDevtool from "disable-devtool";
import { useEffect, useState } from "react";

function App() {
  const [isBlurred, setIsBlurred] = useState(false);
  const [contentOverride, setContentOverride] = useState<null | string>(null);
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem("blurCount");
    return savedCount ? parseInt(savedCount, 10) : 0;
  });

  useEffect(() => {
    disableDevtool({
      disableMenu: true,
      ondevtoolopen: () => setContentOverride("DevTools aberto!"),
      ondevtoolclose: () => setContentOverride(null),
    });

    const handleVisibilityChange = () => {
      if (document.hidden) {
        incrementarContador();
        setIsBlurred(true);
      } else {
        setIsBlurred(false);
      }
    };

    const handleWindowBlur = () => {
      incrementarContador();
      setIsBlurred(true);
    };

    const handleWindowFocus = () => {
      setIsBlurred(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey &&
          e.shiftKey &&
          ["I", "J", "C"].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && e.key.toUpperCase() === "U") ||
        e.key === "F12"
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const incrementarContador = () => {
      setCount((prevCount) => {
        const newCount = prevCount + 1;
        localStorage.setItem("blurCount", newCount.toString());
        return newCount;
      });
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      id="content"
      className={`w-full flex flex-col gap-8 items-center justify-center py-10 ${
        isBlurred ? "blur-3xl" : ""
      }`}
      onCopy={(e) => e.preventDefault()}
    >
      <h2>Você saiu da aba/janela {count} vezes.</h2>

      {contentOverride ? (
        <p>{contentOverride}</p>
      ) : (
        <div className="flex flex-col gap-3">
          <p aria-label="Qual foi a principal causa da Revolução Francesa, iniciada em 1789?">
            Qual foi a principal causa da Revolução Francesa, iniciada em 1789?
          </p>
          <ul className="flex flex-col gap-4">
            <li>A) A expansão militar do Império Otomano sobre a Europa.</li>

            <li>B) O crescimento do movimento socialista na Inglaterra.</li>

            <li>
              C) A insatisfação popular com os privilégios da nobreza e a crise
              econômica.
            </li>

            <li>D) A invasão da França por tropas espanholas.</li>

            <li>E) A unificação da Alemanha sob Bismarck.</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
