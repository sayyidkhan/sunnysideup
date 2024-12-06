import React from 'react';
import { IoClose, IoNotifications } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { IoSettingsOutline } from 'react-icons/io5';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Card = ({ title, children, className = "" }) => (
  <div className={`bg-white/10 backdrop-blur-lg rounded-xl p-3 ${className}`}>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    {children}
  </div>
);

const MetricDisplay = ({ label, value, unit, subtitle, topSubtitle }) => (
  <div className="flex flex-col gap-0.5">
    <div className="text-sm font-medium text-white/80">{label}</div>
    <div className="flex flex-col">
      <div className="text-[10px] text-white/40 h-[12px]">{topSubtitle}</div>
      <div className="text-2xl font-semibold text-white">
        <span className="mr-1">{value}</span>
        <span className="text-sm text-white/60">{unit}</span>
      </div>
      <div className="text-[10px] text-white/40 h-[12px]">{subtitle}</div>
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
        vertical={false}
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

export function DetailInsightsDashboard({ show, onClose, siteData }) {
  if (!show) return null;

  // Example data - replace with actual data from your application
  const data = {
    siteName: "Bhadla",
    capacity: "97",
    irradiance: "345.9",
    performanceRatio: "79.46",
    inverterEfficiency: "97.78",
    plantMatrix: "28 X 24",
    daysOnline: "2394",
    location: {
      lat: "27.49 N",
      long: "71.91 E"
    },
    generation: "444.75"
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
      
      <div className="relative w-[85vw] h-[80vh] bg-[#1a2942]/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden flex">
        {/* Sidebar */}
        <div className="w-52 border-r border-white/10 p-3">
          <div className="text-xl font-semibold text-white mb-4">Dashboards</div>
          <div className="space-y-1">
            <SidebarItem icon={IoSettingsOutline} label="Inverter Efficiency" />
            <SidebarItem icon={IoSettingsOutline} label="String Performance" />
            <SidebarItem icon={IoSettingsOutline} label="Power Curve" />
            <SidebarItem icon={IoSettingsOutline} label="Soiling Loss" />
            <SidebarItem icon={IoSettingsOutline} label="Clipping Loss" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-white/10">
            <h2 className="text-xl font-semibold text-white">{data.siteName}</h2>
            <div className="flex gap-4">
              <button className="text-white/60 hover:text-white">
                <IoNotifications size={20} />
              </button>
              <button onClick={onClose} className="text-white/60 hover:text-white">
                <IoClose size={20} />
              </button>
            </div>
          </div>

          {/* Content Grid */}
          <div className="p-4 grid grid-cols-12 gap-4">
            {/* Assets Card - Spans 6 columns (50%) */}
            <div className="col-span-6">
              <Card title="Assets" className="h-full">
                <div className="grid grid-cols-2 gap-4">
                  <MetricDisplay label="Capacity" value={data.capacity} unit="MWp" />
                  <MetricDisplay label="Irradiance" value={data.irradiance} unit="kW/m²" />
                  <MetricDisplay 
                    label="Plant Matrix" 
                    value={data.plantMatrix} 
                    topSubtitle="INV X SCB"
                  />
                  <MetricDisplay label="Days Online" value={data.daysOnline} unit="Days" />
                </div>
              </Card>
            </div>

            {/* Today's Performance - Spans 3 columns (25%) */}
            <div className="col-span-3">
              <Card title="Today's Performance" className="h-full">
                <div className="flex flex-col gap-6">
                  <MetricDisplay label="Performance Ratio" value={data.performanceRatio} unit="%" />
                  <MetricDisplay label="Inverter Efficiency" value={data.inverterEfficiency} unit="%" />
                </div>
              </Card>
            </div>

            {/* Location Map - Spans 3 columns (25%) */}
            <div className="col-span-3">
              <Card title="Location" className="h-full">
                <div className="flex flex-col gap-1">
                  <div className="text-sm font-medium text-white/80">Coordinates</div>
                  <div className="text-2xl font-semibold text-white">
                    <div>{data.location.lat}</div>
                    <div>{data.location.long}</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Today's Generation - Spans 3 columns */}
            <div className="col-span-3">
              <Card title="Today's Generation" className="h-full">
                <div className="h-[150px] flex items-center justify-center">
                  <div className="relative w-32 h-32">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-2xl font-semibold text-white text-center">
                        {data.generation}
                        <div className="text-sm text-white/60">MWh</div>
                      </div>
                    </div>
                    <div className="absolute inset-0 border-8 border-blue-400/30 rounded-full" />
                    <div className="absolute inset-0 border-8 border-blue-400 rounded-full border-l-transparent border-b-transparent rotate-45" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Irradiation Timeseries - Spans 9 columns */}
            <div className="col-span-9">
              <Card title="Irradiation Timeseries" className="h-full">
                <div className="h-[150px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={chartData}
                      margin={{
                        top: 0,
                        right: 0,
                        left: -20,
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
                        vertical={false}
                        stroke="rgba(255,255,255,0.1)"
                      />
                      <XAxis 
                        dataKey="time" 
                        stroke="rgba(255,255,255,0.6)"
                        tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }}
                        axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                        tickMargin={5}
                      />
                      <YAxis 
                        stroke="rgba(255,255,255,0.6)"
                        tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }}
                        axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                        tickMargin={5}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(26,41,66,0.9)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px',
                          color: 'white',
                          fontSize: '12px',
                          padding: '4px 8px'
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
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
