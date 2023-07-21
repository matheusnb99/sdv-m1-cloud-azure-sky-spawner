"use client";

import { User } from "@/lib/utils/db/User";
import { FC, createContext, useState } from "react";
import { UserContextType, UserType } from "../types/user";

type Props = {
  children: React.ReactNode;
};

export const UserContext = createContext<UserContextType>(null!);

export const UserContextProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);

  const login: (arg0: string, arg1: string) => void = (username, password) => {
    const res = User.authenticate(username, password);

    if (!res) {
      return;
    }

    setUser(res);
  };

  const logout = () => {
    setUser(null);
  };

  return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>;
};
