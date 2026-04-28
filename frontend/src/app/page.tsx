'use client';

import { useState, useEffect } from 'react';

interface Vision {
  name: string;
  vision: string;
}

interface Customer {
  id: string;
  name: string;
  vision: string;
  status: string;
}

interface VisionData {
  provider: Vision;
  customers: Customer[];
}

export default function Home() {
  const [data, setData] = useState<VisionData | null>(null);
  const [activeTab, setActiveTab] = useState<string>('family');

  useEffect(() => {
    // 백엔드 API에서 데이터 로드
    fetch('http://localhost:8000/api/visions')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        if (data.customers.length > 0) {
          setActiveTab(data.customers[0].id);
        }
      })
      .catch((err) => console.error('Failed to fetch data:', err));
  }, []);

  if (!data) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-pulse text-slate-400 font-medium text-lg">데이터를 불러오는 중...</div>
    </div>
  );

  const currentCustomer = data.customers.find((c) => c.id === activeTab);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600">
            Raving Fans: Vision Manager
          </h1>
          <p className="text-slate-500 font-medium">"나와 고객의 비전을 정렬하고, 1%의 혁신을 더하다"</p>
        </header>

        {/* Provider Vision Section */}
        <section className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-10 mb-10 border border-white">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-xs font-bold uppercase tracking-widest">Service Provider</span>
            <h2 className="text-2xl font-bold text-slate-800">{data.provider.name}</h2>
          </div>
          <p className="text-3xl font-light leading-snug text-slate-700 tracking-tight">
            "{data.provider.vision}"
          </p>
        </section>

        {/* Customer Tabs */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-4 scrollbar-hide">
          {data.customers.map((customer) => (
            <button
              key={customer.id}
              onClick={() => setActiveTab(customer.id)}
              className={`px-8 py-3 rounded-2xl font-semibold whitespace-nowrap transition-all duration-300 ${
                activeTab === customer.id
                  ? 'bg-slate-900 text-white shadow-lg scale-105'
                  : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {customer.name}
            </button>
          ))}
        </div>

        {/* Side-by-Side Comparison */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Provider Panel */}
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm transition-hover hover:shadow-md duration-300">
            <h3 className="text-blue-600 font-bold mb-6 uppercase tracking-widest text-xs">내 비전 (Provider)</h3>
            <div className="space-y-4">
              <p className="text-2xl font-medium leading-relaxed text-slate-800">
                {data.provider.vision}
              </p>
              <div className="pt-4 border-t border-slate-50">
                <p className="text-sm text-slate-400">일관성 있는 서비스의 기준점</p>
              </div>
            </div>
          </div>

          {/* Customer Panel */}
          <div className="bg-white p-10 rounded-[2.5rem] border border-indigo-50 shadow-sm transition-hover hover:shadow-md duration-300">
            <h3 className="text-indigo-600 font-bold mb-6 uppercase tracking-widest text-xs">
              {currentCustomer?.name}의 비전 (Customer)
            </h3>
            <div className="space-y-4">
              <p className="text-2xl font-medium leading-relaxed text-slate-800">
                {currentCustomer?.vision}
              </p>
              <div className="pt-6 flex items-center justify-between border-t border-slate-50">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${currentCustomer?.status === 'aligned' ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`} />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Status: {currentCustomer?.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-16 text-center">
          <button className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-indigo-200">
            <span className="flex items-center gap-2">
              1% 개선(Plus One) 등록하기
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </main>
  );
}
