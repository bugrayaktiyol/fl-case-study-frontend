import { ApiResponse, DataType } from "@/models/userModel";


// Mapping api response data to the required data type for the table
export const mapData = (data: ApiResponse): DataType => {
  return {
    key: data.ID.toString(),
    Name: data.Name,
    Age: data.Age,
    Address: data.Address,
    Tags: data.Tags ? data.Tags.split(',') : [],
  };
};