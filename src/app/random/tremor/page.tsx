import React from 'react';
import BasicLayout from '@/app/layouts/BasicLayout';
import { Card, Tracker, type Color } from '@tremor/react';

const colors: Color[] = [
  "red", "orange", "yellow", "green", "slate", "gray", "zinc", "neutral", 
  "stone", "amber", "lime", "emerald", "teal", "cyan", "sky", "blue", 
  "indigo", "violet", "purple", "fuchsia", "pink", "rose"
];

interface Tracker {
  color: Color;
  tooltip: string;
}

const createData = colors.map((color) => {
  return {
    color,
    tooltip: color
  }
})

const data: Tracker[] = createData;

const myScale = [
  { color: "red", tooltip: "Less than 50%" },
  { color: "orange", tooltip: "Less than 70%" },
  { color: "yellow", tooltip: "70% - 90%" },
  { color: "green", tooltip: "90% or greater%" },
]

const TremorPlayground = () => {
  return (
    <BasicLayout>
      <h1 className="text-4xl font-bold">Tremor Playground</h1>
      <div className="p-2">
        <Card className="max-w-xl">
          <p className="text-tremor-default flex items-center justify-between">
            <span className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">example.com</span>
            <span className="text-tremor-content dark:text-dark-tremor-content">uptime 99.1%</span>
          </p>
          <Tracker data={data} className="mt-2" />
        </Card>
        <Card className="max-w-md mt-4">
          <p>Understanding the scale</p>
          <Tracker data={myScale} className="mt-2" />
        </Card>
      </div>
    </BasicLayout>
  )
}

export default TremorPlayground;
