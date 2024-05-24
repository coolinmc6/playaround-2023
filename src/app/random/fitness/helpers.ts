import { type FitnessEntry, type Item } from "@/app/random/fitness/types";

export const getBadgeType = (percentCompleted: number) => {
  if (percentCompleted < 25) {
    return 'danger';
  } else if (percentCompleted < 50) {
    return 'warning';
  } else if (percentCompleted < 76) {
    return 'warning';
  } else {
    return 'success';
  }
}

export const getProgressColor = (percentCompleted: number) => {
  if (percentCompleted < 25) {
    return 'red';
  } else if (percentCompleted < 50) {
    return 'orange';
  } else if (percentCompleted < 76) {
    return 'yellow';
  } else {
    return 'green';
  }
}

export const generateDateRangeWithEntries = (start: string, end: string, entries: any[]) => {
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  const oneDay = 24 * 60 * 60 * 1000;
  const dateEntriesMap = new Map(entries.map(entry => [entry.date, entry]));

  const result = [];
  for (let currentTime = startTime; currentTime <= endTime; currentTime += oneDay) {
    const currentDateString = new Date(currentTime).toISOString().split('T')[0];
    result.push({
      date: currentDateString,
      entry: dateEntriesMap.get(currentDateString) || null
    });
  }

  return result;
}


export const updateItem  = (baseState: FitnessEntry, update: Item): FitnessEntry => {
  const newState = {
    date: baseState.date,
    data: {
      fitness: [...baseState.data.fitness],
      nutrition: [...baseState.data.nutrition],
      other: [...baseState.data.other]
    }
  };

  const category = update.type;

  const index = newState.data[category].findIndex(item => item.name === update.name);
  if (index !== -1) {
    newState.data[category][index] = { ...newState.data[category][index], ...update };
  } else {
    newState.data[category].push(update);
  }

  return newState;
}
