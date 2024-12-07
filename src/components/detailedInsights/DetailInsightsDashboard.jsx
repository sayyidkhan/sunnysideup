import React from 'react';
import { IoClose, IoNotifications } from 'react-icons/io5';
import { IoSettingsOutline } from 'react-icons/io5';

import { Button } from "@nextui-org/react";
import { IoNotificationsOutline } from "react-icons/io5";
import { DetailAssetsCard } from './cards/DetailAssetsCard';
import { DetailPerformanceCard } from './cards/DetailPerformanceCard';
import { DetailLocationCard } from './cards/DetailLocationCard';
import { DetailGenerationCard } from './cards/DetailGenerationCard';
import { DetailInsightsChart } from './charts/DetailInsightsChart';
import { baseStyles } from '../mainInsights/MainInsightsDashboard';

const SidebarItem = ({ icon: Icon, label, active }) => (
  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${active ? 'text-white bg-white/10' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
    <Icon size={16} />
    <span className="text-sm">{label}</span>
  </div>
);

const detailInsightsDashboardStyles = {
  container: {
    background: baseStyles.background,
  },
  content: {
    background: baseStyles.background,
  },
  button: {
    iconButton: "bg-[rgba(80,119,195,0.65)] backdrop-blur-xl shadow-xl min-w-10 h-10 hover:bg-[rgba(255,255,255,0.2)] hover:-translate-y-[1px] transition-all",
    iconStyle: "text-xl text-white"
  },
  sidebar: {
    background: 'linear-gradient(135deg, rgba(30,45,90,0.25) 0%, rgba(30,45,90,0.15) 100%)',
  },
};

export function DetailInsightsDashboard({ show, onClose, siteData }) {
  if (!show) return null;

  // Use the passed siteData instead of hardcoded data
  const data = {
    siteName: "Bhadla Solar Park",
    ...siteData
  };

  const chartData = Array.from({ length: 12 }, (_, i) => ({
    time: `${i + 1}/12`,
    value: Math.random() * 150 + 50,
  }));

  return (
    <div className="fixed inset-0 z-[1001] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div style={detailInsightsDashboardStyles.container} className="relative w-[85vw] h-[85vh] bg-[#1a2942]/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
        <div className="h-full flex">
          {/* Sidebar */}
          <div style={detailInsightsDashboardStyles.sidebar} className="w-52 border-r border-white/10 flex flex-col">
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
                <Button
                  isIconOnly
                  radius="full"
                  variant="flat"
                  className={detailInsightsDashboardStyles.button.iconButton}
                >
                  <IoNotificationsOutline className={detailInsightsDashboardStyles.button.iconStyle} />
                </Button>
                <Button
                  onClick={onClose}
                  isIconOnly
                  radius="full"
                  variant="flat"
                  className={detailInsightsDashboardStyles.button.iconButton}
                >
                  <IoClose className={detailInsightsDashboardStyles.button.iconStyle} />
                </Button>
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
                  <div className="h-full bg-white/10 backdrop-blur-lg rounded-xl p-3">
                    <div className="h-[220px] sm:h-[240px] md:h-[300px] lg:h-[320px] xl:h-[360px] 2xl:h-[400px] w-full overflow-hidden">
                      <div className="w-[120%] -ml-[10%] xl:w-[160%] xl:-ml-[30%] 2xl:w-[110%] 2xl:-ml-[5%] transform scale-[0.28] sm:scale-[0.32] md:scale-[0.45] lg:scale-[0.5] xl:scale-[0.62] 2xl:scale-[0.85] origin-top pt-0 2xl:pt-4">
                        <DetailInsightsChart />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
