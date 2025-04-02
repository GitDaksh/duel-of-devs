
import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  startFrom: number;
  onComplete: () => void;
}

const CountdownTimer = ({ startFrom, onComplete }: CountdownTimerProps) => {
  const [count, setCount] = useState(startFrom);
  
  useEffect(() => {
    // Initialize count to startFrom only on first render
    setCount(startFrom);
  }, [startFrom]);
  
  useEffect(() => {
    // Only proceed if count is valid
    if (count === undefined || count === null) return;
    
    // If countdown reaches zero, call onComplete and exit
    if (count <= 0) {
      onComplete();
      return;
    }
    
    // Set up the countdown timer
    const timer = setTimeout(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);
    
    // Cleanup function to clear timer
    return () => clearTimeout(timer);
  }, [count, onComplete]);
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="countdown-number text-white text-8xl font-bold animate-pulse">
        {count}
      </div>
    </div>
  );
};

export default CountdownTimer;
