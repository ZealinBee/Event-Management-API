import { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import axios from "axios";

import { loginRequest } from "./authConfig";
import Event from "./models/Event";

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();


  useEffect(() => {
    const fetchEvents = async () => {
      const accessToken = await instance.acquireTokenSilent({
        scopes: ["api://f95e664a-aee0-4a88-8728-565061184ef4/Events.Read"],
        account: activeAccount || undefined,
      })

      console.log(accessToken);
      const response = await axios.get("http://localhost:5280/api/events", {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
        },
      });
    };

    if (events.length === 0 && activeAccount) {
      fetchEvents();
    }
  }, [events, activeAccount]);

  const handleRedirect = () => {
    instance
      .loginRedirect({
        ...loginRequest,
        prompt: "create",
      })
      .catch((error) => console.log(error));
  };

  const handleLogout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: "/",
    });
    window.location.reload();
  };

  return (
    <div>
      {activeAccount ? (
        <div>
          <h1>Welcome {activeAccount.name}</h1>

          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleRedirect}>Login</button>
      )}
    </div>
  );
}

export default App;
