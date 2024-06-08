import React from 'react';

import { Card, List, ListItem, ProgressCircle, Tracker, ProgressBar, Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@tremor/react';
import DailyFitnessCards from '@/app/random/fitness/components/FitnessRows/DailyFitnessCards';
import AllTimeFitnessCards from '@/app/random/fitness/components/FitnessRows/AllTimeFitnessCards';

const FitnessRows = () => {

  return (
    <Card className="m-2">
      <TabGroup>
        <TabList>
          <Tab>Today</Tab>
          <Tab>7 Days</Tab>
          <Tab>30 Days</Tab>
          <Tab>All Time</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <DailyFitnessCards />
          </TabPanel>
          <TabPanel>
            {/* TODO: Last 7 Days */}
            TBC
          </TabPanel>
          <TabPanel>
            {/* TODO: Last 30 Days */}
            TBC
          </TabPanel>
          <TabPanel>
            <AllTimeFitnessCards />    
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Card>
  )
}

export default FitnessRows;
