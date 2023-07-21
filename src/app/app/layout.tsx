import { UserContextProvider } from "@/context/UserContext";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return <UserContextProvider>{children}</UserContextProvider>;
}
