import React from 'react';

export function DetailInsightsCard({ title, children, className = "" }) {
  return (
    <div className={`bg-white/10 backdrop-blur-lg rounded-xl p-3 ${className}`}>
      {title && <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>}
      {children}
    </div>
  );
}
