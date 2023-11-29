import AuthService from "@/services/auth/auth.service";
import { getAccessToken } from "@/services/auth/auth.helper";

async function fetchWithReauthorization(
  input: URL | RequestInfo,
  init?: RequestInit | undefined
) {
  const response = await fetch(input, init);
  const data = await response.json();
  const error = data.errors[0];
  if (
    error.status === 401 ||
    error.message === "Unauthorized" ||
    error.message === "Jwt expired"
  ) {
    const isTokenUpdated = await AuthService.updateTokens();
    if (isTokenUpdated) {
      const headers = init?.headers as Record<string, string>;
      headers.authorization = `Bearer ${getAccessToken()}`;
    }
  }
  return fetch(input, init);
}

export default fetchWithReauthorization;
