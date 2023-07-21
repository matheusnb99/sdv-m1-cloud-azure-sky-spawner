export type AuthContextType = {
  jwt: string | null;
  authenticated: boolean;
  loginAd: () => void;
  logoutAd: () => void;
};
