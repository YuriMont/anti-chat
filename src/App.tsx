import MoireText from "./components/MoireText";
import SlidingOpacityText from "./components/SlidingOpacityText ";
import TextBeam from "./components/TextBeam";
import TextoVibrando from "./components/TextoVibrando";
import TypewriterLoopText from "./components/TypewriterLoopText";
import { useSecurityControl } from "./hooks/useSecurityControl";

const FULL_TEXT =
  "Qual foi a principal causa da Revolução Francesa, iniciada em 1789?";

function App() {
  const { isBlurred, showOverlay, contentOverride, count } =
    useSecurityControl();

  return (
    <div
      id="content"
      className={`w-full h-fit flex flex-col gap-8 items-center justify-center py-10 ${
        isBlurred ? "blur-3xl" : ""
      }`}
      onCopy={(e) => e.preventDefault()}
    >
      {showOverlay && (
        <div className="z-[99999] bg-black w-screen h-screen flex items-center justify-center fixed top-0 left-0">
          <h1 className="text-white">Capturas de tela não são permitidas!</h1>
        </div>
      )}
      <h2>Você saiu da aba/janela {count} vezes.</h2>

      {contentOverride ? (
        <p>{contentOverride}</p>
      ) : (
        <div className="flex flex-col gap-3">
          <TypewriterLoopText text={FULL_TEXT} />
          <TextoVibrando text={FULL_TEXT} />
          <SlidingOpacityText text={FULL_TEXT} />
          <TextBeam text={FULL_TEXT} />
          <MoireText text={FULL_TEXT} />
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
