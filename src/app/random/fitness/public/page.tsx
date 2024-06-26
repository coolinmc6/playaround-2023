"use client"

import React, { useState } from 'react';
import { useFitnessData } from '@/app/concepts/custom-hooks/hooks/useFitness';
import { Card, List, ListItem, ProgressCircle, Tracker, ProgressBar, Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@tremor/react';
import Badge from '@/core/Badge';
import { getProgressColor } from '@/app/random/fitness/helpers';
import { getBadgeType } from '@/app/random/fitness/helpers';
import WeightTablePanel from '@/app/random/fitness/components/WeightTable';
import HighlightCard from '@/app/random/fitness/components/HighlightCard';
import FitnessRows from '@/app/random/fitness/components/FitnessRows/FitnessRows';
import ItemCompletionCards from '@/app/random/fitness/components/OtherFitnessItems/ItemCompletionCard';
import ToDoList from '@/app/random/fitness/components/OtherFitnessItems/ToDoList';

/*
Items to Build:
- calendar - progress each day
- Charts
- Totals by Type
*/

const smallCardBaseRow = "grid grid-cols-3 xl:grid-cols-4 gap-4 p-4"
const FitnessPublic = () => {

  const { refined } = useFitnessData();

  const trackerPercentage = refined?.trackerTotals?.dateCompletions.filter(d => d.color === 'green')?.length / refined?.trackerTotals?.dateCompletions?.length * 100

  return (
    <section className="base">
      <Card className="m-2">
        <TabGroup>
          <TabList>
            <Tab>Weight Table</Tab>
            <Tab>Other</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <WeightTablePanel />
            </TabPanel>
            <TabPanel>
              <Card className="p-2 m-4 max-w-2xl">
                <div className="flex justify-between">
                  <div className="text-2xl mb-2">Tracker Completion</div>
                  <div className="text-sm">
                    <Badge type={getBadgeType(trackerPercentage)}>
                      {trackerPercentage}%
                    </Badge>
                  </div>
                </div>
                <Tracker data={refined.trackerTotals.dateCompletions} />
              </Card>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Card>
      <FitnessRows />
      <ItemCompletionCards />
      <ToDoList />
    </section>
  );
}

export default FitnessPublic;
