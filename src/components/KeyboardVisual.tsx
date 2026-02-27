import { KEYBOARD_ROWS, HOME_ROW_KEYS } from "@/data/lessons";

interface KeyboardVisualProps {
  learnedKeys: string[];
  currentNewKeys: string[];
  activeKey: string | null;
}

const KeyboardVisual = ({ learnedKeys, currentNewKeys, activeKey }: KeyboardVisualProps) => {
  const getKeyClass = (key: string) => {
    const base = "h-10 rounded-md flex items-center justify-center text-sm font-medium transition-all duration-150 border";

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

  const getKeyWidth = (key: string) => {
    // Smaller keys for the number row to fit more
    if (KEYBOARD_ROWS[0].includes(key)) return "w-8";
    return "w-10";
  };

  const getKeyLabel = (key: string) => {
    const shiftMap: Record<string, string> = {
      "1": "!", "2": "@", "3": "#", "4": "$", "5": "%",
      "6": "^", "7": "&", "8": "*", "9": "(", "0": ")",
      "-": "_", "=": "+", "[": "{", "]": "}", "'": "\"", ";": ":"
    };
    if (shiftMap[key]) {
      return (
        <div className="flex flex-col items-center leading-none text-[10px]">
          <span>{shiftMap[key]}</span>
          <span>{key}</span>
        </div>
      );
    }
    return <span>{key.toUpperCase()}</span>;
  };

  // Row offsets for staggered keyboard look
  const rowOffsets = [0, 12, 20, 44];

  return (
    <div className="flex flex-col items-center gap-1.5">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex gap-1"
          style={{ paddingLeft: `${rowOffsets[rowIndex]}px` }}
        >
          {row.map((key) => (
            <div key={key} className={`${getKeyWidth(key)} ${getKeyClass(key)} relative`}>
              {getKeyLabel(key)}
              {HOME_ROW_KEYS.includes(key) && (
                <span className="absolute mt-6 w-1 h-0.5 rounded-full bg-muted-foreground/40" />
              )}
            </div>
          ))}
        </div>
      ))}
      {/* Bottom row with shifts and spacebar */}
      <div className="flex gap-1 items-center">
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
