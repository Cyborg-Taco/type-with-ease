import { useEffect, useRef, useState, useCallback } from "react";

interface TypingAreaProps {
  text: string;
  onComplete: (wpm: number, accuracy: number) => void;
  onActiveKey: (key: string | null) => void;
  isActive: boolean;
}

const TypingArea = ({ text, onComplete, onActiveKey, isActive }: TypingAreaProps) => {
  const [typed, setTyped] = useState("");
  const [errors, setErrors] = useState<Set<number>>(new Set());
  const [startTime, setStartTime] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const reset = useCallback(() => {
    setTyped("");
    setErrors(new Set());
    setStartTime(null);
    onActiveKey(null);
  }, [onActiveKey]);

  useEffect(() => {
    reset();
  }, [text, reset]);

  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === "Tab" || e.key === "Escape") return;

      e.preventDefault();

      if (e.key === "Backspace") {
        if (typed.length > 0) {
          const newTyped = typed.slice(0, -1);
          setTyped(newTyped);
          const newErrors = new Set(errors);
          newErrors.delete(newTyped.length);
          setErrors(newErrors);
          onActiveKey(null);
        }
        return;
      }

      if (e.key.length !== 1) return;

      if (!startTime) {
        setStartTime(Date.now());
      }

      const currentIndex = typed.length;
      if (currentIndex >= text.length) return;

      const newTyped = typed + e.key;
      setTyped(newTyped);

      if (e.key !== text[currentIndex]) {
        setErrors((prev) => new Set(prev).add(currentIndex));
      }

      onActiveKey(e.key);
      setTimeout(() => onActiveKey(null), 150);

      // Check completion
      if (newTyped.length === text.length) {
        const elapsed = (Date.now() - (startTime || Date.now())) / 1000 / 60;
        const words = text.split(" ").length;
        const wpm = Math.round(words / elapsed);
        const correctChars = text.length - errors.size - (e.key !== text[currentIndex] ? 1 : 0);
        const accuracy = Math.round((correctChars / text.length) * 100);
        onComplete(wpm, accuracy);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive, typed, text, startTime, errors, onComplete, onActiveKey]);

  const currentIndex = typed.length;

  return (
    <div ref={containerRef} className="w-full">
      <div className="rounded-lg border border-border bg-card p-6 font-mono text-lg leading-relaxed tracking-wide select-none min-h-[120px]">
        {text.split("").map((char, index) => {
          let className = "text-pending";

          if (index < typed.length) {
            className = errors.has(index) ? "text-incorrect bg-incorrect/15" : "text-correct";
          } else if (index === currentIndex) {
            className = "text-foreground border-l-2 border-cursor typing-cursor";
          }

          return (
            <span key={index} className={className}>
              {char}
            </span>
          );
        })}
      </div>

      {typed.length > 0 && (
        <div className="mt-3 flex items-center gap-6 text-sm text-muted-foreground">
          <span>{typed.length}/{text.length} characters</span>
          <span>{Math.round(((typed.length - errors.size) / Math.max(typed.length, 1)) * 100)}% accuracy</span>
          <button
            onClick={reset}
            className="ml-auto text-primary hover:text-primary/80 transition-colors"
          >
            ↻ restart
          </button>
        </div>
      )}

      {typed.length === 0 && isActive && (
        <p className="mt-3 text-sm text-muted-foreground animate-pulse-soft">
          Start typing to begin...
        </p>
      )}
    </div>
  );
};

export default TypingArea;
