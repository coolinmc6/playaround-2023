import React from 'react';

import { Card, List, ListItem, ProgressCircle, Tracker, ProgressBar,
} from '@tremor/react';
import Badge from '@/core/Badge';
import { getProgressColor } from '@/app/random/fitness/helpers';

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

export default HighlightCard;
