import React from 'react';
import { DetailAssetsCard } from '../cards/DetailAssetsCard';
import { DetailPerformanceCard } from '../cards/DetailPerformanceCard';
import { DetailLocationCard } from '../cards/DetailLocationCard';
import { DetailGenerationCard } from '../cards/DetailGenerationCard';
import { DetailInsightsChart } from '../charts/DetailInsightsChart';

export function InverterEfficiencyGrid({ data }) {
  return (
    <>
      {/* Assets Card */}
      <div className="col-span-1 lg:col-span-6 lg:row-span-1">
        <DetailAssetsCard data={data} />
      </div>

      {/* Performance Card */}
      <div className="col-span-1 lg:col-span-3 lg:row-span-1">
        <DetailPerformanceCard data={data} />
      </div>

      {/* Location Card */}
      <div className="col-span-1 lg:col-span-3 lg:row-span-1 h-[250px] lg:h-auto">
        <DetailLocationCard location={data.location} />
      </div>

      {/* Generation Card */}
      <div className="col-span-1 lg:col-span-3 lg:row-span-1 h-[230px] lg:h-auto">
        <DetailGenerationCard generation={data.generation} />
      </div>

      {/* Chart */}
      <div className="col-span-1 lg:col-span-9 lg:row-span-1 h-[340px] lg:h-auto">
        <div className="h-full bg-white/10 backdrop-blur-lg rounded-xl p-3">
          <div className="h-full w-full pt-2 pb-4 lg:pt-3 lg:pb-6">
            <div className="w-full lg:w-[120%] lg:-ml-[10%] xl:w-[160%] xl:-ml-[30%] 2xl:w-[110%] 2xl:-ml-[5%] transform scale-[0.85] lg:scale-[0.5] xl:scale-[0.62] 2xl:scale-[0.85] origin-top">
              <DetailInsightsChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
