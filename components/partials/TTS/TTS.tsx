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
      let boundaryFired = false;
      utterance.onboundary = (event: SpeechSynthesisEvent) => {
        boundaryFired = true;

        if (event.name === "word" || event.charIndex >= 0) {
          charIndex = event.charIndex;

          const before = text.slice(0, charIndex);

          const beforeWords = before.split(/\s+/);
          const wordIndex = beforeWords.length - 1;
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
        // element.innerHTML = text;
        // const spans = element.querySelectorAll("current-speaking");
        // spans.forEach((span) => {
        //   span.classList.remove("current-speaking");
        // });
        // if (!boundaryFired) {
        document.querySelectorAll(".current-speaking").forEach((el) => {
          el.classList.remove("current-speaking");
        });
        // }
      };

      window.speechSynthesis.speak(utterance);
      utterance.onstart = () => {
        setTimeout(() => {
          if (!boundaryFired) {
            element.classList.add("current-speaking");
          }
        }, 200);
      };
    };

    const handleClick = (event: MouseEvent) => {
      window.speechSynthesis.cancel();
      if (!isTTSActive) {
        return;
      }

      const selector =
        "p, h1, h2, h3, h4, h5, h6, a, li, blockquote, .tts-target";
      const element = (event.target as HTMLElement).closest(
        selector
      ) as HTMLElement;

      if (!element) {
        document.querySelectorAll(".current-speaking").forEach((el) => {
          el.classList.remove("current-speaking");
        });
        return;
      }

      const text = element.innerText || element.textContent;
      if (!text || text.trim() === "") return;
      speakText(text, element);
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isTTSActive]);

  return null;
};

export default TTS;
