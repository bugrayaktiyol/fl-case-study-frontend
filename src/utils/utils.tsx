import { ApiResponse, DataType } from "@/models/userModel";


// Mapping api response data to the required data type for the table
export const mapData = (data: ApiResponse): DataType => {
  return {
    key: data.ID.toString(),
    Name: data.name,      // Use lowercase "name" instead of "Name"
    Age: data.age,        // Use lowercase "age" instead of "Age"
    Address: data.address, // Use lowercase "address" instead of "Address"
    Tags: data.tags ? data.tags.split(',') : [], // Use lowercase "tags" instead of "Tags"
  };
};
