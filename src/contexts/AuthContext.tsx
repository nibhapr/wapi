import { setAuthCredentials, setToken } from "@/utils/auth-utils";
import { http } from "@/utils/http";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

interface Credentials {
  // Update the structure as per your API's expected credentials
  username: string;
  password: string;
}

interface IAuth {
  status: string;
  session: string;
  token: string;
  full: string;
}

export interface IHost {
  status: string;
  response: Response;
  mapper: string;
}

export interface Response {
  id: string;
  ref: string;
  refTTL: number;
  platform: string;
  smbTos: number;
  pushname: string;
  stale: boolean;
  blockStoreAdds: boolean;
  isVoipInitialized: boolean;
  phoneNumber: string;
}

export interface IQr {
  status: string;
  qrcode: string | null;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  authToken: string;
  user: string;
  number: string;
  getToken: () => void;
  setCreds: () => Promise<void>;
  logout: () => void;
  checkAuthStatus: () => void;
  resetSession: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const useAuth = (): AuthContextProps => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
};

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState("");
  const [user, setUser] = useState("");
  const [number, setNumber] = useState("");

  const getToken = async () => {
    const token = await http.post(
      "/api/NERDWHATS_AMERICA/THISISMYSECURETOKEN/generate-token"
    );
    setAuthToken(token.data.token);
    setToken(token.data.token);
  };

  const setCreds = async (): Promise<void> => {
    // Call your API to authenticate the user and obtain the token
    // Set the token and authentication status accordingly
    const { data } = await http.get<IHost>("/api/NERDWHATS_AMERICA/host-device");
    console.log(data);
    setUser(data.response.pushname)
    setNumber(data.response.phoneNumber)
    setAuthCredentials(JSON.stringify(data.response));
  };

  const logout = (): void => {
    // Clear the token and authentication status
  };

  const checkAuthStatus = (): void => {
    // Check if the token is valid or expired
    // Set the authentication status accordingly
  };

  const resetSession = (): void => {
    setUser('')
    setNumber('')    
  }

  const authValues: AuthContextProps = {
    isAuthenticated,
    authToken,
    setCreds,
    user,
    getToken,
    logout,
    resetSession,
    number,    
    checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
