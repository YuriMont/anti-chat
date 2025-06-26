import disableDevtool from "disable-devtool";
import { useEffect, useRef, useState } from "react";

export function useSecurityControl() {
  const [isBlurred, setIsBlurred] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [contentOverride, setContentOverride] = useState<null | string>(null);
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem("blurCount");
    return savedCount ? parseInt(savedCount, 10) : 0;
  });

  const hasIncrementedRef = useRef(false);

  useEffect(() => {
    disableDevtool({
      disableMenu: true,
      ondevtoolopen: () => setContentOverride("DevTools aberto!"),
      ondevtoolclose: () => setContentOverride(null),
    });

    const incrementarContador = () => {
      const isReloading = sessionStorage.getItem("isReloading") === "true";
      if (isReloading) {
        sessionStorage.removeItem("isReloading");
        return;
      }

      setCount((prev) => {
        const newCount = prev + 1;
        localStorage.setItem("blurCount", newCount.toString());
        return newCount;
      });
    };

    const handleVisibilityChange = () => {
      if (document.hidden && !hasIncrementedRef.current) {
        incrementarContador();
        hasIncrementedRef.current = true;
        setIsBlurred(true);
      } else if (!document.hidden) {
        hasIncrementedRef.current = false;
        setIsBlurred(false);
      }
    };

    const handleWindowBlur = () => {
      if (!hasIncrementedRef.current) {
        incrementarContador();
        hasIncrementedRef.current = true;
        setIsBlurred(true);
      }
    };

    const handleWindowFocus = () => {
      hasIncrementedRef.current = false;
      setIsBlurred(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.keyCode === 44 || e.code === "PrintScreen") {
        e.preventDefault();
        setShowOverlay(true);
        setTimeout(() => setShowOverlay(false), 3000);
        return false;
      }

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

    const handleBeforeUnload = () => {
      sessionStorage.setItem("isReloading", "true");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);
    document.addEventListener("keyup", handleKeyDown);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
      document.removeEventListener("keyup", handleKeyDown);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return { isBlurred, showOverlay, contentOverride, count };
}
