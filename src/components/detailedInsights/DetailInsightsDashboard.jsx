import React from 'react';
import { IoClose, IoNotifications } from 'react-icons/io5';
import { IoSettingsOutline } from 'react-icons/io5';

import { DetailAssetsCard } from './cards/DetailAssetsCard';
import { DetailPerformanceCard } from './cards/DetailPerformanceCard';
import { DetailLocationCard } from './cards/DetailLocationCard';
import { DetailGenerationCard } from './cards/DetailGenerationCard';
import { IrradiationChart } from './charts/IrradiationChart';

const SidebarItem = ({ icon: Icon, label, active }) => (
  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${active ? 'text-white bg-white/10' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
    <Icon size={16} />
    <span className="text-sm">{label}</span>
  </div>
);

export function DetailInsightsDashboard({ show, onClose, siteData }) {
  if (!show) return null;

  // Use the passed siteData instead of hardcoded data
  const data = {
    siteName: "Bhadla Solar Park",
    ...siteData
  };

  const chartData = Array.from({ length: 12 }, (_, i) => ({
    time: `${i+1}/12`,
    value: Math.random() * 150 + 50,
  }));

  return (
    <div className="fixed inset-0 z-[1001] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-[85vw] h-[85vh] bg-[#1a2942]/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
        <div className="h-full flex">
          {/* Sidebar */}
          <div className="w-52 border-r border-white/10 flex flex-col">
            <div className="h-[68px] flex items-center px-4 flex-shrink-0">
              <h2 className="text-xl font-semibold text-white">Dashboards</h2>
            </div>
            <div className="flex-1 p-3 space-y-1 overflow-y-auto">
              <SidebarItem icon={IoSettingsOutline} label="Inverter Efficiency" />
              <SidebarItem icon={IoSettingsOutline} label="String Performance" />
              <SidebarItem icon={IoSettingsOutline} label="Power Curve" />
              <SidebarItem icon={IoSettingsOutline} label="Soiling Loss" />
              <SidebarItem icon={IoSettingsOutline} label="Clipping Loss" />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col h-full">
            {/* Header */}
            <div className="h-[68px] flex items-center justify-between px-4 flex-shrink-0">
              <h2 className="text-xl font-semibold text-white">{data.siteName}</h2>
              <div className="flex gap-4">
                <button className="text-white/60 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors">
                  <IoNotifications size={20} />
                </button>
                <button onClick={onClose} className="text-white/60 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors">
                  <IoClose size={20} />
                </button>
              </div>
            </div>

            {/* Content Grid */}
            <div className="flex-1 p-4 overflow-hidden">
              <div className="grid grid-cols-12 gap-4 grid-rows-2 h-full">
                {/* Top Row */}
                <div className="col-span-6 row-span-1">
                  <DetailAssetsCard data={data} />
                </div>

                <div className="col-span-3 row-span-1">
                  <DetailPerformanceCard data={data} />
                </div>

                <div className="col-span-3 row-span-1">
                  <DetailLocationCard location={data.location} />
                </div>

                {/* Bottom Row */}
                <div className="col-span-3 row-span-1">
                  <DetailGenerationCard generation={data.generation} />
                </div>

                <div className="col-span-9 row-span-1">
                  <IrradiationChart data={chartData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
