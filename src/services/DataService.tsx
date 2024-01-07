import {
  getUser,
  getAllUsers,
  createUser as apiCreateUser,
  updateUser as apiUpdateUser,
  deleteUser as apiDeleteUser,
} from "../api/users/index";
import { ApiResponse, DataType } from "@/models/userModel";
import { mapData } from "../utils/utils";

// Fetch data from API
export const fetchDataFromApi = async (): Promise<DataType[]> => {
  try {
    const data: ApiResponse[] = await getAllUsers();
    // Map data using the common mapping function
    const mappedData: DataType[] = data.map(mapData);
    return mappedData;
  } catch (error) {
    console.error("Error fetching data from API:", error);
    throw new Error("Error fetching data from API");
  }
};

// Fetch single user data
export const fetchSingleUser = async (id: number): Promise<DataType> => {
  try {
    const data: ApiResponse = await getUser(id);
    // Map data using the common mapping function
    const mappedData: DataType = mapData(data);
    return mappedData;
  } catch (error) {
    console.error("Error fetching single user data from API:", error);
    throw new Error("Error fetching single user data from API");
  }
};

export const addNewUser = async (userData: ApiResponse): Promise<void> => {
  try {
    await apiCreateUser(userData);
  } catch (error) {
    console.error("Error adding new user:", error);
    throw new Error("Error adding new user");
  }
};

export const updateUser = async (
  id: Number,
  updatedUserData: DataType
): Promise<void> => {
  try {
    await apiUpdateUser(id, updatedUserData);
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Error updating user");
  }
};

export const deleteUserById = async (id: string): Promise<void> => {
  try {
    await apiDeleteUser(id);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Error deleting user");
  }
};
