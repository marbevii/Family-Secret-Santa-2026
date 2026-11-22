
"use client";

import { useEffect, useRef } from "react";

export default function ChristmasMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.25;

    const startMusic = () => {
      if (!audio.paused) return;

      audio.play().catch(() => {
        // El navegador pot exigir una interacció.
      });
    };

    // Intentar iniciar la música en entrar.
    startMusic();

    // Si està bloquejada, iniciar-la amb la primera interacció.
    document.addEventListener("pointerdown", startMusic);
    document.addEventListener("keydown", startMusic);

    return () => {
      document.removeEventListener("pointerdown", startMusic);
      document.removeEventListener("keydown", startMusic);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/musica-nadal.mp3"
      autoPlay
      loop
      preload="auto"
    />
  );
}
