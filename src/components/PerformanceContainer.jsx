import React from 'react';
import { PerformanceCards } from './PerformanceCards';
import { PerformanceChart } from './PerformanceChart';

const baseStyles = {
  width: '100%',
  background: 'linear-gradient(135deg, rgba(80,119,195,0.45) 0%, rgba(80,119,195,0.35) 100%)',
  backdropFilter: 'blur(30px)',
  borderRadius: '20px',
  border: '1px solid rgba(255,255,255,0.18)',
  boxShadow: '0 8px 32px 0 rgba(80,119,195,0.15), inset 0 0 0 1px rgba(255,255,255,0.25)',
};

const styles = {
  desktopContainer: {
    ...baseStyles,
    padding: '0 0.5rem'
  },
  mobileContainer: {
    ...baseStyles,
    padding: '1rem'
  }
};

export function PerformanceContainer() {
  return (
    <>
      {/* Desktop View */}
      <div className="fixed top-32 right-12 z-[999] hidden md:flex md:flex-col gap-4">
        <PerformanceCards />
        <div style={{...styles.desktopContainer}}>
          <PerformanceChart />
        </div>
      </div>

      {/* Mobile View */}
      <div className="fixed top-0 left-0 right-0 z-[999] flex md:hidden flex-col">
        <div className="py-24 mt-8">
          <PerformanceCards />
        </div>
        <div className="px-2 -mt-20">
          <div style={{...styles.mobileContainer}}>
            <div className="w-full flex justify-center">
              <PerformanceChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
