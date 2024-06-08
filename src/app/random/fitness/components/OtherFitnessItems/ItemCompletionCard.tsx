import React from 'react';

import { useFitnessData } from '@/app/concepts/custom-hooks/hooks/useFitness';
import { Card, List, ListItem, ProgressCircle, Tracker, ProgressBar, Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@tremor/react';
import Badge from '@/core/Badge';
import { getBadgeType } from '@/app/random/fitness/helpers';
import { getProgressColor } from '@/app/random/fitness/helpers';

const ProgressRow = ({ item }: { item: any}) => {
  return (
    <div className="p-2 mt-2">
      <div className="pb-2">{item.type}</div>
      <div className="flex justify-between">
        <div className="px-4">
          <Badge type={getBadgeType(item.percentage)}>
            {item.percentage}%
          </Badge>
        </div>
        <ProgressBar value={item.percentage} color={getProgressColor(item.percentage)} />
      </div>
    </div>
  )
}

const mediumCardBaseRow = "grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4"

const ItemCompletionCards = () => {

  const { refined } = useFitnessData();
  console.log({ refined })
  const totalsByNameSevenDays = Object.keys(refined.totals.lastSevenDays.totalsByName).map((key) => {
    return {
      ...refined.totals.lastSevenDays.totalsByName[key],
      type: key
    }
  }).sort((a, b) => b.percentage - a.percentage)
  const totalsByNameThirtyDays = Object.keys(refined.totals.lastThirtyDays.totalsByName).map((key) => {
    return {
      ...refined.totals.lastThirtyDays.totalsByName[key],
      type: key
    }
  }).sort((a, b) => b.percentage - a.percentage)

  return (
    <div className={mediumCardBaseRow}>
      <Card >
        <Badge type="info">Last Seven Days</Badge>
        {totalsByNameSevenDays.map((object, index) => {
          return (
            <ProgressRow key={index} item={object} />
          )
        })}
      </Card>
      <Card >
        <Badge type="info">Last Thirty Days</Badge>
        {totalsByNameThirtyDays.map((object, index) => {
          return (
            <ProgressRow key={index} item={object} />
          )
        })}
      </Card>
    </div>
  )
}

export default ItemCompletionCards;
