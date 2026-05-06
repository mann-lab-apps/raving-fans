'use server';

import fs from 'fs/promises';
import path from 'path';
import { VisionStorage, VisionPair } from '@/types/vision';
import crypto from 'crypto';

const DATA_PATH = path.join(process.cwd(), '../data/visions.json');

export async function getVisions(): Promise<VisionStorage> {
  try {
    const content = await fs.readFile(DATA_PATH, 'utf-8');
    const data = JSON.parse(content);
    
    let needsUpdate = false;
    const updatedPairs = data.pairs.map((pair: any) => {
      if (!pair.uuid || !pair.createdAt) {
        needsUpdate = true;
        return {
          ...pair,
          uuid: pair.uuid || crypto.randomUUID(),
          createdAt: pair.createdAt || new Date().toISOString(),
          updatedAt: pair.updatedAt || new Date().toISOString(),
          version: pair.version || 1
        } as VisionPair;
      }
      return pair as VisionPair;
    });

    const finalData: VisionStorage = {
      ...data,
      pairs: updatedPairs,
      lastModified: data.lastModified || new Date().toISOString()
    };

    if (needsUpdate) {
      await updateVisions(finalData);
    }

    return finalData;
  } catch (error) {
    console.error('Failed to read visions.json:', error);
    throw new Error('데이터를 불러오는데 실패했습니다.');
  }
}

export async function updateVisions(data: VisionStorage): Promise<void> {
  try {
    const updatedData: VisionStorage = {
      ...data,
      lastModified: new Date().toISOString(),
    };
    await fs.writeFile(DATA_PATH, JSON.stringify(updatedData, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to write visions.json:', error);
    throw new Error('데이터 저장에 실패했습니다.');
  }
}

export async function addPersona(name: string): Promise<VisionStorage> {
  const data = await getVisions();
  const newPair: VisionPair = {
    id: `custom-${Date.now()}`,
    uuid: crypto.randomUUID(),
    name: name,
    providerVision: '새로운 제공자 비전을 입력하세요.',
    customerVision: '새로운 고객 비전을 입력하세요.',
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    version: 1
  };
  
  const updatedData = {
    ...data,
    pairs: [...data.pairs, newPair]
  };
  
  await updateVisions(updatedData);
  return updatedData;
}

export async function deletePersona(id: string): Promise<VisionStorage> {
  const data = await getVisions();
  const updatedData = {
    ...data,
    pairs: data.pairs.filter(p => p.id !== id)
  };
  
  await updateVisions(updatedData);
  return updatedData;
}

export async function renamePersona(id: string, newName: string): Promise<VisionStorage> {
  const data = await getVisions();
  const updatedData = {
    ...data,
    pairs: data.pairs.map(p => p.id === id ? { ...p, name: newName, updatedAt: new Date().toISOString() } : p)
  };
  
  await updateVisions(updatedData);
  return updatedData;
}
