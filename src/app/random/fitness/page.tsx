"use client";

import React, { useEffect, useState } from 'react';

import { loadFitnessData, saveFitnessData } from '@/services/requests';
import { addToast } from '@/app/store/toast';
import FitnessCard from '@/app/random/fitness/components/FitnessCard';
import FitnessAllItems from '@/app/random/fitness/components/FitnessAllItems';
import {
  type ElementTypes,
  type FitnessEntry,
  type Item
} from '@/app/random/fitness/types';
import { updateItem } from '@/app/random/fitness/helpers';
import { baseEntry } from '@/app/random/fitness/constants';
import { useFitnessData } from '@/app/concepts/custom-hooks/hooks/useFitness';

const Fitness = () => {
  const [data, setData] = useState<FitnessEntry>(baseEntry)
  const [loading, setLoading] = useState(false);
  const { raw: { reversed } } = useFitnessData();

  useEffect(() => {
    loadFitnessData().then((res) => {
      
      setData(res.data)
    }).catch((err) => {
      
    })
  }, []);

  const handleSwitchClick = (item: Item) => {
    
    item.checked = !item.checked;
    const newData = updateItem(data, item);
    setData(newData);
    setLoading(true);

    saveFitnessData(newData).then((res) => {
      
      addToast({
        id: Math.random().toString(36).substring(7),
        open: true,
        severity: 'success',
        message: 'Data saved successfully'
      })
    
    }).catch(err => {
      
      addToast({
        id: Math.random().toString(36).substring(7),
        open: true,
        severity: 'error',
        message: 'Error saving data. Check if server is running.'
      })
    })
      .finally(() => {
        setLoading(false);
      })
  }

  const version1 = "grid grid-cols-1"

  return (
    <div className="min-h-screen p-12 m-auto max-w-7xl">
      <h1 className="text-2xl font-bold text-center mb-8">Fitness Logging: Today</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        <FitnessCard disabled={loading} title="Nutrition" items={data.data.nutrition} clickHandler={handleSwitchClick} />
        <FitnessCard disabled={loading} title="Fitness" items={data.data.fitness} clickHandler={handleSwitchClick} />
        <FitnessCard disabled={loading} title="Other" items={data.data.other} clickHandler={handleSwitchClick} />
      </div>
      <h1 className="text-2xl font-bold text-center my-8">History</h1>
      <div className={version1}>
        {reversed.map((entry, index) => {
          return (
            <FitnessAllItems fitnessEntry={entry} className="p-4 mb-6" key={index} />
          )
        })}
      </div>
    </div>
  )
}

export default Fitness;
