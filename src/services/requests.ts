import request from './base-request'

import { FITNESS } from './constants'

export const loadFitnessData = async () => {
  return request.get(FITNESS.LOAD_DATA)
}

export const saveFitnessData = async (data: any) => {
  return request.post(FITNESS.SAVE_DATA, data)
}
