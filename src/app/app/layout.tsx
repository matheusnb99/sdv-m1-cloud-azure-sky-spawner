import SignOutButton from "@/components/SignOutButton";
import { User } from "@/lib/utils/db/User";
import { cookies } from "next/headers";

export default async function UserLayout({ children }: { children: React.ReactNode }) {
  const username = cookies().get("account_jwt_token")?.value;

  if (!username) {
    return <>Loading</>;
  }

  const user = User.getUser(username);

  return (
    <>
      <div>{user?.username}</div>
      <div>{user?.credits}</div>
      <SignOutButton />
      {children};
    </>
  );
}
