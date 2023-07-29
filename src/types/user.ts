export type UserType = {
  id: number;
  username: string;
  password: string;
  credits: number;
  access: "none" | "single" | "multiple";
};

export type UserContextType = {
  user: UserType | null;
  login: (arg0: string, arg1: string) => void;
  logout: () => void;
};
