// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = { a: 2, b: 2, action: Action.Add };
    expect(simpleCalculator(input)).toBe(4);
  });

  test('should subtract two numbers', () => {
    const input = { a: 2, b: 2, action: Action.Subtract };
    expect(simpleCalculator(input)).toBe(0);
  });

  test('should multiply two numbers', () => {
    const input = { a: 5, b: 5, action: Action.Multiply };
    expect(simpleCalculator(input)).toBe(25);
  });

  test('should divide two numbers', () => {
    const input = { a: 25, b: 5, action: Action.Divide };
    expect(simpleCalculator(input)).toBe(5);
  });

  test('should exponential two numbers', () => {
    const input = { a: 11, b: 2, action: Action.Exponentiate };
    expect(simpleCalculator(input)).toBe(121);
  });

  test('should return null for invalid action', () => {
    const input = { a: 11, b: 2, action: 'k' };
    expect(simpleCalculator(input)).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const input = { a: '6', b: [1], action: Action.Add };
    expect(simpleCalculator(input)).toBe(null);
  });
});
