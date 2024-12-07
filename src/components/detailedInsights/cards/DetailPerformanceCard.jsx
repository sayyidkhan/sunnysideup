import React from 'react';
import { DetailInsightsCard } from '../shared/DetailInsightsCard';
import { MetricDisplay } from '../shared/MetricDisplay';

export function DetailPerformanceCard({ data }) {
  return (
    <DetailInsightsCard title="Today's Performance" className="h-full">
      <div className="grid grid-rows-2 gap-4 p-4">
        <MetricDisplay 
          label="Performance Ratio" 
          value={data.performanceRatio} 
          unit="%"
        />
        <MetricDisplay 
          label="Inverter Efficiency" 
          value={data.inverterEfficiency} 
          unit="%"
        />
      </div>
    </DetailInsightsCard>
  );
}
