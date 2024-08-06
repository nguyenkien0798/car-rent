export interface RootAuth {
  isLoadingRegister?: boolean;
  isRegister: string;
  messageRegister: string;
  isLoadingLogin?: boolean;
  isLogin: string;
  isLoadingVerifyEmail: boolean;
  isVerifyEmail: string;
  user?: User;
}

export interface Register {
  full_name: string;
  email: string;
  password: string;
}

export interface Response {
  success: boolean;
  message: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
}
