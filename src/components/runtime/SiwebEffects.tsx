"use client";

import { useEffect } from "react";

export function SiwebEffects() {
  useEffect(() => {
    const cleanup: Array<() => void> = [];
    document.querySelectorAll<HTMLElement>(".siweb-faq-q").forEach((question) => {
      const handleClick = () => {
        const answer = question.nextElementSibling as HTMLElement | null;
        const marker = question.querySelector("span:last-child");
        if (!answer) return;
        const isOpen = Boolean(answer.style.maxHeight && answer.style.maxHeight !== "0px");
        answer.style.maxHeight = isOpen ? "0" : `${answer.scrollHeight}px`;
        if (marker) marker.textContent = isOpen ? "+" : "−";
      };
      question.addEventListener("click", handleClick);
      cleanup.push(() => question.removeEventListener("click", handleClick));
    });
    return () => cleanup.forEach((dispose) => dispose());
  }, []);

  return null;
}
