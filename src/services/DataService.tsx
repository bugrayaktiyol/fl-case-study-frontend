import { getUsers, createUser as apiCreateUser, updateUser as apiUpdateUser, deleteUser as apiDeleteUser } from '../app/api/users/index';
import { ApiResponse, DataType } from '@/models/userModel';

export const fetchDataFromApi = async (): Promise<DataType[]> => {
  try {
    const data: ApiResponse[] = await getUsers();
    // Converting to key type for Ant Design Components
    const mappedData: DataType[] = data.map(({ ID, Name, Age, Address, Tags }) => ({
      key: ID,
      name: Name,
      age: Age,
      address: Address,
      tags: Tags || [],
    }));
    return mappedData;
  } catch (error) {
    console.error('Error fetching data from API:', error);
    throw new Error('Error fetching data from API');
  }
};

export const addNewUser = async (userData: DataType): Promise<void> => {
  try {
    // Creating user
    await apiCreateUser(userData);
  } catch (error) {
    console.error('Error adding new user:', error);
    throw new Error('Error adding new user');
  }
};

export const updateUser = async (id: string, updatedUserData: DataType): Promise<void> => {
  try {
     // Updating user
    await apiUpdateUser(id, updatedUserData);
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Error updating user');
  }
};

export const deleteUserById = async (id: string): Promise<void> => {
  try {
    // Deleting user
    await apiDeleteUser(id);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Error deleting user');
  }
};
