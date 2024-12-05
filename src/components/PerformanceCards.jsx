import React from 'react';

export function PerformanceCards() {
  return (
    <div className="flex w-full px-2">
      <div className="flex-1 performance-card p-2 md:p-4 mr-2">
        <div className="card-header">
          <h2 className="text-lg md:text-3xl font-semibold mb-1 md:mb-2">Assets</h2>
          <div className="invisible text-sm text-gray-300 mb-2 md:mb-8">Placeholder</div>
        </div>
        <div className="card-content">
          <div className="text-3xl md:text-5xl font-bold mb-1 md:mb-2">1452</div>
          <div>
            <span className="text-2xl md:text-4xl">1,461.23</span>
            <span className="text-sm md:text-lg ml-1">MWp</span>
          </div>
        </div>
      </div>

      <div className="flex-1 performance-card p-2 md:p-4">
        <div className="card-header">
          <h2 className="text-lg md:text-3xl font-semibold mb-1 md:mb-2">Today's Performance</h2>
          <div className="text-xs md:text-sm text-gray-300 mb-2 md:mb-8">
            <div className="flex flex-col md:flex-row md:gap-1">
              <span>Last Updated</span>
              <span>18 Jan 2023 10:38am</span>
            </div>
          </div>
        </div>
        <div className="card-content">
          <div className="mb-1 md:mb-2">
            <span className="text-4xl md:text-4xl font-bold">1,463.23</span>
            <span className="text-base md:text-lg ml-1">MWh</span>
          </div>
          <div>
            <span className="text-3xl md:text-3xl">23</span>
            <span className="text-base md:text-lg ml-1">MW</span>
          </div>
        </div>
      </div>
    </div>
  );
}
