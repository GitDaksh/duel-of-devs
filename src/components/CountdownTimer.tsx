
import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  startFrom: number;
  onComplete: () => void;
}

const CountdownTimer = ({ startFrom, onComplete }: CountdownTimerProps) => {
  const [count, setCount] = useState(startFrom);
  
  useEffect(() => {
    // Set up the interval that runs every second
    const intervalId = setInterval(() => {
      setCount(prevCount => {
        // If we've reached 0, clear the interval and call onComplete
        if (prevCount <= 1) {
          clearInterval(intervalId);
          // Use setTimeout to ensure state updates before calling onComplete
          setTimeout(() => {
            onComplete();
          }, 0);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
    
    // Clean up interval on unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [onComplete]); // Only re-run if onComplete changes
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="text-white text-8xl font-bold">
        {count}
      </div>
    </div>
  );
};

export default CountdownTimer;
