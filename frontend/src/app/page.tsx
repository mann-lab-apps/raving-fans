'use client';

import { useState, useEffect } from 'react';

interface VisionPair {
  id: string;
  name: string;
  providerVision: string;
  customerVision: string;
  status: string;
}

interface VisionData {
  pairs: VisionPair[];
}

export default function Home() {
  const [data, setData] = useState<VisionData | null>(null);
  const [activeTab, setActiveTab] = useState<string>('family');
  const [isLoading, setIsLoading] = useState(false);

  // Edit states
  const [editingProvider, setEditingProvider] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(false);
  const [tempVision, setTempVision] = useState('');

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/visions');
      const json = await res.json();
      setData(json);
      if (!activeTab && json.pairs.length > 0) {
        setActiveTab(json.pairs[0].id);
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (target: 'provider' | 'customer') => {
    if (!data) return;

    setIsLoading(true);
    const newData = { ...data };
    const index = newData.pairs.findIndex((p) => p.id === activeTab);
    
    if (index !== -1) {
      if (target === 'provider') {
        newData.pairs[index].providerVision = tempVision;
        setEditingProvider(false);
      } else {
        newData.pairs[index].customerVision = tempVision;
        setEditingCustomer(false);
      }
    }

    try {
      const res = await fetch('http://localhost:8000/api/visions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      });
      if (res.ok) {
        setData(newData);
      }
    } catch (err) {
      console.error('Failed to save data:', err);
      alert('저장에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!data) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-pulse text-slate-400 font-medium text-lg">데이터를 불러오는 중...</div>
    </div>
  );

  const currentPair = data.pairs.find((p) => p.id === activeTab);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-16 text-center">
          <h1 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600">
            Raving Fans: Vision Alignment
          </h1>
          <p className="text-slate-500 font-medium">"고객군별 비전 일치화를 통한 열광하는 팬 만들기"</p>
        </header>

        {/* Customer Tabs */}
        <div className="flex gap-3 mb-10 overflow-x-auto pb-4 scrollbar-hide justify-center">
          {data.pairs.map((pair) => (
            <button
              key={pair.id}
              onClick={() => {
                setActiveTab(pair.id);
                setEditingProvider(false);
                setEditingCustomer(false);
              }}
              className={`px-10 py-4 rounded-2xl font-bold whitespace-nowrap transition-all duration-300 ${
                activeTab === pair.id
                  ? 'bg-slate-900 text-white shadow-xl scale-105'
                  : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {pair.name}
            </button>
          ))}
        </div>

        {/* Side-by-Side Comparison */}
        <div className="grid md:grid-cols-2 gap-10 items-stretch">
          
          {/* Provider Vision Panel */}
          <div className="bg-white p-12 rounded-[3rem] border border-blue-50 shadow-sm relative group">
            <div className="flex justify-between items-start mb-8">
              <h3 className="text-blue-600 font-bold uppercase tracking-widest text-xs">나의 비전 (Provider)</h3>
              {!editingProvider && (
                <button 
                  onClick={() => { setEditingProvider(true); setTempVision(currentPair?.providerVision || ''); }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-blue-600 font-bold text-sm underline underline-offset-4"
                >
                  Edit
                </button>
              )}
            </div>
            {editingProvider ? (
              <div className="space-y-4">
                <textarea
                  value={tempVision}
                  onChange={(e) => setTempVision(e.target.value)}
                  className="w-full text-2xl font-medium p-6 rounded-3xl border-2 border-blue-100 focus:border-blue-500 focus:outline-none transition-colors min-h-[160px]"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button onClick={() => handleSave('provider')} disabled={isLoading} className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 disabled:opacity-50">저장</button>
                  <button onClick={() => setEditingProvider(false)} className="px-8 py-3 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200">취소</button>
                </div>
              </div>
            ) : (
              <p className="text-3xl font-light leading-relaxed text-slate-800 italic">
                "{currentPair?.providerVision}"
              </p>
            )}
          </div>

          {/* Customer Vision Panel */}
          <div className="bg-white p-12 rounded-[3rem] border border-indigo-50 shadow-sm relative group">
            <div className="flex justify-between items-start mb-8">
              <h3 className="text-indigo-600 font-bold uppercase tracking-widest text-xs">고객의 비전 (Customer)</h3>
              {!editingCustomer && (
                <button 
                  onClick={() => { setEditingCustomer(true); setTempVision(currentPair?.customerVision || ''); }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-indigo-600 font-bold text-sm underline underline-offset-4"
                >
                  Edit
                </button>
              )}
            </div>
            {editingCustomer ? (
              <div className="space-y-4">
                <textarea
                  value={tempVision}
                  onChange={(e) => setTempVision(e.target.value)}
                  className="w-full text-2xl font-medium p-6 rounded-3xl border-2 border-indigo-100 focus:border-indigo-500 focus:outline-none transition-colors min-h-[160px]"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button onClick={() => handleSave('customer')} disabled={isLoading} className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 disabled:opacity-50">저장</button>
                  <button onClick={() => setEditingCustomer(false)} className="px-8 py-3 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200">취소</button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-3xl font-light leading-relaxed text-slate-800">
                  "{currentPair?.customerVision}"
                </p>
                <div className="pt-6 flex items-center gap-3 border-t border-slate-50">
                  <span className={`w-3 h-3 rounded-full ${currentPair?.status === 'aligned' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-amber-500'}`} />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Alignment Status: {currentPair?.status}</span>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Action Button */}
        <div className="mt-20 text-center">
          <button className="px-12 py-6 bg-slate-900 text-white rounded-3xl font-bold hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 shadow-2xl">
            1% 개선(Plus One) 액션 추가
          </button>
        </div>
      </div>
    </main>
  );
}
