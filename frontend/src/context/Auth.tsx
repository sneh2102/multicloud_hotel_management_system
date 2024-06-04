import React, { createContext, ReactNode, useState, useContext, useEffect } from "react";
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import UserPool from "../utils/UserPool";

export interface AccountContextType {
  authenticate: (email: string, password: string) => Promise<void>;
  getSession: () => Promise<CognitoUserSession>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  confirmPassword: (
    email: string,
    code: string,
    newPassword: string
  ) => Promise<void>;
  status: boolean;
  setStatus: React.Dispatch<React.SetStateAction<boolean>>;  
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AccountContextType>({
  authenticate: async () => { throw new Error('authenticate not implemented'); },
  getSession: async () => { throw new Error('getSession not implemented'); },
  logout: () => { throw new Error('logout not implemented'); },
  forgotPassword: async () => { throw new Error('forgotPassword not implemented'); },
  confirmPassword: async () => { throw new Error('confirmPassword not implemented'); },
  status: false,
  setStatus: () => { throw new Error('setStatus not implemented')},
  role: "",
  setRole: () => { throw new Error('setRole not implemented'); },
});

const Auth: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<string>("");
  const [status, setStatus] = useState<boolean>(false);

  // Authenticate function to authenticate the user
  const authenticate = async (email: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
      });

      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log("onSuccess:", data);
          resolve();
        },
        onFailure: (err) => {
          console.error("onFailure:", err);
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log("newPasswordRequired:", data);
          resolve();
        },
      });
    });
  };

  // Get the session of the user
  const getSession = async () => {
    return new Promise<CognitoUserSession>((resolve, reject) => {
      const user = UserPool.getCurrentUser();
      if (user) {
        user.getSession((err: any, session: CognitoUserSession) => {
          if (err) {
            setStatus(false);
            reject(err);
          } else {
            setStatus(true);
            resolve(session);
          }
        });
      } else {
        reject(new Error("User not found"));
      }
    });
  };

  // Logout function to logout the user
  const logout = () => {
    const user = UserPool.getCurrentUser();
    if (user) {
      user.signOut();
      setStatus(false);
    }
  };

  // Forgot password function to send the code to the user's email
  const forgotPassword = async (email: string) => {
    return new Promise<void>((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
      });

      user.forgotPassword({
        onSuccess: () => {
          console.log("Code sent successfully");
          resolve();
        },
        onFailure: (err) => {
          console.error("Error in sending code:", err);
          reject(err);
        },
      });
    });
  };

  // Confirm password function to reset the password
  const confirmPassword = async (
    email: string,
    code: string,
    newPassword: string
  ) => {
    return new Promise<void>((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
      });
      
      user.confirmPassword(code, newPassword, {
        onSuccess: () => {
          console.log("Password reset successfully");
          resolve();
        },
        onFailure: (err) => {
          console.error("Error in resetting password:", err);
          reject(err);
        },
      });
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authenticate,
        getSession,
        logout,
        forgotPassword,
        confirmPassword,
        status,
        setStatus,
        role,
        setRole,
      }}
    > 
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AccountContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { Auth, AuthContext, useAuth };
