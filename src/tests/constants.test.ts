import { INPUT_VALUE } from '@constants';

test('INPUT_VALUE should exist and be a string', () => {
  expect(INPUT_VALUE).toBeDefined();
  expect(typeof INPUT_VALUE).toBe('string');
});
