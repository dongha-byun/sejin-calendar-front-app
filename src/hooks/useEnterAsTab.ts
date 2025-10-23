import { useEffect, useRef } from "react";

export function useEnterAsTab<T extends HTMLElement>() {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;

      if (
        e.key === "Enter" &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT")
      ) {
        e.preventDefault();
        e.stopPropagation();

        const focusable = Array.from(
          containerRef.current?.querySelectorAll<HTMLElement>(
            "input:not([disabled]):not([type=hidden]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])"
          ) ?? []
        );

        const index = focusable.indexOf(target);
        if (index > -1) {
          focusable[index + 1]?.focus();
        }
      }
    };

    document.addEventListener("keydown", handler, true); // 캡처 단계에서 처리
    return () => {
      document.removeEventListener("keydown", handler, true);
    };
  }, []);

  return containerRef;
}