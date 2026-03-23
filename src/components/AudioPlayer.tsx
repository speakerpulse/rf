import React, { useState, useRef } from 'react';
import { Play, Pause, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const closePlayer = (e: React.MouseEvent) => {
    e.stopPropagation(); // Zapobiega kliknięciu w główny przycisk
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
      <audio ref={audioRef} src="/background.mp3" loop preload="auto" />
      
      <motion.button 
        onClick={togglePlay} 
        layout
        className={`group flex items-center gap-3 bg-white/90 backdrop-blur-md border border-[#F0EFEA] rounded-full p-2 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-0.5 ${isPlaying ? 'pr-2' : 'pr-5'}`}
        aria-label="Odtwarzacz muzyki"
      >
        <motion.div layout className="w-10 h-10 flex items-center justify-center bg-[#F9F8F6] rounded-full text-[#2C2A28] group-hover:bg-[#EFECE6] transition-colors shrink-0">
          {isPlaying ? (
            <Pause size={16} strokeWidth={1.5} />
          ) : (
            <Play size={16} strokeWidth={1.5} className="ml-1" />
          )}
        </motion.div>
        
        <AnimatePresence>
          {!isPlaying && (
            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="flex flex-col items-start overflow-hidden whitespace-nowrap"
            >
              <span className="text-[10px] font-medium tracking-[0.15em] text-[#8A7E71] uppercase">
                Podkład do czytania
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <button
        onClick={closePlayer}
        className="w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-md border border-[#F0EFEA] rounded-full text-[#8A7E71] hover:text-[#2C2A28] hover:bg-[#F9F8F6] shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300"
        aria-label="Zamknij odtwarzacz"
      >
        <X size={14} strokeWidth={2} />
      </button>
    </div>
  );
}
