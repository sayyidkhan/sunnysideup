import React from 'react';

export function MetricDisplay({ label, value, unit, subtitle, topSubtitle, className }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="h-5 text-sm font-medium text-white/80">{label}</div>
      <div className="flex flex-col h-[calc(100%-1.25rem)]">
        <div className="h-3 text-[10px] text-white/40">{topSubtitle || '\u00A0'}</div>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-2xl font-semibold text-white">{value}</span>
          <span className="text-sm text-white/60">{unit}</span>
        </div>
        {subtitle && <div className="mt-1 text-xs text-white/40">{subtitle}</div>}
      </div>
    </div>
  );
}
