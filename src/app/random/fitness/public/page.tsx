"use client"

import React from 'react';
import { useFitnessData } from '@/app/concepts/custom-hooks/hooks/useFitness';
import { Card, List, ListItem, ProgressCircle, Tracker, type Color } from '@tremor/react';
import Badge from '@/core/Badge';
import { getProgressColor } from '@/app/random/fitness/helpers';

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
  const { fitness, nutrition, other } = dailyHighlightCards.dailyTotalByType
  return [fitness, nutrition, other]
}

const smallCardBaseRow = "grid grid-cols-3 xl:grid-cols-4 gap-4 p-4"
const FitnessPublic = () => {

  const { refined, dailyHighlightCards } = useFitnessData();
  console.log(refined.totalsByDate)
  const { fitness, nutrition, other } = refined.totalsByType
  const totals = [fitness, nutrition, other]
  const dailies = getDailies(dailyHighlightCards)
  return (
    <div>
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
