// src/hooks/useSafePusher.ts
import { useState, useEffect } from 'react';
import { usePusher } from '../context/PusherContext';

export const useSafePusher = () => {
  const [pusherConnected, setPusherConnected] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let retryCount = 0;
    const maxRetries = 3;

    const attemptConnection = () => {
      try {
        const { connected } = usePusher();
        if (isMounted) {
          setPusherConnected(connected);
          setIsReady(true);
          console.log('✅ Safe Pusher connected');
        }
      } catch (error) {
        if (retryCount < maxRetries && isMounted) {
          retryCount++;
          console.log(`⏳ Pusher retry attempt ${retryCount}/${maxRetries}...`);
          setTimeout(attemptConnection, 1000 * retryCount);
        } else {
          console.log('❌ Pusher failed after retries');
          if (isMounted) {
            setIsReady(true); // Still mark as ready to show UI
          }
        }
      }
    };

    // Small delay to ensure providers are mounted
    const timer = setTimeout(attemptConnection, 100);
    
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  return { pusherConnected, isReady };
};