import React from 'react';
import PropTypes from 'prop-types';

export function NoDataFallBackUIForCharts({ 
  title = 'No Data Available',
  subtitle = 'Chart Data Will Appear Here Once Available',
  className = ''
}) {
  return (
    <div className={`w-full h-full flex items-center justify-center p-6 -mt-12 ${className}`}>
      <div className="text-center">
        <p className="text-white text-xl md:text-2xl font-semibold mb-2 md:mb-3">{title}</p>
        <p className="text-white text-sm md:text-base opacity-80 whitespace-nowrap">{subtitle}</p>
      </div>
    </div>
  );
}

NoDataFallBackUIForCharts.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  className: PropTypes.string
};
