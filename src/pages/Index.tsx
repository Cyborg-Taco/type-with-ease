import { useState, useCallback } from "react";
import { lessons } from "@/data/lessons";
import KeyboardVisual from "@/components/KeyboardVisual";
import TypingArea from "@/components/TypingArea";
import LessonSelector from "@/components/LessonSelector";
import StatsDisplay from "@/components/StatsDisplay";
import { Keyboard } from "lucide-react";

const Index = () => {
  const [currentDay, setCurrentDay] = useState(1);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [result, setResult] = useState<{ wpm: number; accuracy: number } | null>(null);

  const lesson = lessons.find((l) => l.day === currentDay) || lessons[0];

  const allLearnedKeys = lessons
    .filter((l) => l.day <= currentDay)
    .flatMap((l) => l.allKeys);

  const handleComplete = useCallback((wpm: number, accuracy: number) => {
    setResult({ wpm, accuracy });
    if (accuracy >= 80 && !completedDays.includes(currentDay)) {
      setCompletedDays((prev) => [...prev, currentDay]);
    }
  }, [currentDay, completedDays]);

  const handleNext = () => {
    const nextDay = Math.min(currentDay + 1, lessons.length);
    setCurrentDay(nextDay);
    setResult(null);
  };

  const handleRetry = () => {
    setResult(null);
  };

  const handleSelectLesson = (day: number) => {
    setCurrentDay(day);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <Keyboard size={24} className="text-primary" />
          <h1 className="text-xl font-sans font-bold text-foreground">
            Type<span className="text-primary glow-green">Flow</span>
          </h1>
          <span className="ml-auto text-sm text-muted-foreground">
            {completedDays.length}/{lessons.length} lessons completed
          </span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="order-2 lg:order-1">
            <LessonSelector
              currentDay={currentDay}
              completedDays={completedDays}
              onSelect={handleSelectLesson}
            />
          </aside>

          {/* Main content */}
          <main className="order-1 lg:order-2 space-y-8">
            {/* Lesson header */}
            <div>
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-sm text-primary font-medium">Day {lesson.day}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{lesson.title}</span>
              </div>
              <h2 className="text-2xl font-sans font-bold text-foreground">
                New keys: <span className="text-key-current">{lesson.newKeys.map((k) => k.toUpperCase()).join(", ")}</span>
              </h2>
            </div>

            {/* Typing area */}
            <TypingArea
              text={lesson.paragraph}
              onComplete={handleComplete}
              onActiveKey={setActiveKey}
              isActive={!result}
            />

            {/* Results */}
            <StatsDisplay
              wpm={result?.wpm ?? null}
              accuracy={result?.accuracy ?? null}
              isComplete={!!result}
              onNext={handleNext}
              onRetry={handleRetry}
            />

            {/* Keyboard */}
            <div className="flex flex-col items-center gap-3 pt-4">
              <p className="text-xs text-muted-foreground font-sans">Keyboard</p>
              <KeyboardVisual
                learnedKeys={allLearnedKeys}
                currentNewKeys={lesson.newKeys}
                activeKey={activeKey}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
