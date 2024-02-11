jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    ...originalModule,
    mockOne: jest.fn(() => null),
    mockTwo: jest.fn(() => null),
    mockThree: jest.fn(() => null),
  };
});
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation();
    mockOne();
    mockTwo();
    mockThree();
    expect(logSpy).toHaveBeenCalledTimes(0);
  });

  test('unmockedFunction should log into console', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation();

    unmockedFunction();
    expect(logSpy).toHaveBeenCalledTimes(1);
  });
});
