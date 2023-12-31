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

export type AuthUserResponseType = TokensType & {
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
  role: EnumUserRole;
};

export type CreateUserType = {
  name: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
};
