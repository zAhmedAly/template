export interface AuthData {
  success: boolean;
  msg: string;
  result: {
    id: string;
    name: string;
    email: string;
    role: string;
    token: string;
  };
}
