import React from 'react';
import { MainInsightsCards } from './cards/MainInsightsCards';
import { MainInsightsChart } from './charts/MainInsightsChart';
import { mark } from 'framer-motion/client';

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
    padding: '0 0.5rem',
    transform: 'scale(0.8)',
    transformOrigin: 'top right',
    width: '100%'
  },
  desktopCards: {
    transform: 'scale(0.75)',
    transformOrigin: 'top right',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  desktopWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '0.5rem',
    width: '500px'  // Fixed width for consistent sizing
  },
  mobileContainer: {
    ...baseStyles,
    padding: '1rem',
    marginTop: '-0.6rem'
  }
};

export function MainInsightsDashboard({ show = true }) {
  if (!show) return null;
  
  return (
    <div className="w-full">
      {/* Desktop View */}
      <div className="hidden md:block fixed top-32 right-10 z-[999]">
        <div className="w-full max-w-[1200px] transform scale-75 origin-top ml-24">
          <MainInsightsCards />
        </div>
        <div className="w-full max-w-[1200px] -mt-12">
          <div style={styles.desktopContainer}>
            <MainInsightsChart />
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="fixed top-0 left-0 right-0 z-[999] flex md:hidden flex-col">
        <div className="px-2 py-20 mr-2">
          <MainInsightsCards />
        </div>
        <div className="px-2 -mt-16">
          <div style={{...styles.mobileContainer}}>
            <div className="w-full flex justify-center">
              <MainInsightsChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
