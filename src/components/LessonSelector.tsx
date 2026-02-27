import { lessons } from "@/data/lessons";
import { Check, Lock, ChevronRight } from "lucide-react";

interface LessonSelectorProps {
  currentDay: number;
  completedDays: number[];
  onSelect: (day: number) => void;
}

const LessonSelector = ({ currentDay, completedDays, onSelect }: LessonSelectorProps) => {
  const maxUnlocked = Math.max(1, ...completedDays.map((d) => d + 1));

  return (
    <div className="w-full">
      <h2 className="text-lg font-sans font-semibold text-foreground mb-4">Course Lessons</h2>
      <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-2">
        {lessons.map((lesson) => {
          const isCompleted = completedDays.includes(lesson.day);
          const isLocked = lesson.day > maxUnlocked;
          const isActive = lesson.day === currentDay;

          return (
            <button
              key={lesson.day}
              onClick={() => !isLocked && onSelect(lesson.day)}
              disabled={isLocked}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 border ${
                isActive
                  ? "bg-primary/10 border-primary/30 text-foreground glow-box"
                  : isCompleted
                  ? "bg-card border-border hover:border-primary/20 text-foreground"
                  : isLocked
                  ? "bg-muted/30 border-transparent text-muted-foreground cursor-not-allowed opacity-50"
                  : "bg-card border-border hover:border-primary/20 text-foreground cursor-pointer"
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                isCompleted
                  ? "bg-correct/20 text-correct"
                  : isActive
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}>
                {isCompleted ? <Check size={14} /> : isLocked ? <Lock size={12} /> : lesson.day}
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">
                  Day {lesson.day}: {lesson.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {lesson.newKeys.length > 0 ? (
                    <>New: <span className="text-key-current">{lesson.newKeys.join(", ").toUpperCase()}</span></>
                  ) : (
                    <span className="text-muted-foreground">Review</span>
                  )}
                </div>
              </div>

              {isActive && <ChevronRight size={16} className="text-primary shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LessonSelector;
