import Cookies from "js-cookie";
import { AuthResponseType, EnumToken, TokensType } from "@/types/auth.types";

export const saveTokens = (data: TokensType) => {
  Cookies.set(EnumToken.ACCESS, data.accessToken);
  Cookies.set(EnumToken.REFRESH, data.refreshToken);
  console.log("tokens saved to storage");
};

export const removeTokens = () => {
  Cookies.remove(EnumToken.ACCESS);
  Cookies.remove(EnumToken.REFRESH);
  localStorage.removeItem("user");
  console.log("tokens removed from storage");
};

export const saveTokensToStorage = (data: AuthResponseType) => {
  saveTokens(data);
  localStorage.removeItem("user");
  localStorage.setItem("user", JSON.stringify(data.user));
};

export const getAccessToken = () => Cookies.get(EnumToken.ACCESS) || null;
export const getRefreshToken = () => Cookies.get(EnumToken.REFRESH) || null;
