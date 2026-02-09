export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
}

export interface ApiResponse {
  message: string;
}

export interface User {
  id: number;
  username: string;
  role: string;
}