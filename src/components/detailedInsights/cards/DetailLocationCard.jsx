import React from 'react';
import { DetailInsightsCard } from './DetailInsightsCard';
import { MiniMap } from '../charts/MiniMap';

export function DetailLocationCard({ location }) {
  return (
    <DetailInsightsCard title="" className="h-full relative p-0">
      <div className="h-full w-full">
        <MiniMap location={location} />
        <div className="absolute bottom-3 left-3 z-[400] flex flex-col gap-1">
          <div className="text-sm font-medium text-white bg-gray-800/30 backdrop-blur-sm px-3 py-1 rounded-lg w-fit">Location</div>
          <div className="text-sm font-medium text-white bg-gray-800/30 backdrop-blur-sm px-3 py-1 rounded-lg">
            {location?.lat?.toFixed(2)} N {location?.long?.toFixed(2)} E
          </div>
        </div>
      </div>
    </DetailInsightsCard>
  );
}
