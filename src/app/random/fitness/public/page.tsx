"use client"

import React from 'react';
import { useFitnessData } from '@/app/concepts/custom-hooks/hooks/useFitness';
import { Card, List, ListItem, ProgressCircle } from '@tremor/react';
import Badge from '@/core/Badge';

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
      <ProgressCircle value={value} size="lg">
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

const smallCardBaseRow = "grid grid-cols-3 gap-4 p-4"
const FitnessPublic = () => {

  const { refined, dailyHighlightCards } = useFitnessData();
  console.log(dailyHighlightCards)
  const { fitness, nutrition, other } = refined.totalsByType
  const totals = [fitness, nutrition, other]
  const dailies = [dailyHighlightCards.dailyTotalByType.fitness, dailyHighlightCards.dailyTotalByType.nutrition, dailyHighlightCards.dailyTotalByType.other]
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
