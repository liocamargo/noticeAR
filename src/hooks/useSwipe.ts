'use client';

import { useState, useRef } from 'react';

export interface SwipeState {
  x: number;
  isDragging: boolean;
}

export function useSwipe(onSwipe: (direction: 'left' | 'right' | null) => void) {
  const [state, setState] = useState<SwipeState>({ x: 0, isDragging: false });
  const startXRef = useRef<number>(0);
  const THRESHOLD = 100;

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    startXRef.current = e.clientX;
    setState({ x: 0, isDragging: true });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!state.isDragging) return;

    const delta = e.clientX - startXRef.current;
    setState({ x: delta, isDragging: true });
  };

  const handleMouseUp = () => {
    if (!state.isDragging) return;

    setState({ x: 0, isDragging: false });

    if (state.x > THRESHOLD) {
      onSwipe('right');
    } else if (state.x < -THRESHOLD) {
      onSwipe('left');
    } else {
      onSwipe(null);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startXRef.current = e.touches[0].clientX;
    setState({ x: 0, isDragging: true });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!state.isDragging) return;

    const delta = e.touches[0].clientX - startXRef.current;
    setState({ x: delta, isDragging: true });
  };

  const handleTouchEnd = () => {
    if (!state.isDragging) return;

    setState({ x: 0, isDragging: false });

    if (state.x > THRESHOLD) {
      onSwipe('right');
    } else if (state.x < -THRESHOLD) {
      onSwipe('left');
    } else {
      onSwipe(null);
    }
  };

  return {
    state,
    handlers: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseUp,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  };
}
