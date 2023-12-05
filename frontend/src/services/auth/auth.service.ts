import {
  ADMIN_LOGIN,
  GET_NEW_TOKENS,
  USER_LOGIN,
  USER_REGISTER,
} from "@/lib/graphql/queries";
import {
  getRefreshToken,
  removeTokens,
  saveTokensToStorage,
} from "@/services/auth/auth.helper";
import {
  AuthUserResponseType,
  CreateUserType,
  EnumUserRole,
  LoginType,
} from "@/types/auth.types";
import { ApolloClient, ApolloQueryResult, InMemoryCache } from "@apollo/client";

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
      saveTokensToStorage(data.authNewTokens);
      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  };

  logout() {
    removeTokens();
  }
}

export default new AuthService();
