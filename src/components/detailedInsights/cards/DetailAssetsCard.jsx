import React from 'react';
import { DetailInsightsCard } from './DetailInsightsCard';
import { MetricDisplay } from './MetricDisplay';

// Default values
const DEFAULT_DATA = {
  capacity: 97,
  irradiance: 345.9,
  plantMatrix: '28 x 24',
  daysOnline: 2394
};

export function DetailAssetsCard({ data = DEFAULT_DATA }) {
  return (
    <DetailInsightsCard title="Assets" className="h-full">
      <div className="grid grid-cols-2 gap-4 p-4">
        <MetricDisplay 
          label="Capacity" 
          value={97} 
          unit="MWp"
        />
        <MetricDisplay 
          label="Irradiance" 
          value={345.9} 
          unit="kW/m²"
        />
        <MetricDisplay 
          label="Plant Matrix" 
          value="28 x 24" 
          topSubtitle="INV X SCB"
        />
        <MetricDisplay 
          label="Days Online" 
          value={2394}
          unit="Days"
        />
      </div>
    </DetailInsightsCard>
  );
}
