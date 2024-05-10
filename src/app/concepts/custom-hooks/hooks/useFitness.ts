import React from 'react';
import fitnessData from '@server/data/fitness.json';

import { getDailyItems, getDateStats, getDateQueries, getTotalsByType, getTotalsByName } from './fitness-helpers';

export const useFitnessData = () => {
  const raw = fitnessData
  const { entries } = raw
  const dailyItems = entries.map(getDailyItems)
  const allItems = dailyItems.map((entry: any) => entry.items).flat()
  const dateStats = getDateStats(entries)
  const dateInfo = getDateQueries(entries)

  return {
    raw: {
      all: raw,
      entries,
    },
    refined: {
      dailyItems,
      allItems,
      totalsByType: getTotalsByType(allItems),
      totalsByName: getTotalsByName(allItems),
      totalsByDate: getDateQueries(entries),
    },
    dailyHighlightCards: {
      dailyTotalByType: getTotalsByType(getDailyItems(dateInfo.lastDay[0]).items),
      dailyTotalByName: getTotalsByName(getDailyItems(dateInfo.lastDay[0]).items),
    },
    dateStats,
  }
}
