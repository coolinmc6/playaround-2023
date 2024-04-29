export const checkIfDateIsToday = (dateString) => {
  const dateObject = new Date(dateString);
  dateObject.setHours(0, 0, 0, 0); // Reset time part to midnight

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time part to midnight

  return dateObject.getTime() === today.getTime();
}

export const baseElements = {
  fitness: [],
  nutrition: [
    { name: 'baby carrots or vegetable serving', checked: false, type: 'nutrition' },
    {
      "name": "Log breakfast into MyFitnessPal",
      "checked": false,
      "type": "nutrition"
    },
    {
      "name": "Log lunch into MyFitnessPal",
      "checked": false,
      "type": "nutrition"
    },
    {
      "name": "Log dinner into MyFitnessPal",
      "checked": false,
      "type": "nutrition"
    },
    {
      "name": "Log snacks into MyFitnessPal",
      "checked": false,
      "type": "nutrition"
    }
  ],
  other: []
}

export const createBaseObject = () => {

  return {
    date: new Date().toISOString(),
    data: baseElements
  }
}
