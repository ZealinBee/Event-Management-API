import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { MsalProvider } from "@azure/msal-react";
import { AccountInfo, EventType, PublicClientApplication } from "@azure/msal-browser";

import { msalConfig } from "./authConfig.ts";

const msalInstance = new PublicClientApplication(msalConfig);
if(!msalInstance.getActiveAccount()) {
  msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}

msalInstance.addEventCallback((event) => {
  const account = event.payload as AccountInfo;
  if(event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    msalInstance.setActiveAccount(account);
  }
})

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </StrictMode>
);
