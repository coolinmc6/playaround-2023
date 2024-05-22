"use client"

import React, { useState } from 'react';
import { useFitnessData } from '@/app/concepts/custom-hooks/hooks/useFitness';
import { Card, List, ListItem, ProgressCircle, Tracker, type Color, ProgressBar,  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
 } from '@tremor/react';
import Badge from '@/core/Badge';
import { getProgressColor } from '@/app/random/fitness/helpers';
import { getBadgeType } from '@/app/random/fitness/helpers';
import dayjs from 'dayjs';
import { IS_DEV } from '@/app/lib/helpers';

// https://www.tremor.so/docs/getting-started/installation - finish tremor install

type HighlightCardProps = {
  title: string;
  value: number;
  object: any;
  badge: string;
}

const HighlightCard = ({ title, value, object, badge }: HighlightCardProps) => {
  return (
    <Card className="grid grid-cols-3">
      <div className="col-span-2 relative h-full">
        <div className="text-4xl font-bold mb-2">{`${value}%`}</div>
        <div className="text-slate-500">{title.toUpperCase()}</div>
        <span className="absolute -bottom-4 -left-2">
          <Badge type="info" >{badge}</Badge>
        </span>
      </div>
      <ProgressCircle value={value} size="lg" color={getProgressColor(value)}>
        <div>{object.completed} of {object.total}</div>
      </ProgressCircle>
    </Card>
  );

}

/*
Items to Build:
- calendar - progress each day
- Charts
- Totals by Type
*/

const getDailies = (dailyHighlightCards: any) => {
  // console.log({ dailyHighlightCards})
  const { fitness, nutrition, other } = dailyHighlightCards.dailyTotalByType
  return [fitness, nutrition, other]
}



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

// const createEvent = ({ name, endDate }) => {
//   return {
//     name,
//   }
// }

type Event = {
  name: string;
  date: any;
  target: number;
  daysUntil: number;
  poundsPerWeek?: number;
}

const targets: Event[] = [
  { name: "Hangout", date: dayjs('2024-06-08'), target: 215, daysUntil: dayjs('2024-06-08').diff(dayjs(), 'days')},
  { name: "July 4th Weekend", date: dayjs('2024-07-04'), target: 205, daysUntil: dayjs('2024-07-04').diff(dayjs(), 'days')},
  { name: "SIC", date: dayjs('2024-08-07'), target: 195, daysUntil: dayjs('2024-08-07').diff(dayjs(), 'days')},
  { name: "Weigh-in", date: dayjs('2024-08-15'), target: 209, daysUntil: dayjs('2024-08-15').diff(dayjs(), 'days')},
]

const calculateTargets = (event: Event, current: number) => {

  const diff = current - event.target
  const daysUntil = event.date.diff(dayjs(), 'days')
  const poundsPerWeek = ((diff / daysUntil) * 7).toFixed(2)
  const dailyCalorieDeficit = (diff * 3500 / daysUntil).toFixed(2)

  return {
    ...event,
    daysUntil,
    poundsPerWeek,
    dailyCalorieDeficit
  }
}

type WeightTableProps = {
  headers: string[];
  data: any[];
}

const WeightTable = ({ headers, data }: WeightTableProps) => {
  
  return (
    <div className="mx-auto">
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header) => {
              return (
                <TableHeaderCell>{header}</TableHeaderCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => {
            return (
              <TableRow>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.date.format('MM/DD/YYYY')}</TableCell>
                <TableCell>{row.target}</TableCell>
                <TableCell>{row.poundsPerWeek}</TableCell>
                <TableCell>{row.dailyCalorieDeficit}</TableCell>
                <TableCell>{row.daysUntil} days left</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}


const smallCardBaseRow = "grid grid-cols-3 xl:grid-cols-4 gap-4 p-4"
const mediumCardBaseRow = "grid grid-cols-2 xl:grid-cols-3 gap-4 p-4"
const FitnessPublic = () => {
  const [scale, setScale] = useState({ target: 190, current: 220})

  const { refined, dailyHighlightCards } = useFitnessData();
  console.log({ refined })
  const { fitness, nutrition, other } = refined.totalsByType
  const totals = [fitness, nutrition, other]
  const dailies = getDailies(dailyHighlightCards)
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

  const eventList = targets.map((event) => calculateTargets(event, scale.current))
  const weightHeaders = ["Event", "Date", "Target", "Pounds Per Week", "Daily Calorie Deficit", "Days Until"]
  return (
    <div className="base">
      <div className="p-2">
        <div className="text-center">
          <label className="mr-2">Current</label>
          <input 
            type="number"
            min="180"
            max="230"
            step="1"
            value={scale.current}
            onChange={(e) => setScale({ ...scale, current: parseInt(e.target.value, 10)})}
          />
        </div>
        <WeightTable headers={weightHeaders} data={eventList} />
      </div>
      <div className={smallCardBaseRow}>
        {dailies.map((total) => {
            return (
              <HighlightCard 
                badge="Today"
                object={total}
                title={total.type}
                value={total.percentage}
                key={total.type}
              />
            )
          })}
      </div>
      <div className={smallCardBaseRow}>
        {totals.map((total) => {
          return (
            <HighlightCard 
              badge="All Time"
              object={total}
              title={total.type}
              value={total.percentage}
            />
          )
        })}
      </div>
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
      <div className={smallCardBaseRow}>
        <Card className="break-words">
          <List>
            <ListItem>Spark Chart</ListItem>
            <ListItem>Daily completion for each of fitness, nutrition, other</ListItem>
            <ListItem className="break-words">https://www.tremor.so/docs/visualizations/spark-charts</ListItem>
          </List>
        </Card>
      </div>
    </div>
  );
}

export default FitnessPublic;
