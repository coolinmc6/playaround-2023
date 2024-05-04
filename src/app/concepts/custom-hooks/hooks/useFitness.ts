import React from 'react';
import fitnessData from '@server/data/fitness.json';

import { getDailyItems } from './fitness-helpers';

type FitnessItemType = {
  name: string;
  checked: boolean;
  type: 'fitness' | 'nutrition' | 'other';
}

const getTotalsByType = (items: any) => {
  const map = {
    fitness: {
      type: 'fitness',
      total: 0,
      completed: 0,
      percentage: 0
    },
    nutrition: {
      type: 'nutrition',
      total: 0,
      completed: 0,
      percentage: 0
    },
    other: {
      type: 'other',
      total: 0,
      completed: 0,
      percentage: 0
    },
  }

  items.forEach((item: FitnessItemType) => {
    map[item.type].total++
    if (item.checked) {
      map[item.type].completed++
    }
    map[item.type].percentage = Math.round((map[item.type].completed / map[item.type].total) * 100)
  })

  return map;
}

const getTotalsByName = (items: any) => {
  const map: any = {}

  items.forEach((item: FitnessItemType) => {
    const name = item.name.toLowerCase()
    if (!map[name]) {
      map[name] = {
        total: 0,
        completed: 0
      }
    }

    map[name].total++
    if (item.checked) {
      map[name].completed++
    }
  })

  return map;

}

export const useFitnessData = () => {
  const raw = fitnessData
  const { entries } = raw
  const dailyItems = entries.map(getDailyItems)
  const allItems = dailyItems.map((entry: any) => entry.items).flat()

  return {
    raw: {
      all: raw,
      entries,
    },
    refined: {
      dailyItems,
      allItems,
      totalsByType: getTotalsByType(allItems),
      totalsByName: getTotalsByName(allItems)
    }
  }
}
