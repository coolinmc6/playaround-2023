"use client"

import React from 'react';
import { useFitnessData } from '@/app/concepts/custom-hooks/hooks/useFitness';
import { Card, ProgressCircle } from '@tremor/react';

type HighlightCardProps = {
  title: string;
  value: number;
  object: any;
}

const HighlightCard = ({ title, value, object }: HighlightCardProps) => {
  return (
    <Card className="grid grid-cols-3">
      <div className="col-span-2">
        <h3 className="text-4xl font-bold mb-2">{`${value}%`}</h3>
        <h2 className="text-slate-500">{title.toUpperCase()}</h2>
      </div>
      <ProgressCircle value={value} size="lg">
        <div>{object.completed} of {object.total}</div>
      </ProgressCircle>
    </Card>
  );

}

const FitnessPublic = () => {

  const { refined } = useFitnessData();
  const { fitness, nutrition, other } = refined.totalsByType
  const types = [fitness, nutrition, other]
  return (
    <div>
      <ul>
        <li>Calendar</li>
        <li>Totals</li>
        <li>Charts: https://www.tremor.so/docs/visualizations/bar-chart</li>
        <li>Update hook to generate stats</li>
      </ul>
      <div className="grid grid-cols-3 gap-4 p-4">
        {types.map((type) => {
          return (
            <HighlightCard title={type.type} value={type.percentage} object={type} />
          )
        })}
      </div>
    </div>
  );
}

export default FitnessPublic;
