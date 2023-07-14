import { TokenCredential } from "@azure/identity";

export const generateTokenCallback: (token: string) => TokenCredential = (
  token: string
) => {
  return {
    getToken: async () => {
      return {
        token,
        expiresOnTimestamp: Date.now() + 1000 * 60 * 60, // set to expire in 1 hour
      };
    },
  };
};
