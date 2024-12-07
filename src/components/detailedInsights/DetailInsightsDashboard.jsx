import React from 'react';
import { IoClose, IoNotifications } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { IoSettingsOutline } from 'react-icons/io5';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Card = ({ title, children, className = "" }) => (
  <div className={`bg-white/10 backdrop-blur-lg rounded-xl p-3 ${className}`}>
    {title && <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>}
    {children}
  </div>
);

const MetricDisplay = ({ label, value, unit, subtitle, topSubtitle, className }) => (
  <div className={`flex flex-col ${className}`}>
    <div className="h-5 text-sm font-medium text-white/80">{label}</div>
    <div className="flex flex-col h-[calc(100%-1.25rem)]">
      <div className="h-3 text-[10px] text-white/40">{topSubtitle || '\u00A0'}</div>
      <div className="flex items-baseline gap-1 mt-1">
        <span className="text-2xl font-semibold text-white min-h-[1.75rem]">{value || '\u00A0'}</span>
        <span className="text-sm text-white/60">{unit}</span>
      </div>
      {subtitle && <div className="mt-1 text-xs text-white/40">{subtitle}</div>}
    </div>
  </div>
);

const SidebarItem = ({ icon: Icon, label, active }) => (
  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${active ? 'text-white bg-white/10' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
    <Icon size={16} />
    <span className="text-sm">{label}</span>
  </div>
);

const IrradiationChart = ({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <AreaChart
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <defs>
        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#1890ff" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#1890ff" stopOpacity={0.1}/>
        </linearGradient>
      </defs>
      <CartesianGrid 
        strokeDasharray="3 3" 
        vertical={true}
        stroke="rgba(255,255,255,0.1)"
      />
      <XAxis 
        dataKey="time" 
        stroke="rgba(255,255,255,0.6)"
        tick={{ fill: 'rgba(255,255,255,0.6)' }}
        axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
      />
      <YAxis 
        stroke="rgba(255,255,255,0.6)"
        tick={{ fill: 'rgba(255,255,255,0.6)' }}
        axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
      />
      <Tooltip 
        contentStyle={{ 
          backgroundColor: 'rgba(26,41,66,0.9)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px',
          color: 'white'
        }}
      />
      <Area
        type="monotone"
        dataKey="value"
        stroke="#1890ff"
        fillOpacity={1}
        fill="url(#colorValue)"
      />
    </AreaChart>
  </ResponsiveContainer>
);

const MiniMap = ({ location }) => {
  const position = [location?.lat || 0, location?.long || 0];
  
  return (
    <MapContainer 
      center={position}
      zoom={13}
      zoomControl={false}
      attributionControl={false}
      dragging={false}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      style={{ height: "100%", width: "100%", position: "absolute", top: 0, left: 0, borderRadius: "0.75rem" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} />
    </MapContainer>
  );
};

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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1001] flex items-center justify-center"
    >
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
                  <Card title="Assets" className="h-full">
                    <div className="grid grid-cols-2 gap-4 p-4">
                      <MetricDisplay 
                        label="Capacity" 
                        value={data.capacity} 
                        unit="MWp"
                      />
                      <MetricDisplay 
                        label="Irradiance" 
                        value={data.irradiance} 
                        unit="kW/m²"
                      />
                      <MetricDisplay 
                        label="Plant Matrix" 
                        value={data.plantMatrix} 
                        topSubtitle="INV X SCB"
                      />
                      <MetricDisplay 
                        label="Days Online" 
                        value={data.daysOnline}
                        unit="Days"
                      />
                    </div>
                  </Card>
                </div>

                <div className="col-span-3 row-span-1">
                  <Card title="Today's Performance" className="h-full">
                    <div className="grid grid-rows-2 gap-4 p-4">
                      <MetricDisplay 
                        label="Performance Ratio" 
                        value={data.performanceRatio} 
                        unit="%"
                      />
                      <MetricDisplay 
                        label="Inverter Efficiency" 
                        value={data.inverterEfficiency} 
                        unit="%"
                      />
                    </div>
                  </Card>
                </div>

                <div className="col-span-3 row-span-1">
                  <Card title="" className="h-full relative p-0">
                    <div className="h-full w-full">
                      <MiniMap location={data.location} />
                      <div className="absolute bottom-3 left-3 z-[400] flex flex-col gap-1">
                        <div className="text-sm font-medium text-white bg-gray-800/30 backdrop-blur-sm px-3 py-1 rounded-lg">Location</div>
                        <div className="text-sm font-medium text-white bg-gray-800/30 backdrop-blur-sm px-3 py-1 rounded-lg">
                          {data.location?.lat?.toFixed(2)} N {data.location?.long?.toFixed(2)} E
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Bottom Row */}
                <div className="col-span-3 row-span-1">
                  <Card title="Today's Generation" className="h-full">
                    <div className="h-full flex items-center justify-center">
                      <div className="relative w-28 h-28">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-2xl font-semibold text-white text-center">
                            {data.generation}
                            <div className="text-sm text-white/60">MWh</div>
                          </div>
                        </div>
                        <div className="absolute inset-0 border-8 border-blue-400/30 rounded-full" />
                        <div className="absolute inset-0 border-8 border-blue-400 rounded-full" style={{ clipPath: 'inset(0 0 50% 0)' }} />
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="col-span-9 row-span-1">
                  <Card title="Irradiation Timeseries" className="h-full">
                    <div className="h-full p-4">
                      <IrradiationChart data={chartData} />
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
