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
  Tags: string[];
}