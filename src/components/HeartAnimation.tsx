import React, { useState, useEffect } from 'react';

interface Heart {
  id: string;
  left: number;
  top: number;
  delay: number;
}

export const HeartAnimation: React.FC = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const handleHeartClick = () => {
      const newHearts: Heart[] = [];
      const heartCount = 8;

      for (let i = 0; i < heartCount; i++) {
        const angle = (i / heartCount) * Math.PI * 2;
        const distance = 100;
        
        newHearts.push({
          id: `${Date.now()}-${i}`,
          left: 50 + Math.cos(angle) * distance,
          top: 50 + Math.sin(angle) * distance,
          delay: i * 0.1,
        });
      }

      setHearts((prev) => [...prev, ...newHearts]);

      // Remove hearts after animation completes
      setTimeout(() => {
        setHearts((prev) => 
          prev.filter((h) => !newHearts.some((nh) => nh.id === h.id))
        );
      }, 2000);
    };

    window.addEventListener('heart-click', handleHeartClick);
    return () => window.removeEventListener('heart-click', handleHeartClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-heart-burst"
          style={{
            left: `${heart.left}%`,
            top: `${heart.top}%`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          <svg
            className="w-12 h-12 text-rose-500 drop-shadow-lg animate-heart-blink"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
      ))}
    </div>
  );
};
