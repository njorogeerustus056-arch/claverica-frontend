// src/hooks/useSafePusher.ts - CORRECTED VERSION
import { useState, useEffect } from 'react';
import { usePusher } from '../context/PusherContext';

export const useSafePusher = () => {
  const [pusherConnected, setPusherConnected] = useState(false);
  const [isReady, setIsReady] = useState(false);
  
  // ✅ Call hook at top level - ALWAYS
  let pusher;
  try {
    pusher = usePusher();
  } catch (error) {
    // Context might not be available yet
    pusher = { connected: false };
  }

  useEffect(() => {
    let isMounted = true;
    let retryCount = 0;
    const maxRetries = 3;

    const attemptConnection = () => {
      try {
        if (isMounted) {
          setPusherConnected(pusher?.connected || false);
          setIsReady(true);
          if (pusher?.connected) {
            console.log('✅ Safe Pusher connected');
          }
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
  }, [pusher?.connected]); // ✅ Add dependency

  return { pusherConnected, isReady };
};