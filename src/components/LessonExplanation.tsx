import { BookOpen, Lightbulb } from "lucide-react";

interface LessonExplanationProps {
  explanation: string;
  tips: string[];
}

const LessonExplanation = ({ explanation, tips }: LessonExplanationProps) => {
  return (
    <div className="rounded-lg border border-border bg-card p-5 space-y-4">
      <div className="flex items-start gap-3">
        <BookOpen size={18} className="text-primary mt-0.5 shrink-0" />
        <p className="text-sm text-foreground leading-relaxed">{explanation}</p>
      </div>
      {tips.length > 0 && (
        <div className="flex flex-wrap gap-2 pl-[30px]">
          {tips.map((tip, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 rounded-md px-3 py-1.5"
            >
              <Lightbulb size={12} className="text-key-current shrink-0" />
              {tip}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LessonExplanation;
