import { generateId, sortOverviewListByDate } from './index';

test('generateId', () => {
  const id = generateId();

  expect(id.length).toBe(32);
});

test('sortOverviewListByDate', () => {
  const overviewList = [
    { checkupDate: '2024-01-01' },
    { checkupDate: '2025-06-01' },
    { checkupDate: '2023-01-01' },
  ];

  const sortedList = sortOverviewListByDate(overviewList);

  expect(sortedList).toEqual([
    { checkupDate: '2023-01-01' },
    { checkupDate: '2024-01-01' },
    { checkupDate: '2025-06-01' },
  ]);
});
