import React from 'react';

import HighlightCard from '@/app/random/fitness/components/HighlightCard';
import { useFitnessData } from '@/app/concepts/custom-hooks/hooks/useFitness';

const AllTimeFitnessCards = () => {
  const { refined } = useFitnessData();
  console.log({ refined })
  const { fitness, nutrition, other } = refined.totalsByType
  const totals = [fitness, nutrition, other]
  const smallCardBaseRow = "grid grid-cols-3 xl:grid-cols-4 gap-4 p-4"

  return (
    <div className={smallCardBaseRow}>
      {totals.map((total) => {
        return (
          <HighlightCard 
            badge="All Time"
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

export default AllTimeFitnessCards;
