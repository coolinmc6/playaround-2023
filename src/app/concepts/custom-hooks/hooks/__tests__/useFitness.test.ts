// // Import necessary libraries
// import { renderHook } from '@testing-library/react';
// import { useFitnessData } from '@/app/concepts/custom-hooks/hooks/useFitness';
// import fitnessData from '@server/data/fitness.json';

// // Mock fitness data to control input data
// jest.mock('@server/data/fitness.json', () => ({
//   entries: [
//     {
//       "date": "2024-04-29T13:51:45.805Z",
//       "data": {
//         "fitness": [
//           {
//             "name": "Daily Elliptical",
//             "checked": true,
//             "type": "fitness"
//           },
//           {
//             "name": "Daily Abs",
//             "checked": true,
//             "type": "fitness"
//           },
//           {
//             "name": "Daily Kettlebells",
//             "checked": true,
//             "type": "fitness"
//           },
//           {
//             "name": "Lift",
//             "checked": false,
//             "type": "fitness"
//           }
//         ],
//         "nutrition": [
//           {
//             "name": "Baby carrots or vegetable serving",
//             "checked": true,
//             "type": "nutrition"
//           },
//           {
//             "name": "Log breakfast into MyFitnessPal",
//             "checked": true,
//             "type": "nutrition"
//           },
//           {
//             "name": "Log lunch into MyFitnessPal",
//             "checked": true,
//             "type": "nutrition"
//           },
//           {
//             "name": "Log dinner into MyFitnessPal",
//             "checked": false,
//             "type": "nutrition"
//           },
//           {
//             "name": "Log snacks into MyFitnessPal",
//             "checked": true,
//             "type": "nutrition"
//           }
//         ],
//         "other": [
//           {
//             "name": "Weigh self to get baseline",
//             "checked": true,
//             "type": "other"
//           },
//           {
//             "name": "No food after 9pm",
//             "checked": false,
//             "type": "other"
//           }
//         ]
//       }
//     },
//     {
//       "date": "2024-04-30T13:44:26.825Z",
//       "data": {
//         "fitness": [
//           {
//             "name": "Daily Elliptical",
//             "checked": true,
//             "type": "fitness"
//           },
//           {
//             "name": "Daily Abs",
//             "checked": false,
//             "type": "fitness"
//           },
//           {
//             "name": "Daily Kettlebells",
//             "checked": false,
//             "type": "fitness"
//           },
//           {
//             "name": "Lift",
//             "checked": false,
//             "type": "fitness"
//           }
//         ],
//         "nutrition": [
//           {
//             "name": "baby carrots or vegetable serving",
//             "checked": true,
//             "type": "nutrition"
//           },
//           {
//             "name": "Log breakfast into MyFitnessPal",
//             "checked": true,
//             "type": "nutrition"
//           },
//           {
//             "name": "Log lunch into MyFitnessPal",
//             "checked": true,
//             "type": "nutrition"
//           },
//           {
//             "name": "Log dinner into MyFitnessPal",
//             "checked": false,
//             "type": "nutrition"
//           },
//           {
//             "name": "Log snacks into MyFitnessPal",
//             "checked": true,
//             "type": "nutrition"
//           }
//         ],
//         "other": [
//           {
//             "name": "Weigh self to get baseline",
//             "checked": true,
//             "type": "other"
//           },
//           {
//             "name": "No food after 9pm",
//             "checked": false,
//             "type": "other"
//           }
//         ]
//       }
//     },
//   ]
// }));

// // Import helper functions
// // import { getDailyItems, getDateStats, getDateQueries, getTotalsByType, getTotalsByName } from '@/app/concepts/custom-hooks/hooks/fitness-helpers';

// // Mock individual helper functions if needed
// // jest.mock('@/app/concepts/custom-hooks/hooks/fitness-helpers', () => ({
// //   getDailyItems: jest.fn((entry) => ({
// //     date: entry.date,
// //     items: entry.items,
// //   })),
// //   getDateStats: jest.fn((entries) => ({
// //     firstDay: entries[0].date,
// //     lastDay: entries[entries.length - 1].date,
// //     days: entries.length,
// //   })),
// //   getDateQueries: jest.fn((entries) => ({
// //     lastDay: [entries[entries.length - 1]],
// //   })),
// //   getTotalsByType: jest.fn((items) => ({
// //     nutrition: items.filter(item => item.type === 'nutrition').length,
// //     fitness: items.filter(item => item.type === 'fitness').length,
// //   })),
// //   getTotalsByName: jest.fn((items) => ({
// //     'Nutrition 1': items.filter(item => item.name === 'Nutrition 1').length,
// //     'Fitness 1': items.filter(item => item.name === 'Fitness 1').length,
// //   })),
// // }));

// describe('useFitnessData', () => {
//   describe('raw property', () => {
//     it('raw.all is correct', () => {
//       const { result } = renderHook(() => useFitnessData());
//       expect(result.current.raw.all).toEqual(fitnessData);
//     })
//     it('raw.entries is correct', () => {
//       const { result } = renderHook(() => useFitnessData());
//       expect(result.current.raw.entries).toEqual(fitnessData.entries);
//     })
//   })

//   describe.skip('refined property', () => {
//     it('refined.dailyItems is correct', () => {

//       const { result } = renderHook(() => useFitnessData());
//       expect(result.current.refined.dailyItems).toEqual([
//         { date: '2024-01-01', data: fitnessData.entries[0].data },
//         { date: '2024-01-02', data: fitnessData.entries[1].data },
//       ]);
//     })
//   })
//   it.skip('should return the correct raw and refined data', () => {
//     const { result } = renderHook(() => useFitnessData());

//     expect(result.current.raw.all).toEqual(fitnessData);
//     expect(result.current.raw.entries).toEqual(fitnessData.entries);

//     expect(result.current.refined.dailyItems).toEqual([
//       { date: '2024-01-01', items: fitnessData.entries[0].items },
//       { date: '2024-01-02', items: fitnessData.entries[1].items },
//     ]);

//     expect(result.current.refined.allItems).toEqual([
//       ...fitnessData.entries[0].items,
//       ...fitnessData.entries[1].items,
//     ]);

//     expect(result.current.refined.totalsByType).toEqual({
//       nutrition: 2,
//       fitness: 0,
//     });

//     expect(result.current.refined.totalsByName).toEqual({
//       'Nutrition 1': 2,
//       'Fitness 1': 0
//     });

//     expect(result.current.dailyHighlightCards.dailyTotalByType).toEqual({
//       nutrition: 2,
//       fitness: 0,
//     });

//     expect(result.current.dateStats).toEqual({
//       firstDay: '2024-01-01',
//       lastDay: '2024-01-02',
//       days: 2,
//     });
//   });
// });
