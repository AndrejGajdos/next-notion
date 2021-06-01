let graphqlServerUrl = "http://localhost:8889/graphql";
let serverUrl = "http://localhost:8889";
let serverPublicUrl = "http://localhost:8891";

if (process && process.env && process.env.NODE_ENV === "development") {
  graphqlServerUrl = "http://localhost:8889/graphql";
  serverUrl = "http://localhost:8889";
  serverPublicUrl = "https://localhost:8891";
}

export const GRAPHQL_SERVER_URL = graphqlServerUrl;
export const SERVER_URL = serverUrl;
export const SERVER_PUBLIC_URL = serverPublicUrl;

export const WEB_URL = "http://localhost";
