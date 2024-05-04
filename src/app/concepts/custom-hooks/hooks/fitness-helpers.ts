
export const getDailyItems = (entry: any) => {
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
