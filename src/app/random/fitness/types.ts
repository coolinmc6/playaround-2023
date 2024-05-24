export type Item = {
  name: string;
  checked: boolean;
  type: 'nutrition' | 'fitness' | 'other';
}

export type ElementTypes = {
  fitness: Item[];
  nutrition: Item[];
  other: Item[];
}

export type FitnessEntry = {
  date: string;
  data: ElementTypes;
}
