"use client";

import { useGame } from "@/context/GameContext";
import { LEVELS } from "@/lib/levels";

export default function Header() {
  const { score, completedLevels, resetGame } = useGame();

  return (
    <header className="sticky top-0 z-50 h-[62px] flex items-center gap-4 px-[18px] border-b border-[var(--line)] bg-[rgba(9,13,26,0.78)] backdrop-blur-[14px]">
      <div className="flex items-center gap-[11px] font-bold text-[18px] tracking-[0.5px]">
        <div>
          GATEKEEPER.EXE
          <span className="block font-mono text-[10px] text-[var(--dim)] tracking-[2px] font-normal mt-[1px]">
            PLAY WITH THE AI · {LEVELS.length} LEVELS
          </span>
        </div>
      </div>
      
      <div className="flex-1" />
      
      <div className="flex items-center gap-[8px] font-mono text-[12.5px] border border-[var(--line)] rounded-full px-[14px] py-[7px] bg-[rgba(20,28,52,0.7)]">
        <span className="w-[7px] h-[7px] rounded-full bg-[var(--green)] shadow-[0_0_8px_var(--green)] animate-[blink_1.6s_infinite]" />
        SCORE <b className="text-[var(--amber)] text-[14px]">{score}</b>
      </div>
      
      <div className="flex items-center gap-[8px] font-mono text-[12.5px] border border-[var(--line)] rounded-full px-[14px] py-[7px] bg-[rgba(20,28,52,0.7)]">
        LEVELS <b className="text-[var(--green)] text-[14px]">{completedLevels.length}/{LEVELS.length}</b>
      </div>
      
      <button 
        onClick={resetGame}
        className="font-mono text-[12px] text-[var(--dim)] bg-transparent border border-[var(--line)] rounded-[10px] px-[13px] py-[8px] cursor-pointer transition duration-200 hover:text-[var(--red)] hover:border-[rgba(251,113,133,0.5)]"
      >
        ⟲ RESET
      </button>
    </header>
  );
}
