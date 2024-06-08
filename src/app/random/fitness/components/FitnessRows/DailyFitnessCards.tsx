import React from 'react';

import HighlightCard from '@/app/random/fitness/components/HighlightCard';
import { useFitnessData } from '@/app/concepts/custom-hooks/hooks/useFitness';

const getDailies = (dailyHighlightCards: any) => {
  // console.log({ dailyHighlightCards})
  const { fitness, nutrition, other } = dailyHighlightCards.dailyTotalByType
  return [fitness, nutrition, other]
}

const DailyFitnessCards = () => {
  const smallCardBaseRow = "grid grid-cols-3 xl:grid-cols-4 gap-4 p-4"
  const { dailyHighlightCards } = useFitnessData();
  const dailies = getDailies(dailyHighlightCards)
  return (
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
  )
}

export default DailyFitnessCards;
