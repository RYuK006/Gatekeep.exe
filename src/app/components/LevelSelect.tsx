"use client";

import { useGame } from "@/context/GameContext";
import { LEVELS } from "@/lib/levels";

export default function LevelSelect({
  currentLevelId,
  onSelectLevel,
}: {
  currentLevelId: number;
  onSelectLevel: (id: number) => void;
}) {
  const { unlockedLevels, completedLevels } = useGame();

  return (
    <section className="bg-[linear-gradient(180deg,rgba(19,27,50,0.9),rgba(11,16,32,0.94))] border border-[var(--line)] rounded-[18px] overflow-hidden flex flex-col min-h-0 shadow-[0_12px_40px_rgba(0,0,0,0.35)] w-[272px] shrink-0">
      <div className="flex items-center gap-[9px] p-[14px_16px] border-b border-[var(--line)] font-mono text-[11px] tracking-[2.5px] text-[var(--dim)] shrink-0">
        <span className="w-[20px] h-[20px] rounded-[6px] grid place-items-center text-[10px] font-bold text-[#06101e] bg-[var(--cyan)]">
          1
        </span>
        LEVELS
        <span className="ml-auto text-[var(--dim2)]">SELECT LEVEL</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-[12px] flex flex-col gap-[10px]">
        {LEVELS.map((level, i) => {
          const isLocked = level.id > unlockedLevels;
          const isCompleted = completedLevels.includes(level.id);
          const isActive = level.id === currentLevelId;

          return (
            <div
              key={level.id}
              onClick={() => {
                if (!isLocked) onSelectLevel(level.id);
              }}
              className={`relative border rounded-[14px] p-[13px_13px_13px_15px] cursor-pointer transition duration-220 overflow-hidden
                ${isLocked 
                  ? "opacity-45 cursor-not-allowed grayscale-[0.6] border-[var(--line)] bg-[rgba(17,24,44,0.6)]" 
                  : isActive
                    ? "border-[color-mix(in_srgb,var(--cyan)_55%,transparent)] bg-[linear-gradient(135deg,color-mix(in_srgb,var(--cyan)_12%,transparent),rgba(17,24,44,0.7))] shadow-[0_0_24px_color-mix(in_srgb,var(--cyan)_22%,transparent)]"
                    : "border-[var(--line)] bg-[rgba(17,24,44,0.6)] hover:translate-x-[4px] hover:border-[var(--line2)] hover:bg-[rgba(24,33,60,0.8)]"}
              `}
            >
              {/* Left Accent Bar */}
              <div 
                className={`absolute left-0 top-0 bottom-0 w-[3px] opacity-90 transition duration-200 ${isActive ? 'bg-[var(--cyan)]' : 'bg-[#26304f]'}`}
              />
              
              <div className="flex items-center gap-[10px]">
                <span className={`font-mono text-[11px] font-bold rounded-[7px] p-[3px_7px] shrink-0 border 
                  ${isActive ? 'text-[var(--cyan)] border-[color-mix(in_srgb,var(--cyan)_45%,transparent)]' : 'text-[var(--dim)] border-transparent'}`}>
                  0{i + 1}
                </span>
                <span className="font-bold text-[14px] leading-[1.2]">
                  {level.codename}
                </span>
              </div>
              
              <div className="flex items-center justify-between mt-[9px]">
                <span className="font-mono text-[10px] text-[var(--dim)] tracking-[1px]">
                  + {level.baseScore || 100} PTS
                </span>
                {isLocked ? (
                  <span className="text-[13px]">🔒</span>
                ) : isCompleted ? (
                  <span className="font-mono text-[9.5px] text-[var(--green)] border border-[rgba(52,211,153,0.4)] rounded-[6px] p-[2px_7px] tracking-[1px]">
                    CLEARED
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="p-[12px_16px] border-t border-[var(--line)] font-mono text-[10.5px] text-[var(--dim2)] tracking-[1px] text-center">
        BEAT A LEVEL TO UNLOCK THE NEXT
      </div>
    </section>
  );
}
