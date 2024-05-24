import React from 'react';
import fitnessData from '@server/data/fitness.json';

import {
  getDailyItems,
  getDateQueries,
  getTotalsByType,
  getTotalsByName,
  getTotalsByDate,
  createAllTotalsObject,
} from '@/app/concepts/custom-hooks/hooks/fitness-helpers';

import {
  type Entry,
  type FlatEntry,
} from '@/app/concepts/custom-hooks/hooks/fitness-helper-types';

import DateListObject from '@/app/concepts/custom-hooks/hooks/DateListObject'

export const useFitnessData = () => {
  const raw = fitnessData
  const { entries } = raw
  const reversed = entries.concat().reverse()
  const dailyItems: FlatEntry[] = entries.map(getDailyItems)
  const allItems = dailyItems.map((entry: FlatEntry) => entry.items).flat()
  const dateInfo = getDateQueries(entries)

  const cleaned = getTotalsByDate(dateInfo)
  const dateListObject = new DateListObject(entries)
  console.log(dateListObject)
  return {
    
    raw: {
      all: raw,
      entries: entries as Entry[],
      reversed: reversed as Entry[],
    },
    refined: {
      dailyItems,
      allItems,
      totalsByType: getTotalsByType(allItems),
      totalsByName: getTotalsByName(allItems),
      totalsByDate: dateInfo,
      totalsByDateCleaned: cleaned,
      totals: {
        // lastDay: createAllTotalsObject(cleaned.lastDay.map(entry => entry.items).flat()),
        lastDay: createAllTotalsObject(cleaned.lastDay),
        lastSevenDays: createAllTotalsObject(cleaned.lastSevenDays),
        lastThirtyDays: createAllTotalsObject(cleaned.lastThirtyDays),
      }
    },
    dailyHighlightCards: {
      dailyTotalByType: getTotalsByType(getDailyItems(dateInfo.lastDay[0]).items),
      dailyTotalByName: getTotalsByName(getDailyItems(dateInfo.lastDay[0]).items),
    },
  }
}
