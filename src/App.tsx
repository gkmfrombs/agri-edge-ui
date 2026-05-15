import React, { useState, useEffect } from 'react';
import { Wifi, Menu, ChevronLeft, Sprout, AlertTriangle, MessageSquare, CloudRain, TrendingDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, YAxis } from 'recharts';
import Chat from './components/Chat';

// Mock Data for the Analytics
const inventoryBurnData = [
  { day: 'Mon', units: 45 },
  { day: 'Tue', units: 38 },
  { day: 'Wed', units: 29 },
  { day: 'Thu', units: 18 },
  { day: 'Today', units: 5 }, // Critical stock
];

const territoryRiskData = [
  { village: 'Palwal', alerts: 4 },
  { village: 'Rewari', alerts: 12 }, // High risk
  { village: 'Jhajjar', alerts: 2 },
];

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState<'dashboard' | 'chat'>('dashboard');

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="h-screen w-full bg-agri-dark flex flex-col items-center justify-center">
        <div className="animate-bounce mb-4 bg-zinc-900 p-4 rounded-3xl border border-zinc-800 shadow-xl shadow-agri-green/20">
          <Sprout size={64} className="text-agri-green" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-agri-green to-emerald-300 bg-clip-text text-transparent animate-pulse">
          Agri-Edge
        </h1>
        <p className="text-zinc-500 mt-2 text-sm">Initializing Knowledge Graph...</p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-agri-dark text-white font-sans flex flex-col overflow-hidden relative">
      
      {/* Header */}
      <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-4 shrink-0 bg-agri-dark z-20">
        <div className="flex items-center gap-3">
          {currentView === 'chat' ? (
            <button onClick={() => setCurrentView('dashboard')} className="p-1 rounded-full hover:bg-zinc-800 transition-colors">
              <ChevronLeft className="w-6 h-6 text-zinc-300" />
            </button>
          ) : (
            <Menu className="w-6 h-6 text-zinc-400" />
          )}
          <h1 className="text-lg font-bold bg-gradient-to-r from-agri-green to-emerald-300 bg-clip-text text-transparent">
            {currentView === 'chat' ? 'Co-Pilot' : 'Morning Briefing'}
          </h1>
        </div>
        
        <div className="flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-800">
          <div className="w-2 h-2 rounded-full bg-agri-green animate-pulse"></div>
          <span className="text-[10px] font-medium text-zinc-300">Edge Mode</span>
          <Wifi className="w-3 h-3 text-zinc-400 ml-1" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-y-auto">
        
        {/* DASHBOARD VIEW */}
        {currentView === 'dashboard' && (
          <div className="p-4 space-y-4 pb-24">
            
            {/* Weather & Action Card */}
            <div className="bg-agri-card p-4 rounded-2xl border border-zinc-800 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <CloudRain size={80} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-1">
                  <CloudRain className="text-blue-400 w-5 h-5" />
                  <span className="font-semibold text-zinc-200">Palwal Territory</span>
                </div>
                <h3 className="text-3xl font-bold mb-2">85°F <span className="text-lg text-zinc-400 font-normal">90% Humid</span></h3>
                <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm px-3 py-2 rounded-lg flex items-center gap-2">
                  <AlertTriangle size={16} />
                  Heavy rain detected. High risk of Fungal Blight today.
                </div>
              </div>
            </div>

            {/* Analytics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Burn Rate Chart */}
              <div className="bg-agri-card p-4 rounded-2xl border border-zinc-800">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-zinc-200 flex items-center gap-2">
                      <TrendingDown className="text-red-400 w-4 h-4" />
                      Critical Burn Rate
                    </h4>
                    <p className="text-xs text-zinc-500">Fungicide Z at Rewari Agro</p>
                  </div>
                  <span className="bg-red-500/10 text-red-400 text-xs px-2 py-1 rounded font-bold">5 Left</span>
                </div>
                <div className="h-32 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={inventoryBurnData}>
                      <XAxis dataKey="day" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                        itemStyle={{ color: '#ef4444' }}
                      />
                      <Line type="monotone" dataKey="units" stroke="#ef4444" strokeWidth={3} dot={{ fill: '#ef4444', r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Territory Risk Chart */}
              <div className="bg-agri-card p-4 rounded-2xl border border-zinc-800">
                <div className="mb-4">
                  <h4 className="font-semibold text-zinc-200">Pest Alerts by Village</h4>
                  <p className="text-xs text-zinc-500">Last 7 Days</p>
                </div>
                <div className="h-32 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={territoryRiskData}>
                      <XAxis dataKey="village" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                        cursor={{ fill: '#27272a' }}
                      />
                      <Bar dataKey="alerts" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* CHAT VIEW */}
        {currentView === 'chat' && (
          <div className="absolute inset-0">
            <Chat />
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      {currentView === 'dashboard' && (
        <div className="absolute bottom-6 left-0 right-0 px-4 flex justify-center z-30">
          <button 
            onClick={() => setCurrentView('chat')}
            className="bg-agri-green text-white w-full py-4 rounded-full font-bold shadow-lg shadow-emerald-900/50 flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all active:scale-95"
          >
            <MessageSquare className="w-5 h-5" />
            Launch AI Co-Pilot
          </button>
        </div>
      )}

    </div>
  );
}