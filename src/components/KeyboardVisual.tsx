import { KEYBOARD_ROWS, HOME_ROW_KEYS } from "@/data/lessons";

interface KeyboardVisualProps {
  learnedKeys: string[];
  currentNewKeys: string[];
  activeKey: string | null;
}

const KeyboardVisual = ({ learnedKeys, currentNewKeys, activeKey }: KeyboardVisualProps) => {
  const getKeyClass = (key: string) => {
    const base = "w-10 h-10 rounded-md flex items-center justify-center text-sm font-medium transition-all duration-150 border";

    if (activeKey === key) {
      return `${base} bg-key-active text-primary-foreground border-key-active scale-95 shadow-[0_0_12px_hsl(142_70%_50%/0.4)]`;
    }
    if (currentNewKeys.includes(key)) {
      return `${base} bg-key-current/20 text-key-current border-key-current/50 animate-pulse-soft`;
    }
    if (learnedKeys.includes(key)) {
      return `${base} bg-key-learned/30 text-correct border-key-learned/50`;
    }
    return `${base} bg-key-bg text-key-text border-border`;
  };

  return (
    <div className="flex flex-col items-center gap-1.5">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex gap-1.5"
          style={{ paddingLeft: rowIndex === 1 ? "20px" : rowIndex === 2 ? "44px" : "0" }}
        >
          {row.map((key) => (
            <div key={key} className={getKeyClass(key)}>
              <span>{key === ";" ? ";" : key.toUpperCase()}</span>
              {HOME_ROW_KEYS.includes(key) && (
                <span className="absolute mt-6 w-1 h-0.5 rounded-full bg-muted-foreground/40" />
              )}
            </div>
          ))}
        </div>
      ))}
      {/* Bottom row with shifts and spacebar */}
      <div className="flex gap-1.5 items-center">
        <div className={`w-[72px] h-10 rounded-md flex items-center justify-center text-xs font-medium transition-all duration-150 border ${
          learnedKeys.includes("LShift")
            ? currentNewKeys.includes("LShift")
              ? "bg-key-current/20 text-key-current border-key-current/50 animate-pulse-soft"
              : "bg-key-learned/30 text-correct border-key-learned/50"
            : "bg-key-bg text-key-text border-border"
        }`}>
          L SHIFT
        </div>
        <div className={`w-64 h-10 rounded-md flex items-center justify-center text-sm transition-all duration-150 border ${
          activeKey === " " ? "bg-key-active text-primary-foreground border-key-active scale-[0.98]" : "bg-key-bg text-key-text border-border"
        }`}>
          SPACE
        </div>
        <div className={`w-[72px] h-10 rounded-md flex items-center justify-center text-xs font-medium transition-all duration-150 border ${
          learnedKeys.includes("RShift")
            ? currentNewKeys.includes("RShift")
              ? "bg-key-current/20 text-key-current border-key-current/50 animate-pulse-soft"
              : "bg-key-learned/30 text-correct border-key-learned/50"
            : "bg-key-bg text-key-text border-border"
        }`}>
          R SHIFT
        </div>
      </div>
    </div>
  );
};

export default KeyboardVisual;
