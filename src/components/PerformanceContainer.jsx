import React from 'react';
import { PerformanceCards } from './PerformanceCards';
import { PerformanceChart } from './PerformanceChart';

export function PerformanceContainer() {
  return (
    <>
      {/* Desktop View */}
      <div className="fixed top-32 right-12 z-[999] hidden md:flex md:flex-col gap-4">
        <PerformanceCards />
        <div className="bg-[linear-gradient(135deg,rgba(80,119,195,0.45)_0%,rgba(80,119,195,0.35)_100%)] backdrop-blur-[30px] rounded-[20px] border border-white/[0.18] shadow-[0_8px_32px_0_rgba(80,119,195,0.15),inset_0_0_0_1px_rgba(255,255,255,0.25)]">
          <PerformanceChart />
        </div>
      </div>

      {/* Mobile View */}
      <div className="fixed top-0 left-0 right-0 z-[999] flex md:hidden flex-col">
        <div className="py-24 mt-8">
          <PerformanceCards />
        </div>
        <div className="px-2 -mt-20">
          <div className="w-full bg-[linear-gradient(135deg,rgba(80,119,195,0.45)_0%,rgba(80,119,195,0.35)_100%)] backdrop-blur-[30px] rounded-[20px] border border-white/[0.18] shadow-[0_8px_32px_0_rgba(80,119,195,0.15),inset_0_0_0_1px_rgba(255,255,255,0.25)] p-4">
            <div className="w-full flex justify-center">
              <PerformanceChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
