"use client";

import { useGame } from "@/context/GameContext";
import { LEVELS } from "@/lib/levels";
import { useState, useEffect } from "react";

const HINT_COSTS = [10, 15, 20];

export default function HintPanel({ levelId }: { levelId: number }) {
  const { score, completedLevels, hintsUsed, useHint, stats } = useGame();
  const [levelData, setLevelData] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/levels/${levelId}`)
      .then(res => res.json())
      .then(data => {
        if (data) setLevelData(data);
      })
      .catch(err => console.error("Failed to load level data:", err));
  }, [levelId]);

  if (!levelData || !levelData.hints) return null;

  const staticLevel = LEVELS.find(l => l.id === levelId);
  const hintsRevealed = hintsUsed[levelId] || 0;
  const accuracy = stats.guesses > 0 ? Math.round((stats.correct / stats.guesses) * 100) : "—";

  return (
    <aside className="bg-[linear-gradient(180deg,rgba(19,27,50,0.9),rgba(11,16,32,0.94))] border border-[var(--line)] rounded-[18px] overflow-y-auto flex flex-col shadow-[0_12px_40px_rgba(0,0,0,0.35)] w-[332px] shrink-0">
      <div className="flex items-center gap-[9px] p-[14px_16px] border-b border-[var(--line)] font-mono text-[11px] tracking-[2.5px] text-[var(--dim)] shrink-0">
        <span className="w-[20px] h-[20px] rounded-[6px] grid place-items-center text-[10px] font-bold text-[#06101e] bg-[var(--amber)]">
          3
        </span>
        HINTS
        <span className="ml-auto text-[var(--dim2)]">USE WISELY</span>
      </div>

      <div className="p-[14px] flex flex-col gap-[13px]">
        {/* Persona Card */}
        <div className="border border-[var(--line)] rounded-[14px] bg-[rgba(16,23,44,0.6)] p-[14px] flex gap-[13px] items-center">

          <div>
            <h3 className="text-[15px] font-bold">GATEKEEPER</h3>
            <div className="font-mono text-[10px] text-[var(--dim)] tracking-[1.5px] mt-[2px]">
              LEVEL 0{levelId} · {staticLevel?.codename.toUpperCase()}
            </div>
            <div className="font-mono text-[10.5px] text-[var(--amber)] mt-[5px]">
              ★ REWARD: +{staticLevel?.baseScore || 100} PTS
            </div>
          </div>
        </div>

        <div className="flex items-center gap-[8px] mt-[2px] font-mono text-[10px] tracking-[2.5px] text-[var(--dim)] after:content-[''] after:flex-1 after:h-[1px] after:bg-[var(--line)]">
          💡 HINTS — EACH COSTS POINTS
        </div>

        <div className="border border-[var(--line)] rounded-[14px] bg-[rgba(16,23,44,0.6)] p-[14px] flex flex-col gap-[9px]">
          {levelData.hints.map((hint: string, i: number) => {
            const isRevealed = i < hintsRevealed;
            const cost = HINT_COSTS[i] || 10;
            
            return (
              <div key={i} className="border border-[var(--line)] rounded-[12px] overflow-hidden bg-[rgba(14,20,38,0.7)] transition duration-200">
                {isRevealed ? (
                  <div className="p-[12px_14px] text-[12.5px] leading-[1.6] text-[#fde9b8] font-mono border-l-[3px] border-[var(--amber)] bg-[rgba(251,191,36,0.06)] animate-[msgIn_0.35s]">
                    <span className="block text-[9.5px] tracking-[2px] text-[var(--amber)] mb-[5px]">
                      HINT {i + 1} · UNLOCKED
                    </span>
                    {hint}
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      if (score >= cost) {
                        useHint(levelId, cost);
                      } else {
                        alert("Not enough points!");
                      }
                    }}
                    disabled={score < cost}
                    className="w-full flex items-center gap-[10px] p-[12px_14px] cursor-pointer bg-transparent border-none text-[var(--text)] font-sans text-[12.5px] text-left transition duration-200 hover:bg-[rgba(251,191,36,0.07)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="text-[15px]">🔒</span>
                    Reveal Hint {i + 1}
                    <span className="ml-auto font-mono text-[10.5px] text-[var(--amber)] border border-[rgba(251,191,36,0.35)] rounded-[6px] p-[2px_8px] whitespace-nowrap">
                      −{cost} pts
                    </span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-[8px] mt-[2px] font-mono text-[10px] tracking-[2.5px] text-[var(--dim)] after:content-[''] after:flex-1 after:h-[1px] after:bg-[var(--line)]">
          📊 SESSION STATS
        </div>

        <div className="grid grid-cols-2 gap-[9px]">
          <div className="border border-[var(--line)] rounded-[11px] p-[10px_12px] bg-[rgba(13,19,38,0.7)]">
            <div className="font-mono text-[19px] font-bold text-[var(--amber)]">{score}</div>
            <div className="font-mono text-[9px] tracking-[1.8px] text-[var(--dim2)] mt-[3px]">SCORE</div>
          </div>
          <div className="border border-[var(--line)] rounded-[11px] p-[10px_12px] bg-[rgba(13,19,38,0.7)]">
            <div className="font-mono text-[19px] font-bold text-[var(--green)]">{completedLevels.length}/{LEVELS.length}</div>
            <div className="font-mono text-[9px] tracking-[1.8px] text-[var(--dim2)] mt-[3px]">LEVELS BEATEN</div>
          </div>
          <div className="border border-[var(--line)] rounded-[11px] p-[10px_12px] bg-[rgba(13,19,38,0.7)]">
            <div className="font-mono text-[19px] font-bold text-[var(--violet)]">{Object.values(hintsUsed).reduce((a, b) => a + b, 0)}</div>
            <div className="font-mono text-[9px] tracking-[1.8px] text-[var(--dim2)] mt-[3px]">HINTS USED</div>
          </div>
          <div className="border border-[var(--line)] rounded-[11px] p-[10px_12px] bg-[rgba(13,19,38,0.7)]">
            <div className="font-mono text-[19px] font-bold text-[var(--cyan)]">{accuracy}{typeof accuracy === 'number' ? '%' : ''}</div>
            <div className="font-mono text-[9px] tracking-[1.8px] text-[var(--dim2)] mt-[3px]">GUESS ACCURACY</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
