
const apiConfig = {
  urlBase: process.env.REACT_APP_URL_BASE_API
}

const msalAadClientConfig = {
  auth: {
    clientId: "0c3a169e-1814-4168-808c-7073ae7d42b4",
    authority: "https://login.microsoftonline.com/536eb735-6d73-4fb3-ba4f-dcf0cfe354be",
    redirectUri: process.env.PUBLIC_URL,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  }
}

const acquireTokenParams = {
  account: null,
  scopes: ["api://ac0d838f-5e46-41af-bc6c-eb4de3c2548d/Ativare.Materiais_e_Orcamentos"]
};

export { apiConfig, msalAadClientConfig, acquireTokenParams };
