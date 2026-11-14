import { useState, useEffect, useRef, useCallback } from 'react';

const CYBER_GLITCH_CHARS = '0123456789ABCDEF$#@%&*!<>[]{}_/=+~?|▲◆§';

export function useScrambleText(finalText: string, durationMs = 650, autoStart = true) {
  const [displayText, setDisplayText] = useState<string>(finalText);
  const [isScrambling, setIsScrambling] = useState<boolean>(false);
  const frameRef = useRef<number | null>(null);

  const startScramble = useCallback(() => {
    setIsScrambling(true);
    const startTime = performance.now();
    const length = finalText.length;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1.0);
      const revealedCount = Math.floor(progress * length);

      let result = '';
      for (let i = 0; i < length; i++) {
        if (finalText[i] === ' ' || finalText[i] === '\n') {
          result += finalText[i];
        } else if (i < revealedCount) {
          result += finalText[i];
        } else {
          const randIndex = Math.floor(Math.random() * CYBER_GLITCH_CHARS.length);
          result += CYBER_GLITCH_CHARS[randIndex];
        }
      }

      setDisplayText(result);

      if (progress < 1.0) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(finalText);
        setIsScrambling(false);
      }
    };

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(animate);
  }, [finalText, durationMs]);

  useEffect(() => {
    if (autoStart) {
      startScramble();
    } else {
      setDisplayText(finalText);
    }

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [finalText, autoStart, startScramble]);

  return { displayText, isScrambling, startScramble };
}
