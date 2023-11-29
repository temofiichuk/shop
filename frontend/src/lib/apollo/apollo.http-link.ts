import { from, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getAccessToken } from "@/services/auth/auth.helper";
import fetchWithReauthorization from "@/lib/apollo/appolo.reathorization";

const httpLink = new HttpLink({
  uri: process.env.SERVER_URL,
  fetch: fetchWithReauthorization,
});

const authLink = setContext((_, { headers }) => {
  const token = getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export default from([authLink, httpLink]);
