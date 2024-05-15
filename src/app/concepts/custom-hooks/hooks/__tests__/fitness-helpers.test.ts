import mockData from '@/app/concepts/custom-hooks/hooks/__tests__/mock-fitness.json';
import { getDailyItems } from '@/app/concepts/custom-hooks/hooks/fitness-helpers';


describe('fitness-helpers', () => {

  describe('getDailyItems', () => {
    it('should return an object with a date and items array', () => {
      const entry = mockData.entries[0];
      const result = getDailyItems(entry);
      expect(result).toHaveProperty('date');
      expect(result).toHaveProperty('items');
      expect(result.items).toHaveLength(11)
    })
  })

  describe('createAllTotalsObject', () => {
    it('should return an object with totalsByType and totalsByName', () => {
      const entry = mockData.entries[0];
      const result = getDailyItems(entry);
      expect(result).toHaveProperty('date');
      expect(result).toHaveProperty('items');
      expect(result.items).toHaveLength(11)
    })
  })
})
  