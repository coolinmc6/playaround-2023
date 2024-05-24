import React, { useState } from 'react';
import { FitnessEntry } from '@/app/random/fitness/types';
import { Card, Switch } from '@tremor/react';
import dayjs from 'dayjs';
import { type Item } from '@/app/random/fitness/types';
import { updateItem } from '@/app/random/fitness/helpers';

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
    <div>
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
    console.log(newData)
  }
  return (
    <div className={className}>
      <Card>
        <h3 className="text-2xl">{friendlyDate}</h3>
        <FitnessSection name="Fitness" onSwitchClick={handleClick} items={data.data.fitness} />
        <FitnessSection name="Nutrition" onSwitchClick={handleClick} items={data.data.nutrition} />
        <FitnessSection name="Other" onSwitchClick={handleClick} items={data.data.other} />
      </Card>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
}

export default FitnessAllItems;
