"use client";

import { useEffect, useState } from "react";
import FallbackScreen from "./components/FallbackScreen";
import LevelSelect from "./components/LevelSelect";
import Terminal from "./components/Terminal";
import HintPanel from "./components/HintPanel";
import Header from "./components/Header";

export default function Home() {
  const [isSupported, setIsSupported] = useState<boolean | null>(null);
  const [currentLevelId, setCurrentLevelId] = useState(1);

  useEffect(() => {
    // Check if LanguageModel API exists
    const checkSupport = async () => {
      let aiInterface = null;
      if ('LanguageModel' in self) {
        aiInterface = (self as any).LanguageModel;
      } else if ('ai' in self && 'languageModel' in (self as any).ai) {
        aiInterface = (self as any).ai.languageModel;
      }

      if (aiInterface) {
        try {
          const availability = await aiInterface.availability();
          if (availability !== 'no') {
            setIsSupported(true);
            return;
          }
        } catch (e) {
          console.error("LanguageModel check failed:", e);
        }
      }
      
      // Bypass strict check for testing
      setIsSupported(true);
    };
    
    checkSupport();
  }, []);

  if (isSupported === null) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[var(--bg)]">
        <div className="text-[var(--cyan)] font-mono animate-pulse uppercase tracking-widest text-sm">
          Establishing Uplink...
        </div>
      </div>
    );
  }

  if (!isSupported) {
    return <FallbackScreen />;
  }

  return (
    <>
      <Header />
      <main className="grid grid-cols-[272px_minmax(0,1fr)_332px] gap-[14px] p-[14px] h-[calc(100dvh-62px)] [grid-template-areas:'levels_chat_side'] max-[1180px]:grid-cols-[238px_minmax(0,1fr)] max-[1180px]:[grid-template-areas:'levels_chat'_'side_side'] max-[820px]:grid-cols-1 max-[820px]:[grid-template-areas:'levels'_'chat'_'side']">
        <LevelSelect 
          currentLevelId={currentLevelId} 
          onSelectLevel={setCurrentLevelId}
        />
        <Terminal 
          levelId={currentLevelId} 
          onComplete={() => {}}
        />
        <HintPanel levelId={currentLevelId} />
      </main>
    </>
  );
}
