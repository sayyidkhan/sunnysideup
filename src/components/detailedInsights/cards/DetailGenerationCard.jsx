import React from 'react';
import { DetailInsightsCard } from '../shared/DetailInsightsCard';

export function DetailGenerationCard({ generation }) {
  return (
    <DetailInsightsCard title="Today's Generation" className="h-full">
      <div className="h-full flex items-center justify-center">
        <div className="relative w-28 h-28">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl font-semibold text-white text-center">
              {generation}
              <div className="text-sm text-white/60">MWh</div>
            </div>
          </div>
          <div className="absolute inset-0 border-8 border-blue-400/30 rounded-full" />
          <div 
            className="absolute inset-0 border-8 border-blue-400 rounded-full" 
            style={{ clipPath: 'inset(0 0 50% 0)' }} 
          />
        </div>
      </div>
    </DetailInsightsCard>
  );
}
