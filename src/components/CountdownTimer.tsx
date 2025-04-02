
import React, { useEffect, useState, useRef } from 'react';

interface CountdownTimerProps {
  startFrom: number;
  onComplete: () => void;
}

const CountdownTimer = ({ startFrom, onComplete }: CountdownTimerProps) => {
  const [count, setCount] = useState(startFrom);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hasCompletedRef = useRef(false);
  
  // Reset the timer when it's mounted
  useEffect(() => {
    setCount(startFrom);
    hasCompletedRef.current = false;
    
    // Clear any existing timers when the component unmounts
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [startFrom]);
  
  // Handle the countdown logic
  useEffect(() => {
    // Prevent multiple completion calls
    if (count <= 0 && !hasCompletedRef.current) {
      hasCompletedRef.current = true;
      onComplete();
      return;
    }
    
    // Only set up timer if count is above 0
    if (count > 0) {
      timerRef.current = setTimeout(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
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
