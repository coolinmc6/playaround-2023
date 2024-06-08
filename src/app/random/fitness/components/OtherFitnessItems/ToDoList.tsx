import React from 'react';

import { Card, List, ListItem } from '@tremor/react';

const smallCardBaseRow = "grid grid-cols-3 xl:grid-cols-4 gap-4 p-4"

const ToDoList = () => {

  return (
    <div className={smallCardBaseRow}>
      <Card className="break-words">
        <List>
          <ListItem>Spark Chart</ListItem>
          <ListItem>Daily completion for each of fitness, nutrition, other</ListItem>
          <ListItem className="break-words">https://www.tremor.so/docs/visualizations/spark-charts</ListItem>
        </List>
      </Card>
    </div>
  )
}

export default ToDoList;
