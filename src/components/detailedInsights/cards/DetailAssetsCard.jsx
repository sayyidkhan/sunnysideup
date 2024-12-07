import React from 'react';
import { Card } from '../shared/Card';
import { MetricDisplay } from '../shared/MetricDisplay';

export function DetailAssetsCard({ data }) {
  return (
    <Card title="Assets" className="h-full">
      <div className="grid grid-cols-2 gap-4 p-4">
        <MetricDisplay 
          label="Capacity" 
          value={data.capacity} 
          unit="MWp"
        />
        <MetricDisplay 
          label="Irradiance" 
          value={data.irradiance} 
          unit="kW/m²"
        />
        <MetricDisplay 
          label="Plant Matrix" 
          value={data.plantMatrix} 
          topSubtitle="INV X SCB"
        />
        <MetricDisplay 
          label="Days Online" 
          value={data.daysOnline}
          unit="Days"
        />
      </div>
    </Card>
  );
}