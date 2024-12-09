import React from 'react';
import { DetailInsightsCard } from './DetailInsightsCard';
import { getTodayAverageMegaWatts } from '../../util/radiationCalculator';

export function DetailGenerationCard({ generation, radiation }) {

  return (
    <DetailInsightsCard title="Today's Generation" className="h-full">
      <div className="h-full flex flex-col items-center justify-center -mt-6 sm:-mt-8 lg:mt-0 xl:-mt-8 2xl:-mt-8">
        <div className="relative w-28 sm:w-40 lg:w-28 xl:w-36 2xl:w-52 h-28 sm:h-40 lg:h-28 xl:h-36 2xl:h-52">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl sm:text-4xl lg:text-2xl xl:text-3xl 2xl:text-6xl font-semibold text-white text-center">
             { getTodayAverageMegaWatts(radiation) }
              <div className="text-sm sm:text-lg lg:text-sm xl:text-base 2xl:text-2xl text-white/60">MWh</div>
            </div>
          </div>
          <div className="absolute inset-0 border-8 sm:border-10 lg:border-8 xl:border-10 2xl:border-[14px] border-blue-400/30 rounded-full" />
          <div 
            className="absolute inset-0 border-8 sm:border-10 lg:border-8 xl:border-10 2xl:border-[14px] border-blue-400 rounded-full" 
            style={{ clipPath: 'inset(0 0 50% 0)' }} 
          />
        </div>
      </div>
    </DetailInsightsCard>
  );
}
