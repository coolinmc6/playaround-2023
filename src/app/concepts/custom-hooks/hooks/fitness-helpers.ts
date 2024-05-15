import {
  type Entry,
  type FlatEntry,
  type FitnessItemType,
  type FitnessItemListedMap,
  type FitnessStatsMap,
  type FitnessStats,
  type FitnessItemsArray,
} from '@/app/concepts/custom-hooks/hooks/fitness-helper-types';

// Entry Object
export const getDailyItems = (entry: Entry): FlatEntry => {
  if (!entry) return { date: '', items: [] }
  const { date, data } = entry

  const items = [
    ...data.fitness,
    ...data.nutrition,
    ...data.other
  ]
  return {
    date,
    items
  }
}

// const filterEntriesByDate = (entries: Entry[], days: number): Entry[] => {
//   const now = new Date();
//   const daysInMilliseconds = days * 24 * 60 * 60 * 1000; 

//   return entries.filter(entry => {
//     const entryDate = new Date(entry.date);
//     const timeDifference = Math.abs(now.getTime() - entryDate.getTime()); 
//     return timeDifference <= daysInMilliseconds; 
//   });
// }

// Date List Object (has array of Entry Objects)
const filterEntriesByDate = (entries: Entry[], days: number): Entry[] => {
  const now = new Date();
  const daysInMilliseconds = days * 24 * 60 * 60 * 1000;
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  return entries.filter(entry => {
    const entryDate = new Date(entry.date);
    const entryDayStart = new Date(entryDate.getFullYear(), entryDate.getMonth(), entryDate.getDate()).getTime();
    const timeDifference = Math.abs(todayStart - entryDayStart);
    return timeDifference < daysInMilliseconds;
  });
};

export type DateQueries = {
  [key:string]: Entry[]
}

// Date List Object
export const getDateQueries = (entries: Entry[]): DateQueries => {
  return {
    lastDay: filterEntriesByDate(entries, 1),
    lastSevenDays: filterEntriesByDate(entries, 7),
    lastThirtyDays: filterEntriesByDate(entries, 30),
  }
}

export type DateQueryItems = {
  [key:string]: FlatEntry[]
}

export const getTotalsByDate = (dateQueries: DateQueries): DateQueryItems => {
  const object: DateQueryItems = {};
  
  Object.entries(dateQueries).forEach(([key, array]) => {
    object[key] = array.map(getDailyItems) as FlatEntry[];
  });

  console.log(object);
  return object;
};

type TotalsObject = {
  totalsByType: FitnessStatsMap;
  totalsByName: FitnessItemListedMap;
}

// const flattenItems = (items: FlatEntry[]) => {
//   return items.map(entry => entry.items).flat()
// }

// Date List Object
export const createAllTotalsObject = (items: FlatEntry[]): TotalsObject => {
  return {
    totalsByType: getTotalsByType(items.map(entry => entry.items).flat()),
    totalsByName: getTotalsByName(items.map(entry => entry.items).flat())
  }
}

/*************************************************************************/
// Fitness Stats Object
export const getTotalsByType = (items: FitnessItemsArray): FitnessStatsMap => {
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

  if (!items.length) {
    return map;
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

// Date List Object
export const getTotalsByName = (items: FitnessItemsArray): FitnessItemListedMap => {
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

  Object.keys(map).forEach((key) => {
    map[key].percentage = Math.round((map[key].completed / map[key].total) * 100)
  })

  return map;
}
