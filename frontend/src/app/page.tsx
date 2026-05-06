'use client';

import { useState, useEffect } from 'react';
import { getVisions, updateVisions, addPersona, deletePersona, renamePersona } from './actions';
import { VisionPair, VisionStorage } from '@/types/vision';

export default function Home() {
  const [data, setData] = useState<VisionStorage | null>(null);
  const [activeTab, setActiveTab] = useState<string>('self');
  const [isLoading, setIsLoading] = useState(false);

  // Persona states
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [editingNameId, setEditingNameId] = useState<string | null>(null);
  const [tempName, setTempName] = useState('');

  // Edit states
  const [editingProvider, setEditingProvider] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(false);
  const [tempVision, setTempVision] = useState('');

  const fetchData = async () => {
    try {
      const json = await getVisions();
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

  const handleAddPersona = async () => {
    if (!newName.trim()) return;
    setIsLoading(true);
    try {
      const updatedData = await addPersona(newName.trim());
      setData(updatedData);
      setActiveTab(updatedData.pairs[updatedData.pairs.length - 1].id);
      setIsAdding(false);
      setNewName('');
    } catch (err) {
      console.error('Failed to add persona:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePersona = async (id: string) => {
    if (!window.confirm('정말 삭제하시겠습니까? 관련 비전 데이터가 모두 사라집니다.')) return;
    setIsLoading(true);
    try {
      const updatedData = await deletePersona(id);
      setData(updatedData);
      if (activeTab === id) {
        setActiveTab(updatedData.pairs[0]?.id || '');
      }
    } catch (err) {
      console.error('Failed to delete persona:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRenamePersona = async () => {
    if (!editingNameId || !tempName.trim()) {
      setEditingNameId(null);
      return;
    }
    setIsLoading(true);
    try {
      const updatedData = await renamePersona(editingNameId, tempName.trim());
      setData(updatedData);
      setEditingNameId(null);
    } catch (err) {
      console.error('Failed to rename persona:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (target: 'provider' | 'customer') => {
    if (!data) return;

    setIsLoading(true);
    
    // 불변성을 유지하며 데이터 업데이트
    const updatedPairs = data.pairs.map((p) => {
      if (p.id === activeTab) {
        return {
          ...p,
          [target === 'provider' ? 'providerVision' : 'customerVision']: tempVision,
          updatedAt: new Date().toISOString(),
        } as VisionPair;
      }
      return p;
    });

    const newData: VisionStorage = { ...data, pairs: updatedPairs };

    if (target === 'provider') setEditingProvider(false);
    else setEditingCustomer(false);

    try {
      await updateVisions(newData);
      setData(newData);
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
        <div className="flex flex-wrap gap-3 mb-10 pb-4 justify-center">
          {data.pairs.map((pair) => (
            <div key={pair.id} className="relative group">
              <div
                className={`px-8 py-3 rounded-2xl font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  activeTab === pair.id
                    ? 'bg-slate-900 text-white shadow-xl scale-105'
                    : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
                }`}
                onClick={() => {
                  setActiveTab(pair.id);
                  setEditingProvider(false);
                  setEditingCustomer(false);
                }}
              >
                {editingNameId === pair.id ? (
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="bg-transparent border-b border-blue-400 focus:outline-none w-24 text-center"
                    autoFocus
                    onBlur={handleRenamePersona}
                    onKeyDown={(e) => e.key === 'Enter' && handleRenamePersona()}
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <span>{pair.name}</span>
                )}
              </div>
              
              {/* Rename Badge (Left) */}
              {editingNameId !== pair.id && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingNameId(pair.id);
                    setTempName(pair.name);
                  }}
                  className="absolute -top-2 -left-2 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-blue-600 z-10"
                >
                  ✎
                </button>
              )}

              {/* Delete Badge (Right) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeletePersona(pair.id);
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600 z-10"
              >
                ✕
              </button>
            </div>
          ))}
          
          {isAdding ? (
            <div className="flex gap-2 items-center bg-white p-2 rounded-2xl border border-blue-200 shadow-sm animate-in fade-in slide-in-from-left-2">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="대상 이름"
                className="px-4 py-2 rounded-xl border border-slate-100 focus:outline-none focus:border-blue-400 text-sm font-bold"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleAddPersona()}
              />
              <button onClick={handleAddPersona} disabled={isLoading} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700">추가</button>
              <button onClick={() => setIsAdding(false)} className="px-4 py-2 bg-slate-100 text-slate-400 rounded-xl text-xs font-bold hover:bg-slate-200">취소</button>
            </div>
          ) : (
            <button
              onClick={() => setIsAdding(true)}
              className="px-6 py-3 rounded-2xl font-bold bg-white text-slate-300 border-2 border-dashed border-slate-200 hover:border-blue-400 hover:text-blue-500 transition-all"
            >
              + 추가
            </button>
          )}
        </div>

        {/* Side-by-Side Comparison */}
        <div className="grid md:grid-cols-2 gap-10 items-stretch">
          
          {/* Provider Vision Panel */}
          <div className="bg-white p-12 rounded-[3rem] border border-blue-50 shadow-sm relative group">
            <div className="flex justify-between items-start mb-8">
              <h3 className="text-blue-600 font-bold uppercase tracking-widest text-xs">나의 비전 (Provider)</h3>
              <div className="flex gap-4">
                {!editingProvider && (
                  <button 
                    onClick={() => { setEditingProvider(true); setTempVision(currentPair?.providerVision || ''); }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-blue-600 font-bold text-sm underline underline-offset-4"
                  >
                    Edit
                  </button>
                )}
              </div>
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

      </div>
    </main>
  );
}
