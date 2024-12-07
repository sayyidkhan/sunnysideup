import React, { useState } from 'react';
import { IoClose, IoNotifications, IoMenu } from 'react-icons/io5';
import { IoSettingsOutline } from 'react-icons/io5';

import { Button } from "@nextui-org/react";
import { IoNotificationsOutline } from "react-icons/io5";
import { DetailAssetsCard } from './cards/DetailAssetsCard';
import { DetailPerformanceCard } from './cards/DetailPerformanceCard';
import { DetailLocationCard } from './cards/DetailLocationCard';
import { DetailGenerationCard } from './cards/DetailGenerationCard';
import { DetailInsightsChart } from './charts/DetailInsightsChart';
import { baseStyles } from '../mainInsights/MainInsightsDashboard';

const mobileBackgroundColor = '#1e3356';

const SidebarItem = ({ icon: Icon, label, active }) => (
  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
    active 
      ? 'text-white bg-white/10' 
      : 'text-white/60 hover:text-white hover:bg-white/5'
  }`}>
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
  mobileBackground: {
    background: mobileBackgroundColor,
  }
};

export function DetailInsightsDashboard({ show, onClose, siteData }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  if (!show) return null;

  const data = {
    siteName: "Bhadla Solar Park",
    ...siteData
  };

  const chartData = Array.from({ length: 12 }, (_, i) => ({
    time: `${i + 1}/12`,
    value: Math.random() * 150 + 50,
  }));

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="fixed inset-0 z-[1001] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div style={detailInsightsDashboardStyles.container} className="relative w-[95vw] sm:w-[90vw] md:w-[85vw] h-[90vh] bg-[#0B1526]/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
        <div className="h-full flex">
          {/* Mobile Sidebar */}
          <div 
            className={`absolute md:relative md:w-52 w-64 border-r border-white/10 flex flex-col h-full transition-transform duration-300 z-50 bg-[#1e3356] md:bg-transparent ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            }`}
            style={isSidebarOpen ? detailInsightsDashboardStyles.mobileBackground : {
              ...detailInsightsDashboardStyles.sidebar,
              '@media (min-width: 768px)': detailInsightsDashboardStyles.sidebar,
              '@media (max-width: 767px)': detailInsightsDashboardStyles.mobileBackground
            }}
          >
            <div className="h-[68px] flex items-center justify-between px-4 flex-shrink-0 bg-[#1e3356] md:bg-transparent">
              <h2 className="text-xl font-semibold text-white">Dashboards</h2>
              <Button
                isIconOnly
                radius="full"
                variant="flat"
                className={`${detailInsightsDashboardStyles.button.iconButton} md:hidden`}
                onClick={toggleSidebar}
              >
                <IoClose className={detailInsightsDashboardStyles.button.iconStyle} />
              </Button>
            </div>
            <div className="flex-1 p-3 space-y-1 overflow-y-auto bg-[#1e3356] md:bg-transparent">
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
              <div className="flex items-center gap-3">
                <Button
                  isIconOnly
                  radius="full"
                  variant="flat"
                  className={`${detailInsightsDashboardStyles.button.iconButton} md:hidden`}
                  onClick={toggleSidebar}
                >
                  <IoMenu className={detailInsightsDashboardStyles.button.iconStyle} />
                </Button>
                <h2 className="text-xl font-semibold text-white">{data.siteName}</h2>
              </div>
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
            <div className="flex-1 p-4 overflow-y-auto md:overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 auto-rows-min md:grid-rows-2 md:h-full">
                {/* Top Row (web view) */}
                <div className="sm:col-span-2 md:col-span-6 md:row-span-1">
                  <DetailAssetsCard data={data} />
                </div>

                <div className="sm:col-span-1 md:col-span-3 md:row-span-1">
                  <DetailPerformanceCard data={data} />
                </div>

                <div className="sm:col-span-1 md:col-span-3 md:row-span-1 h-[250px] md:h-auto">
                  <DetailLocationCard location={data.location} />
                </div>

                {/* Bottom Row (web view) */}
                <div className="sm:col-span-1 md:col-span-3 md:row-span-1 h-[230px] md:h-auto">
                  <DetailGenerationCard generation={data.generation} />
                </div>

                <div className="sm:col-span-2 md:col-span-9 md:row-span-1 h-[340px] md:h-auto">
                  <div className="h-full bg-white/10 backdrop-blur-lg rounded-xl p-3">
                    <div className="h-full w-full pt-2 pb-4 md:pt-3 md:pb-6">
                      <div className="w-full md:w-[120%] md:-ml-[10%] xl:w-[160%] xl:-ml-[30%] 2xl:w-[110%] 2xl:-ml-[5%] transform scale-[0.85] sm:scale-[0.45] md:scale-[0.45] lg:scale-[0.5] xl:scale-[0.62] 2xl:scale-[0.85] origin-top">
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
