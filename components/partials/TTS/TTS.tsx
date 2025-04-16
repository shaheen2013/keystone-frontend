"use client";

import { FC, useEffect } from "react";

interface TTSProps {
  isTTSActive: boolean;
}

const TTS: FC<TTSProps> = ({ isTTSActive }) => {
  useEffect(() => {
    const speakText = (text: string, element: HTMLElement) => {
      const words = text.trim().split(/\s+/);
      const utterance = new SpeechSynthesisUtterance(text);

      let charIndex = 0;

      utterance.onstart = () => {};

      utterance.onboundary = (event: SpeechSynthesisEvent) => {
        if (event.name === "word" || event.charIndex >= 0) {
          charIndex = event.charIndex;

          const before = text.slice(0, charIndex);

          const beforeWords = before.split(/\s+/);
          const wordIndex = beforeWords.length - 1;

          // wrap each word in a span
          const spans = words.map((word, idx) => {
            const span = document.createElement("span");
            span.textContent = word + " ";
            if (idx <= wordIndex) span.classList.add("current-speaking");
            return span;
          });

          element.innerHTML = "";
          spans.forEach((span) => element.appendChild(span));
        }
      };

      utterance.onend = () => {
        element.innerHTML = text;
        const spans = element.querySelectorAll("span");
        spans.forEach((span) => {
          span.classList.remove("current-speaking");
        });
      };

      window.speechSynthesis.speak(utterance);
    };
    const handleClick = (event: MouseEvent) => {
      window.speechSynthesis.cancel(); // stop any ongoing speech
      if (!isTTSActive) return;

      const target = event.target as HTMLElement;
      if (!target) return;

      const text = target.innerText || target.textContent;
      if (!text || text.trim() === "") return;
      speakText(text, target);
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isTTSActive]);

  return null;
};

export default TTS;
