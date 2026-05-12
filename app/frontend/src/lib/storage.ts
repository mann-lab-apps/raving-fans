'use client';

export interface VisionData {
  team: string;
  customer: string;
}

export interface SessionData {
  id: string;
  date: string;
  type: string;
  description: string;
  interest: number;
  productivity: number;
}

export interface RavingFansData {
  visions: VisionData;
  sessions: SessionData[];
}

const STORAGE_KEY = 'raving_fans_data';

const initialData: RavingFansData = {
  visions: {
    team: '',
    customer: '',
  },
  sessions: [],
};

export const getStoredData = (): RavingFansData => {
  if (typeof window === 'undefined') return initialData;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return initialData;
  
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error('Failed to parse stored data', e);
    return initialData;
  }
};

export const saveVision = (vision: Partial<VisionData>) => {
  const data = getStoredData();
  data.visions = { ...data.visions, ...vision };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const addSession = (session: Omit<SessionData, 'id' | 'date'>) => {
  const data = getStoredData();
  const newSession: SessionData = {
    ...session,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
  };
  data.sessions.push(newSession);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return newSession;
};

export const updateSession = (id: string, updates: Partial<SessionData>) => {
  const data = getStoredData();
  const index = data.sessions.findIndex(s => s.id === id);
  if (index !== -1) {
    data.sessions[index] = { ...data.sessions[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
};

export const deleteSession = (id: string) => {
  const data = getStoredData();
  data.sessions = data.sessions.filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
