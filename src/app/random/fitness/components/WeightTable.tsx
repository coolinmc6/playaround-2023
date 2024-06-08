import React, { useState } from 'react';

import { Card, List, ListItem, ProgressCircle, Tracker, type Color, ProgressBar, Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react';
import dayjs from 'dayjs';

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
            {headers.map((header, index) => {
              return (
                <TableHeaderCell key={`${header}-${index}`}>{header}</TableHeaderCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => {
            return (
              <TableRow key={`${row.name}-${index}`}>
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

type Event = {
  name: string;
  date: any;
  target: number;
  daysUntil: number;
  poundsPerWeek?: number;
}

const targets: Event[] = [
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

const WeightTablePanel = () => {
  const [scale, setScale] = useState({ target: 190, current: 220})

  const eventList = targets.map((event) => calculateTargets(event, scale.current))
  const weightHeaders = ["Event", "Date", "Target", "Pounds Per Week", "Daily Calorie Deficit", "Days Until"]
  
  return (<div className="p-2">
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
  )
}

export default WeightTablePanel
