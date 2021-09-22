interface configProperties {
  [key: string]: string | undefined;
}

export const config: configProperties = {
  AUTH0_CLIENT_ID: undefined,
  AUTH0_CLIENT_SECRET: undefined,
  AUTH0_AUDIENCE: undefined,
  AUTH0_SCOPE: undefined,
  AUTH0_DOMAIN: undefined,
  REDIRECT_URI: undefined,
  POST_LOGOUT_REDIRECT_URI: undefined,
  SESSION_COOKIE_SECRET: undefined,
  SESSION_COOKIE_LIFETIME: undefined,
};

if (typeof window === "undefined") {
  /**
   * Settings exposed to the server.
   */
  config.AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
  config.AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET;
  config.AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE;
  config.AUTH0_SCOPE = process.env.AUTH0_SCOPE;
  config.AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
  config.REDIRECT_URI = process.env.REDIRECT_URI;
  config.POST_LOGOUT_REDIRECT_URI = process.env.POST_LOGOUT_REDIRECT_URI;
  config.SESSION_COOKIE_SECRET = process.env.SESSION_COOKIE_SECRET;
  config.SESSION_COOKIE_LIFETIME = process.env.SESSION_COOKIE_LIFETIME;
} else {
  /**
   * Settings exposed to the client.
   */
  config.AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
  config.AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE;
  config.AUTH0_SCOPE = process.env.AUTH0_SCOPE;
  config.AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
  config.REDIRECT_URI = process.env.REDIRECT_URI;
  config.POST_LOGOUT_REDIRECT_URI = process.env.POST_LOGOUT_REDIRECT_URI;
}
