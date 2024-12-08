import React, { Suspense, lazy } from 'react';
import { DetailInsightsCard } from './DetailInsightsCard';
import { BiWorld } from 'react-icons/bi';
import { LoadingGlobe } from '../../minimap/LoadingGlobe';

/**
 * Lazy load the MiniMap component with a controlled loading sequence:
 * 1. React.lazy() is used for code splitting - MiniMap's code will be in a separate chunk
 * 2. We wrap the import in a new Promise to have control over the loading timing
 * 3. setTimeout adds a 200ms delay before resolving the import to:
 *    - Prevent flickering if the component loads too quickly
 *    - Ensure the loading animation is visible long enough to be meaningful
 *    - Create a smoother transition between loading and loaded states
 * 4. The inner promise (import()) loads the actual component code
 * 5. .then() extracts the MiniMap component from the module
 * 
 * This approach ensures:
 * - Code splitting for better initial page load
 * - Smooth loading transitions
 * - Consistent user experience regardless of load speed
 */
const MiniMap = lazy(() => 
  new Promise(resolve => {
    // Add a small delay to ensure smooth loading transition
    setTimeout(() => {
      resolve(import('../../minimap/MiniMap').then(module => ({
        default: module.MiniMap
      })));
    }, 200);
  })
);

export function DetailLocationCard({ location }) {
  console.log('DetailLocationCard - Location data:', location);

  if (!location) {
    return (
      <DetailInsightsCard title="" className="h-full relative p-0">
        <div className="h-full w-full flex flex-col items-center justify-center gap-3">
          <BiWorld className="w-8 h-8 text-white" />
          <div className="text-sm text-white font-bold">Mini Map Is Not Available</div>
        </div>
      </DetailInsightsCard>
    );
  }

  return (
    <DetailInsightsCard title="" className="h-full relative p-0">
      <div className="h-full w-full">
        <Suspense fallback={<LoadingGlobe />}>
          <MiniMap location={location} />
        </Suspense>
        <div className="absolute bottom-3 left-3 z-[400] flex flex-col gap-1">
          <div className="text-sm font-medium text-white bg-gray-800/30 backdrop-blur-sm px-3 py-1 rounded-lg w-fit">Location</div>
          <div className="text-sm font-medium text-white bg-gray-800/30 backdrop-blur-sm px-3 py-1 rounded-lg">
            {location?.lat?.toFixed(2)} N {location?.lng?.toFixed(2)} E
          </div>
        </div>
      </div>
    </DetailInsightsCard>
  );
}
