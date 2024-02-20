import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  const mockGet = jest.fn().mockResolvedValueOnce({ data: { key: 'value' } });
  const mockedAxiosCreate = (axios.create as jest.Mock).mockReturnValueOnce({
    get: mockGet,
  });
  const relativePath = '/test';
  const baseURL = 'https://jsonplaceholder.typicode.com';

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(relativePath);

    expect(mockedAxiosCreate).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(relativePath);

    expect(mockedAxiosCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });

    expect(mockGet).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    jest.useFakeTimers();
    const response = await throttledGetDataFromApi(relativePath);
    expect(response).toEqual({ key: 'value' });
  });
});
