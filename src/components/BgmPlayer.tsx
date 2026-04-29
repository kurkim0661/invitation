import { useEffect, useRef, useState } from 'react';

export default function BgmPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.3;

    // Try autoplay immediately
    const tryAutoplay = audio.play();
    if (tryAutoplay) {
      tryAutoplay.then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Browser blocked autoplay — play on first interaction
        const play = () => {
          audio.play().then(() => setIsPlaying(true));
        };
        window.addEventListener('click', play, { once: true });
        window.addEventListener('touchstart', play, { once: true });
        window.addEventListener('scroll', play, { once: true });
      });
    }
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true));
    }
  };

  return (
    <>
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}audio/bgm.mp3`} loop preload="auto" />
      <button
        onClick={togglePlay}
        className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-border shadow-md flex items-center justify-center transition-all hover:bg-white"
        aria-label={isPlaying ? '음악 끄기' : '음악 켜기'}
      >
        {isPlaying ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-light">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
      </button>
    </>
  );
}
