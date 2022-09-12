
const apiConfig = {
  urlBase: process.env.REACT_APP_URL_API_BASE || "http://localhost:3001/"
}

const msalAadClientConfig = {
  auth: {
    clientId: "ce9c5f25-9096-4fd9-985f-4f1718fc7f53",
    authority: "https://login.microsoftonline.com/2bd70d8a-6f4e-4cc1-aa00-469ce9c54770",
    redirectUri: process.env.REACT_APP_URL_FRRONT_BASE || "http://localhost:3001/",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  }
}

const acquireTokenParams = {
  account: null,
  scopes: ["api://3200c31a-a02b-426a-a3cb-0ba54ef42fef/access_as_user"]
};

export { apiConfig, msalAadClientConfig, acquireTokenParams };
