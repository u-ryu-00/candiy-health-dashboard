import { generateId } from './index';

test('generateId', () => {
  const id = generateId();

  expect(id.length).toBe(32);
});
