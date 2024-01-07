export interface ApiResponse {
  ID: number;
  Name: string;
  Age: number;
  Address: string;
  Tags: string;
}

export interface DataType {
  key: string;
  Name: string;
  Age: number;
  Address: string;
  Tags: string[]; // Since SQLITE does not support array type I stored it as an array manually for table display
}