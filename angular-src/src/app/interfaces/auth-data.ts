export interface AuthData {
  success: boolean;
  msg: string;
  result: {
    id: string;
    name: string;
    username: string;
    email: string;
    token: string;
  };
}
