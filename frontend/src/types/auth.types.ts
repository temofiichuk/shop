import { Simulate } from "react-dom/test-utils";
import input = Simulate.input;

export enum EnumAdminType {
  ADMIN = "ADMIN",
  ROOTADMIN = "ROOTADMIN",
}

export enum EnumUserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type TokensType = {
  accessToken: string;
  refreshToken: string;
};

export type AuthResponseType = TokensType & {
  user: UserResponseType;
};

export type UserResponseType = {
  id: number;
  name: string;
  email: string;
  role: EnumUserRole;
};

export enum EnumToken {
  ACCESS = "access_token",
  REFRESH = "refresh_token",
}

export type LoginType = {
  login: string;
  password: string;
};

export type CreateUserType = {
  name: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
};
