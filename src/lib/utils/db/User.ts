import { AccessType, UserType } from "@/types/user";

const users: UserType[] = [
  {
    id: 0,
    username: "user1",
    password: "password1",
    credits: 0,
    access: AccessType.NONE, // no access to any machines
  },
  {
    id: 1,
    username: "user2",
    password: "password2",
    credits: 100,
    access: AccessType.SINGLE, // access to a single pre-configured machine
  },
  {
    id: 2,
    username: "user3",
    password: "password3",
    credits: 100,
    access: AccessType.MULTIPLE, // access to multiple operating systems, can choose which one to start
  },
];

const authenticate = (username: string, password: string) => {
  const user = users.find((user) => user.username === username && user.password === password);
  return user;
};
const getAccess = (username: string) => {
  const user = users.find((user) => user.username === username);
  return user?.access;
};

const getCredits = (username: string) => {
  const user = users.find((user) => user.username === username);
  return user?.credits;
};

const getUser = (username: string) => {
  const user = users.find((user) => user.username === username);
  return user;
};

export const User = {
  authenticate,
  getAccess,
  getCredits,
  getUser,
};
