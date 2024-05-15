export type Entry = {
  date: string;
  data: any; 
}

export type FlatEntry = {
  date: string;
  items: FitnessItemType[];
}

export type FitnessItemType = {
  name: string;
  checked: boolean;
  type: 'fitness' | 'nutrition' | 'other';
}

export type FitnessItemsArray = FitnessItemType[]

export type FitnessStats = {
  type: string;
  total: number;
  completed: number;
  percentage: number;
}

export type FitnessStatsMap = {
  fitness: FitnessStats;
  nutrition: FitnessStats;
  other: FitnessStats;
}

export type FitnessItemListedMap = {
  [key: string]: {
    total: number;
    completed: number;
    percentage: number;
  }

}
