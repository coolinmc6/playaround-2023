import React from 'react';
import { Card, Switch } from '@tremor/react';

import Badge from '@/core/Badge';
import { getBadgeType } from '@/app/random/fitness/helpers';
import { type Item } from '@/app/random/fitness/types';

type FitnessCardProps = {
  clickHandler: (item: Item) => void;
  disabled: boolean;
  items: Item[];
  title: string;
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
              <div className="w-15 pl-2">
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

export default FitnessCard
