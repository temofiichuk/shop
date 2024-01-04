import Cookies from "js-cookie";
import {
  AuthUserResponseType,
  EnumToken,
  TokensType,
  UserResponseType,
} from "@/types/auth.types";
import store from "@/store/store";

export const saveTokens = (data: TokensType) => {
  Cookies.set(EnumToken.ACCESS, data.accessToken);
  Cookies.set(EnumToken.REFRESH, data.refreshToken);
};

export const removeAuthData = () => {
  Cookies.remove(EnumToken.ACCESS);
  Cookies.remove(EnumToken.REFRESH);
  localStorage.removeItem("user");
  console.log("tokens and user removed from storage");
};

export const saveAuthDataToStorage = (data: AuthUserResponseType) => {
  saveTokens(data);
  localStorage.setItem("user", JSON.stringify(data.user));
  console.log("tokens and user saved to storage");
};

export const getAccessToken = () => Cookies.get(EnumToken.ACCESS) || null;
export const getRefreshToken = () => Cookies.get(EnumToken.REFRESH) || null;
