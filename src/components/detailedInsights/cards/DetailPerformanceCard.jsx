import React from 'react';
import { DetailInsightsCard } from './DetailInsightsCard';
import { MetricDisplay } from './MetricDisplay';

// Default values
const DEFAULT_DATA = {
  performanceRatio: 79.46,
  inverterEfficiency: 97.78
};

export function DetailPerformanceCard() {
  return (
    <DetailInsightsCard title="Today's Performance" className="h-full">
      <div className="grid grid-rows-2 gap-4 p-4">
        <MetricDisplay 
          label="Performance Ratio" 
          value={79.46} 
          unit="%"
        />
        <MetricDisplay 
          label="Inverter Efficiency" 
          value={97.78} 
          unit="%"
        />
      </div>
    </DetailInsightsCard>
  );
}
