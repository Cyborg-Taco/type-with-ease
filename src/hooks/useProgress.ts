import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

const LOCAL_KEY = "typeflow_progress";

interface Progress {
  currentDay: number;
  completedDays: number[];
}

function loadLocal(): Progress {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { currentDay: 1, completedDays: [] };
}

function saveLocal(p: Progress) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(p));
}

export function useProgress(user: User | null) {
  const [currentDay, setCurrentDay] = useState(1);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load progress on mount / user change
  useEffect(() => {
    if (user) {
      supabase
        .from("user_progress")
        .select("current_day, completed_days")
        .eq("user_id", user.id)
        .maybeSingle()
        .then(({ data }) => {
          if (data) {
            setCurrentDay(data.current_day);
            setCompletedDays(data.completed_days);
          } else {
            // Migrate local progress to DB
            const local = loadLocal();
            setCurrentDay(local.currentDay);
            setCompletedDays(local.completedDays);
            supabase.from("user_progress").insert({
              user_id: user.id,
              current_day: local.currentDay,
              completed_days: local.completedDays,
            });
          }
          setLoaded(true);
        });
    } else {
      const local = loadLocal();
      setCurrentDay(local.currentDay);
      setCompletedDays(local.completedDays);
      setLoaded(true);
    }
  }, [user]);

  // Persist changes
  const persist = useCallback(
    (day: number, completed: number[]) => {
      if (user) {
        supabase
          .from("user_progress")
          .update({ current_day: day, completed_days: completed, updated_at: new Date().toISOString() })
          .eq("user_id", user.id)
          .then();
      }
      saveLocal({ currentDay: day, completedDays: completed });
    },
    [user]
  );

  const updateCurrentDay = useCallback(
    (day: number) => {
      setCurrentDay(day);
      setCompletedDays((prev) => {
        persist(day, prev);
        return prev;
      });
    },
    [persist]
  );

  const addCompletedDay = useCallback(
    (day: number) => {
      setCompletedDays((prev) => {
        if (prev.includes(day)) return prev;
        const next = [...prev, day];
        persist(currentDay, next);
        return next;
      });
    },
    [persist, currentDay]
  );

  return { currentDay, completedDays, updateCurrentDay, addCompletedDay, loaded };
}
