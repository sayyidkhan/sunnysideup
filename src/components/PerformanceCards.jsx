import React from 'react';

export function PerformanceCards() {
  return (
    <div className="fixed top-32 right-12 flex gap-4 z-[999] -ml-2">
      <div className="performance-card w-[300px]">
        <div className="card-header">
          <h2 className="text-3xl font-semibold mb-2">Assets</h2>
          <div className="invisible text-sm text-gray-300 mb-8">Placeholder</div>
        </div>
        <div className="card-content">
          <div className="text-5xl font-bold mb-2">1452</div>
          <div>
            <span className="text-4xl">1,461.23</span>
            <span className="text-lg ml-1">MWp</span>
          </div>
        </div>
      </div>

      <div className="performance-card w-[300px]">
        <div className="card-header">
          <h2 className="text-3xl font-semibold mb-2">Today's Performance</h2>
          <div className="text-sm text-gray-300 mb-8">
            <div className="hidden md:block">Last Updated 18 Jan 2023 10:38am</div>
            <div className="block md:hidden">
              <div>Last Updated</div>
              <div>18 Jan 2023 10:38am</div>
            </div>
          </div>
        </div>
        <div className="card-content">
          <div className="mb-2">
            <span className="text-4xl font-bold">1,463.23</span>
            <span className="text-lg ml-1">MWh</span>
          </div>
          <div>
            <span className="text-3xl">23</span>
            <span className="text-lg ml-1">MW</span>
          </div>
        </div>
      </div>
    </div>
  );
}
