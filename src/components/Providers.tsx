"use client";

import { RessourceContextProvider } from "@/context/RessourceContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FunctionComponent } from "react";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: FunctionComponent<ProvidersProps> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RessourceContextProvider>{children}</RessourceContextProvider>
    </QueryClientProvider>
  );
};

export default Providers;
