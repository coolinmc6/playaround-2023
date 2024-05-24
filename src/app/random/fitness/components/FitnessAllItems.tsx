import React, { useState } from 'react';
import { FitnessEntry } from '@/app/random/fitness/types';
import { Card, Switch } from '@tremor/react';
import dayjs from 'dayjs';
import { type Item } from '@/app/random/fitness/types';
import { updateItem } from '@/app/random/fitness/helpers';
import { updateFitnessData } from '@/services/requests';
import { addToast } from '@/app/store/toast';

type FitnessAllItemsProps = {
  fitnessEntry: FitnessEntry;
  className?: string;
}

type FitnessSectionProps = {
  name: string;
  items: Item[];
  onSwitchClick: (item: Item) => void;
}

const FitnessSection = ({ name, items, onSwitchClick }: FitnessSectionProps) => {
  return (
    <div className="px-2">
      <h4 className="text-xl font-bold text-blue-700 mt-4">{name}</h4>
      {items.map((item) => (
        <div key={item.name} className="flex items-center justify-between py-1">
          <div className="flex-grow">
            {item.name}
          </div>
          <div className="w-15">
            <Switch checked={item.checked} onClick={() => onSwitchClick(item)} />
          </div>
        </div>
      ))}
    </div>
  );
}

const FitnessAllItems = ({ fitnessEntry, className }: FitnessAllItemsProps) => {
  const [data, setData] = useState(fitnessEntry);
  const friendlyDate = dayjs(fitnessEntry.date).format('dddd MMMM D, YYYY');

  const handleClick = (item: Item) => {
    item.checked = !item.checked;
    const newData = updateItem(data, item);
    setData(newData);
    updateFitnessData(newData).then((res) => {
      
      addToast({
        id: Math.random().toString(36).substring(7),
        open: true,
        severity: 'success',
        message: 'Data saved successfully'
      })
    
    }).catch(err => {
      console.log(err)
      
      addToast({
        id: Math.random().toString(36).substring(7),
        open: true,
        severity: 'error',
        message: 'Error saving data. Check if server is running.'
      })
    })
  }
  return (
    <Card className={className}>
      <h3 className="text-2xl">{friendlyDate}</h3>
      <div className="grid grid-cols-2 gap-2">
        <FitnessSection name="Fitness" onSwitchClick={handleClick} items={data.data.fitness} />
        <FitnessSection name="Nutrition" onSwitchClick={handleClick} items={data.data.nutrition} />
        <FitnessSection name="Other" onSwitchClick={handleClick} items={data.data.other} />
      </div>
    </Card>
  );
}

export default FitnessAllItems;
