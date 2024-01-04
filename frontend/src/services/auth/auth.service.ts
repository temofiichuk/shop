import { GET_NEW_TOKENS } from "@/lib/graphql/queries";
import {
  getRefreshToken,
  removeAuthData,
  saveAuthDataToStorage,
} from "@/services/auth/auth.helper";
import { AuthUserResponseType } from "@/types/auth.types";
import { ApolloClient, ApolloQueryResult, InMemoryCache } from "@apollo/client";
import store from "@/store/store";
import { login, logout } from "@/store/features/auth.slice";

class AuthService {
  private client = new ApolloClient({
    uri: process.env.SERVER_URL,
    cache: new InMemoryCache(),
  });

  updateTokens = async () => {
    const refreshToken = getRefreshToken();
    try {
      const {
        data,
      }: ApolloQueryResult<{ authNewTokens: AuthUserResponseType }> =
        await this.client.query({
          query: GET_NEW_TOKENS,
          variables: { refreshToken },
        });
      saveAuthDataToStorage(data.authNewTokens);
      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  };

  login(authData: AuthUserResponseType) {
    saveAuthDataToStorage(authData);
    store.dispatch(login(authData.user));
  }

  logout() {
    removeAuthData();
    store.dispatch(logout());
  }
}

export default new AuthService();
