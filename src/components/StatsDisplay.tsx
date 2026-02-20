import { Trophy, Target, Zap } from "lucide-react";

interface StatsDisplayProps {
  wpm: number | null;
  accuracy: number | null;
  isComplete: boolean;
  onNext: () => void;
  onRetry: () => void;
}

const StatsDisplay = ({ wpm, accuracy, isComplete, onNext, onRetry }: StatsDisplayProps) => {
  if (!isComplete || wpm === null || accuracy === null) return null;

  const passed = accuracy >= 80;

  return (
    <div className="rounded-lg border border-border bg-card p-6 glow-box">
      <div className="flex items-center gap-2 mb-4">
        <Trophy size={20} className={passed ? "text-primary" : "text-destructive"} />
        <h3 className="text-lg font-sans font-semibold text-foreground">
          {passed ? "Lesson Complete!" : "Keep Practicing"}
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
          <Zap size={18} className="text-primary" />
          <div>
            <div className="text-2xl font-bold text-foreground">{wpm}</div>
            <div className="text-xs text-muted-foreground">WPM</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
          <Target size={18} className={accuracy >= 80 ? "text-correct" : "text-destructive"} />
          <div>
            <div className="text-2xl font-bold text-foreground">{accuracy}%</div>
            <div className="text-xs text-muted-foreground">Accuracy</div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onRetry}
          className="flex-1 py-2.5 px-4 rounded-md border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          Try Again
        </button>
        {passed && (
          <button
            onClick={onNext}
            className="flex-1 py-2.5 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Next Lesson →
          </button>
        )}
      </div>

      {!passed && (
        <p className="mt-3 text-xs text-muted-foreground text-center">
          Score 80%+ accuracy to unlock the next lesson
        </p>
      )}
    </div>
  );
};

export default StatsDisplay;
