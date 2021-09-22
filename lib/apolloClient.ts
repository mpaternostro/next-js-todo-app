import { ApolloClient } from "apollo-client";
import {
  ApolloLink,
  Operation,
  FetchResult,
  Observable,
  NormalizedCacheObject,
} from "@apollo/client/core";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { print, GraphQLError } from "graphql";
import { createClient, ClientOptions, Client } from "graphql-ws";
import { WebSocketLink } from "apollo-link-ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import auth0 from "./auth0";

let accessToken: string | null = null;

const requestAccessToken = async () => {
  if (accessToken) return;

  const res = await fetch(`/api/session`);
  if (res.ok) {
    const json = await res.json();
    accessToken = json.accessToken;
  } else {
    accessToken = "public";
  }
};

// remove cached token on 401 from the server
const resetTokenLink = onError(({ networkError }) => {
  if (
    networkError &&
    networkError.name === "ServerError" &&
    networkError.statusCode === 401
  ) {
    accessToken = null;
  }
});

// class WebSocketLink extends ApolloLink {
//   private client: Client;

//   constructor(options: ClientOptions) {
//     super();
//     this.client = createClient(options);
//   }

//   public request(operation: Operation): Observable<FetchResult> {
//     return new Observable((sink) => {
//       return this.client.subscribe<FetchResult>(
//         { ...operation, query: print(operation.query) },
//         {
//           next: sink.next.bind(sink),
//           complete: sink.complete.bind(sink),
//           error: (err) => {
//             if (err instanceof Error) {
//               return sink.error(err);
//             }

//             if (err instanceof CloseEvent) {
//               return sink.error(
//                 // reason will be available on clean closes
//                 new Error(
//                   `Socket closed with event ${err.code} ${err.reason || ""}`
//                 )
//               );
//             }

//             return sink.error(
//               new Error(
//                 (err as GraphQLError[]).map(({ message }) => message).join(", ")
//               )
//             );
//           },
//         }
//       );
//     });
//   }
// }

const createHttpLink = (headers: Headers) => {
  const httpLink = new HttpLink({
    uri: "https://communal-kingfish-34.hasura.app/v1/graphql",
    credentials: "include",
    headers, // auth token is fetched on the server side
    fetch,
  });
  return httpLink;
};

// const createWSLink = () => {
//   return new WebSocketLink({
//     url: "wss://communal-kingfish-34.hasura.app/v1/graphql",
//     connectionParams: async () => {
//       await requestAccessToken(); // happens on the client
//       return {
//         authorization: accessToken ? `Bearer ${accessToken}` : "",
//       };
//     },
//   });
// };

const createWSLink = () => {
  return new WebSocketLink(
    new SubscriptionClient("wss://communal-kingfish-34.hasura.app/v1/graphql", {
      lazy: true,
      reconnect: true,
      connectionParams: async () => {
        await requestAccessToken(); // happens on the client
        return {
          headers: {
            authorization: accessToken ? `Bearer ${accessToken}` : "",
          },
        };
      },
    })
  );
};

export default function createApolloClient(
  initialState,
  headers: Headers
): ApolloClient<NormalizedCacheObject> {
  const ssrMode = typeof window === "undefined";
  let link: HttpLink | WebSocketLink;
  if (ssrMode) {
    link = createHttpLink(headers); // executed on server
  } else {
    link = createWSLink(); // executed on client
  }
  return new ApolloClient({
    ssrMode,
    link,
    cache: new InMemoryCache().restore(initialState),
  });
}
