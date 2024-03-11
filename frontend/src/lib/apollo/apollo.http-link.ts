import { from, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { getAccessToken } from "@/services/auth/auth.helper";
import errorLink from "@/lib/apollo/apollo.error-link";
import { removeTypenameFromVariables } from "@apollo/client/link/remove-typename";

const removeTypenameLink = removeTypenameFromVariables();

const httpLink = new HttpLink({
  uri: process.env.SERVER_URL,
  // fetch: fetchWithReauthorization,
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

export default from([authLink, removeTypenameLink, errorLink, httpLink]);
