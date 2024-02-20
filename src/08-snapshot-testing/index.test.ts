// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const input = [1, 2, 3, 4, 5];
    const generatedLinkedList = generateLinkedList(input);
    expect(generatedLinkedList).toMatchSnapshot();
  });

  test('should generate linked list from values 2', () => {
    const input = ['a', 'b', 'c'];
    const expectedLinkedList = {
      next: {
        next: {
          next: {
            next: null,
            value: null,
          },
          value: 'c',
        },
        value: 'b',
      },
      value: 'a',
    };
    expect(generateLinkedList(input)).toEqual(expectedLinkedList);
  });
});
