"use client";

import React, { useEffect, useState } from 'react';

import { loadFitnessData, saveFitnessData } from '@/services/requests';
import { Card, Switch } from '@tremor/react';
import { addToast } from '@/app/store/toast';
import Badge from '@/core/Badge';
import { getBadgeType } from '@/app/random/fitness/helpers';

type Item = {
  name: string;
  checked: boolean;
  type: 'nutrition' | 'fitness' | 'other';
}

type ElementTypes = {
  fitness: Item[];
  nutrition: Item[];
  other: Item[];
}

type FitnessEntry = {
  date: string;
  data: ElementTypes;
}

const baseElements: ElementTypes = {
  fitness: [],
  nutrition: [],
  other: []
}

const baseEntry: FitnessEntry = {
  date: new Date().toISOString(),
  data: baseElements
}


type FitnessCardProps = {
  clickHandler: (item: Item) => void;
  disabled: boolean;
  items: Item[];
  title: string;
}

function updateItem(baseState: FitnessEntry, update: Item): FitnessEntry {
  // Copy the state to avoid direct mutation
  const newState = {
    date: baseState.date,
    data: {
      fitness: [...baseState.data.fitness],
      nutrition: [...baseState.data.nutrition],
      other: [...baseState.data.other]
    }
  };

  // Determine which category to update based on the item type
  const category = update.type;

  // Find and update the item
  const index = newState.data[category].findIndex(item => item.name === update.name);
  if (index !== -1) {
    newState.data[category][index] = { ...newState.data[category][index], ...update };
  } else {
    // Optionally handle the case where the item is not found; for now, we can add it
    newState.data[category].push(update);
  }


  return newState;
}

const FitnessCard = ({ title, items, clickHandler, disabled = false }: FitnessCardProps) => {
  const handleSwitchClick = (item: Item) => () => {
    clickHandler(item);
  }

  const itemsCompleted = items.filter(item => item.checked).length;
  const itemsTotal = items.length;
  const percentCompleted = itemsTotal ? Math.round((itemsCompleted / itemsTotal) * 100) : 0;
  const badgeType = getBadgeType(percentCompleted);
  return (
    <Card className="relative">
      <h2 className="font-bold text-center text-xl mb-4">{title}</h2>
      <span className="absolute top-2 right-2">
        <Badge type={badgeType}>{percentCompleted}%</Badge>
      </span>
      <div>
        {items.length ? items.map((item) => {
          return (
            <div key={item.name} className="flex items-center justify-between py-1">
              <div className="flex-grow">
                {item.name}
              </div>
              <div className="w-15">
                <Switch checked={item.checked} onClick={handleSwitchClick(item)} />
              </div>
            </div>
          )
        }) : <p className="text-center">No items found</p>}
      </div>
      <div className="m-12"></div>
      <div className="mt-8 absolute bottom-0 left-0 w-full p-2">
        <p className="text-center">{itemsCompleted} of {itemsTotal} completed</p>
        <div className="bg-gray-200 h-2 rounded-full mt-2">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${percentCompleted}%` }}></div>
        </div>
      </div>
    </Card>
  )
}

const Fitness = () => {
  const [data, setData] = useState<FitnessEntry>(baseEntry)
  const [loading, setLoading] = useState(false);
  

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

  return (
    <div className="min-h-screen p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        <FitnessCard disabled={loading} title="Nutrition" items={data.data.nutrition} clickHandler={handleSwitchClick} />
        <FitnessCard disabled={loading} title="Fitness" items={data.data.fitness} clickHandler={handleSwitchClick} />
        <FitnessCard disabled={loading} title="Other" items={data.data.other} clickHandler={handleSwitchClick} />
      </div>
    </div>
  )
}

export default Fitness;
