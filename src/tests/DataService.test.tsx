import {
  fetchDataFromApi,
  fetchSingleUser,
  addNewUser,
} from '../services/DataService';
import * as usersApi from '../api/users/index';

jest.mock('../api/users/index', () => ({
  getAllUsers: jest.fn(),
  getUser: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
}));

describe('DataService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchDataFromApi', () => {
    it('fetches data from API and maps it correctly', async () => {

      const mockApiResponse = [{ ID: 1, Name: 'John Doe', Age: 25, Address: 'Some Address', Tags: 'tag1,tag2' }];
      const mockMappedData = [{ key: '1', Name: 'John Doe', Age: 25, Address: 'Some Address', Tags: ['tag1', 'tag2'] }];

      (usersApi.getAllUsers as jest.Mock).mockResolvedValueOnce(mockApiResponse);
      const result = await fetchDataFromApi();

      expect(usersApi.getAllUsers).toHaveBeenCalled();
      expect(result).toEqual(mockMappedData);
    });

    it('handles errors during data fetching', async () => {
      (usersApi.getAllUsers as jest.Mock).mockRejectedValueOnce(new Error('API error'));

      await expect(fetchDataFromApi()).rejects.toThrow('Error fetching data from API');
    });
  });

  describe('fetchSingleUser', () => {
    it('fetches a single user from API and maps it correctly', async () => {
      const userId = 1;
      const mockApiResponse = { ID: userId, Name: 'John Doe', Age: 25, Address: 'Some Address', Tags: 'tag1,tag2' };
      const mockMappedData = { key: userId.toString(), Name: 'John Doe', Age: 25, Address: 'Some Address', Tags: ['tag1', 'tag2'] };

      (usersApi.getUser as jest.Mock).mockResolvedValueOnce(mockApiResponse);
      const result = await fetchSingleUser(userId);

      expect(usersApi.getUser).toHaveBeenCalledWith(userId);
      expect(result).toEqual(mockMappedData);
    });

    it('handles errors during single user data fetching', async () => {
      const userId = 1;
      (usersApi.getUser as jest.Mock).mockRejectedValueOnce(new Error('API error'));

      await expect(fetchSingleUser(userId)).rejects.toThrow('Error fetching single user data from API');
    });
  });

});