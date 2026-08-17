"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type LevelStats = {
  guesses: number;
  correct: number;
};

interface GameState {
  score: number;
  unlockedLevels: number;
  completedLevels: number[];
  stats: LevelStats;
  hintsUsed: Record<number, number>; // levelId -> number of hints used
  addScore: (points: number) => void;
  deductScore: (points: number) => void;
  unlockLevel: (levelId: number) => void;
  completeLevel: (levelId: number) => void;
  addGuess: (correct: boolean) => void;
  useHint: (levelId: number, cost: number) => void;
  resetGame: () => void;
}

const defaultState: GameState = {
  score: 0,
  unlockedLevels: 1,
  completedLevels: [],
  stats: { guesses: 0, correct: 0 },
  hintsUsed: {},
  addScore: () => {},
  deductScore: () => {},
  unlockLevel: () => {},
  completeLevel: () => {},
  addGuess: () => {},
  useHint: () => {},
  resetGame: () => {},
};

const GameContext = createContext<GameState>(defaultState);

export const useGame = () => useContext(GameContext);

const SAVE_KEY = "gatekeeper_save_v2";

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [score, setScore] = useState(0);
  const [unlockedLevels, setUnlockedLevels] = useState(1);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [stats, setStats] = useState<LevelStats>({ guesses: 0, correct: 0 });
  const [hintsUsed, setHintsUsed] = useState<Record<number, number>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(SAVE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.score === "number") {
          setScore(parsed.score);
          setUnlockedLevels(parsed.unlockedLevels || 1);
          setCompletedLevels(parsed.completedLevels || []);
          setStats(parsed.stats || { guesses: 0, correct: 0 });
          setHintsUsed(parsed.hintsUsed || {});
        }
      }
    } catch (e) {
      console.error("Failed to load save", e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(
        SAVE_KEY,
        JSON.stringify({ score, unlockedLevels, completedLevels, stats, hintsUsed })
      );
    } catch (e) {
      console.error("Failed to save", e);
    }
  }, [score, unlockedLevels, completedLevels, stats, hintsUsed, isLoaded]);

  const addScore = (points: number) => setScore((prev) => prev + points);
  const deductScore = (points: number) => setScore((prev) => Math.max(0, prev - points));
  
  const unlockLevel = (levelId: number) => {
    setUnlockedLevels((prev) => Math.max(prev, levelId));
  };

  const completeLevel = (levelId: number) => {
    if (!completedLevels.includes(levelId)) {
      setCompletedLevels((prev) => [...prev, levelId]);
    }
  };

  const addGuess = (correct: boolean) => {
    setStats((prev) => ({
      guesses: prev.guesses + 1,
      correct: prev.correct + (correct ? 1 : 0),
    }));
  };

  const useHint = (levelId: number, cost: number) => {
    setHintsUsed((prev) => ({
      ...prev,
      [levelId]: (prev[levelId] || 0) + 1,
    }));
    deductScore(cost);
  };

  const resetGame = () => {
    if (confirm("Reset all progress, score and unlocked vaults?")) {
      localStorage.removeItem(SAVE_KEY);
      window.location.reload();
    }
  };

  return (
    <GameContext.Provider
      value={{
        score,
        unlockedLevels,
        completedLevels,
        stats,
        hintsUsed,
        addScore,
        deductScore,
        unlockLevel,
        completeLevel,
        addGuess,
        useHint,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
