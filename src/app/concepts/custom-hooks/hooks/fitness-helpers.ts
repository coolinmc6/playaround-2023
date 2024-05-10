type Entry = {
  date: string;
  data: any; 
}

type FlatEntry = {
  date: string;
  items: FitnessItemType[];
}

export type FitnessItemType = {
  name: string;
  checked: boolean;
  type: 'fitness' | 'nutrition' | 'other';
}

type FitnessItemsArray = FitnessItemType[]

type FitnessStats = {
  type: string;
  total: number;
  completed: number;
  percentage: number;
}

type FitnessStatsMap = {
  fitness: FitnessStats;
  nutrition: FitnessStats;
  other: FitnessStats;
}

type FitnessItemListedMap = {
  [key: string]: {
    total: number;
    completed: number;
  }

}

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

const filterEntriesByDate = (entries: Entry[], days: number): Entry[] => {
  const now = new Date();
  const daysInMilliseconds = days * 24 * 60 * 60 * 1000; 

  return entries.filter(entry => {
    const entryDate = new Date(entry.date);
    const timeDifference = Math.abs(now.getTime() - entryDate.getTime()); 
    return timeDifference <= daysInMilliseconds; 
  });
}

export const getDateQueries = (entries: Entry[]) => {
  return {
    lastDay: filterEntriesByDate(entries, 1),
    lastSevenDays: filterEntriesByDate(entries, 7),
    lastThirtyDays: filterEntriesByDate(entries, 30),
  }
}

export const getDateStats = (entries: Entry[]) => {
  return {
    totalNumberOfdays: entries.length,
  }
}

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

export const getTotalsByName = (items: FitnessItemType[]): FitnessItemListedMap => {
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
