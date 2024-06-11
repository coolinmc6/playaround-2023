export const checkIfDateIsToday = (dateString) => {
  const dateObject = new Date(dateString);
  dateObject.setHours(0, 0, 0, 0); // Reset time part to midnight

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time part to midnight

  return dateObject.getTime() === today.getTime();
}

export const baseElements = {
  fitness: [
    {
      "name": "Daily Elliptical",
      "checked": false,
      "type": "fitness"
    },
    {
      "name": "Daily Abs",
      "checked": false,
      "type": "fitness"
    },
    {
      "name": "Daily Kettlebells",
      "checked": false,
      "type": "fitness"
    },
    {
      "name": "Lift",
      "checked": false,
      "type": "fitness"
    },
    {
      "name": "50 Squats",
      "checked": false,
      "type": "fitness"
    },
    {
      "name": "Long plank",
      "checked": false,
      "type": "fitness"
    }
  ],
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
  other: [
    {
      "name": "Weigh self to get baseline",
      "checked": false,
      "type": "other"
    },
    {
      "name": "No food after 9pm",
      "checked": false,
      "type": "other"
    },
    {
      "name": "No alcohol",
      "checked": false,
      "type": "other"
    },
    {
      "name": "Creatine",
      "checked": false,
      "type": "other"
    }
  ]
}

export const createBaseObject = () => {
  return {
    date: new Date().toISOString(),
    data: baseElements
  }
}
