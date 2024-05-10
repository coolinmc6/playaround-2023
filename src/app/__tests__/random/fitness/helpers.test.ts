import { generateDateRangeWithEntries } from "@/app/random/fitness/helpers";


describe('fitness helpers', () => {
  describe('generateDateRangeWithEntries', () => {
    it('should return an array of dates with entries', () => {
      // Arrange
      const start = '2021-01-01';
      const end = '2021-01-03';
      const entries = [
        { date: '2021-01-01', data: {} },
        { date: '2021-01-02', data: {} }
      ];

      // Act
      const result = generateDateRangeWithEntries(start, end, entries);

      // Assert
      expect(result).toEqual([
        { date: '2021-01-01', entry: { date: '2021-01-01', data: {} } },
        { date: '2021-01-02', entry: { date: '2021-01-02', data: {} } },
        { date: '2021-01-03', entry: null }
      ]);
    });
  })
})
