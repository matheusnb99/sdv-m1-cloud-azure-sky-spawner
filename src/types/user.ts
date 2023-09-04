export type UserType = {
  id: number;
  username: string;
  password: string;
  credits: number;
  access: AccessType;
};

export type UserContextType = {
  user: UserType | null;
  login: (arg0: string, arg1: string) => void;
  logout: () => void;
};

export enum AccessType {
  NONE = "none",
  SINGLE = "single",
  MULTIPLE = "multiple",
}
