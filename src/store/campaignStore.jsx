import { createContext, useState } from "react";

export const CampaignContext = createContext({
  user: null,
  token: null,
  apiURL:null,
  setUser: () => {},
  setToken: () => {},
});

const apiURL = import.meta.env.VITE_APP_URL;

const CampaignProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [token, setToken] = useState(localStorage.getItem('token') ||null);

  return (
    <CampaignContext.Provider value={{ user, token, setUser, setToken, apiURL }}>
      {children}
    </CampaignContext.Provider>
  );
};

export default CampaignProvider;
