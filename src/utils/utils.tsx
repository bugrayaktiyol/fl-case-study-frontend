import { ApiResponse, DataType } from "@/models/userModel";


// Mapping api response data to the required data type for the table
export const mapData = (data: ApiResponse): DataType => {
  return {
    key: data.ID.toString(),
    Name: data.name,
    Age: data.age,
    Address: data.address,
    Tags: data.tags ? data.tags.split(',') : [],
  };
};
