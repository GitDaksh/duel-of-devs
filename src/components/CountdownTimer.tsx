
import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  startFrom: number;
  onComplete: () => void;
}

const CountdownTimer = ({ startFrom, onComplete }: CountdownTimerProps) => {
  const [count, setCount] = useState(startFrom);
  
  useEffect(() => {
    if (count <= 0) {
      onComplete();
      return;
    }
    
    const timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [count, onComplete]);
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="countdown-number text-white">
        {count}
      </div>
    </div>
  );
};

export default CountdownTimer;
