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
  AuthResponseType,
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

  login = async (inputs: LoginType, role: EnumUserRole) => {
    const query = role === EnumUserRole.USER ? USER_LOGIN : ADMIN_LOGIN;
    try {
      const { data } = await this.client.query({ query, variables: inputs });
      saveTokensToStorage(data[0]);
      return true;
    } catch (e) {
      return false;
    }
  };

  register = async (createUserInput: CreateUserType) => {
    try {
      const { data } = await this.client.query({
        query: USER_REGISTER,
        variables: createUserInput,
      });
      return data[0].message;
    } catch (e) {
      return false;
    }
  };

  updateTokens = async () => {
    const refreshToken = getRefreshToken();

    try {
      const { data }: ApolloQueryResult<{ authNewTokens: AuthResponseType }> =
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
