import { type ElementTypes, type FitnessEntry } from '@/app/random/fitness/types';

export const baseElements: ElementTypes = {
  fitness: [],
  nutrition: [],
  other: []
}

export const baseEntry: FitnessEntry = {
  date: new Date().toISOString(),
  data: baseElements
}
