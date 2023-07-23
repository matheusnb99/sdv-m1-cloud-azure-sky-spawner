"use client";

import instance from "@/lib/utils/instance";
import { AuthContextType } from "@/types/auth";
import { useQuery } from "@tanstack/react-query";
import { FC, createContext, useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthContextProvider: FC<Props> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [jwt, setJwt] = useState<string | null>(null);

  const { refetch } = useQuery(
    ["login"],
    async () =>
      await instance
        .post("auth")
        .then((response) => {
          setAuthenticated(true);
          localStorage.setItem("session_jwt", response.data.token.token);
          return response;
        })
        .catch((error) => {
          console.log(error);
        }),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 30, // 10 seconds
    }
  );

  const loginAd: () => void = async () => {
    refetch();
  };

  const logoutAd = () => {
    setJwt(null);
    setAuthenticated(false);
  };

  useEffect(() => {
    const jwt = localStorage.getItem("session_jwt");

    setJwt(jwt);
    setAuthenticated(!!jwt); // !! converts to boolean (true if jwt is not null)
  }, []);

  return <AuthContext.Provider value={{ jwt, loginAd, logoutAd, authenticated }}>{children}</AuthContext.Provider>;
};
