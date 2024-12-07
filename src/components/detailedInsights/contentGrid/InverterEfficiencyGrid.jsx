import React from 'react';
import { DetailAssetsCard } from '../cards/DetailAssetsCard';
import { DetailPerformanceCard } from '../cards/DetailPerformanceCard';
import { DetailLocationCard } from '../cards/DetailLocationCard';
import { DetailGenerationCard } from '../cards/DetailGenerationCard';
import { DetailInsightsChart } from '../charts/DetailInsightsChart';

export function InverterEfficiencyGrid({ data }) {
  return (
    <>
      {/* Top Row (web view) */}
      <div className="sm:col-span-2 md:col-span-6 md:row-span-1">
        <DetailAssetsCard data={data} />
      </div>

      <div className="sm:col-span-1 md:col-span-3 md:row-span-1">
        <DetailPerformanceCard data={data} />
      </div>

      <div className="sm:col-span-1 md:col-span-3 md:row-span-1 h-[250px] md:h-auto">
        <DetailLocationCard location={data.location} />
      </div>

      {/* Bottom Row (web view) */}
      <div className="sm:col-span-1 md:col-span-3 md:row-span-1 h-[230px] md:h-auto">
        <DetailGenerationCard generation={data.generation} />
      </div>

      <div className="sm:col-span-2 md:col-span-9 md:row-span-1 h-[340px] md:h-auto">
        <div className="h-full bg-white/10 backdrop-blur-lg rounded-xl p-3">
          <div className="h-full w-full pt-2 pb-4 md:pt-3 md:pb-6">
            <div className="w-full md:w-[120%] md:-ml-[10%] xl:w-[160%] xl:-ml-[30%] 2xl:w-[110%] 2xl:-ml-[5%] transform scale-[0.85] sm:scale-[0.45] md:scale-[0.45] lg:scale-[0.5] xl:scale-[0.62] 2xl:scale-[0.85] origin-top">
              <DetailInsightsChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
