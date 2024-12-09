import React from 'react';
import { BiWorld } from 'react-icons/bi';

export function LoadingGlobe() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-3">
      <BiWorld className="w-8 h-8 text-white animate-spin" />
      <div className="text-sm text-white font-bold">Loading Map...</div>
    </div>
  );
}
