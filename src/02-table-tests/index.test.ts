// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 5, b: 5, action: Action.Multiply, expected: 25 },
  { a: 25, b: 5, action: Action.Divide, expected: 5 },
  { a: 11, b: 2, action: Action.Exponentiate, expected: 121 },
  { a: 11, b: 2, action: 'k', expected: null },
  { a: '6', b: [1], action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests
  test.each(testCases)(
    'a action p = expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
  // Consider to use Jest table tests API to test all cases above
});
