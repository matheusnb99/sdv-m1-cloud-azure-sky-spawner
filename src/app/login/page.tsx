import SignIn from "@/core/SignIn";
import { FunctionComponent } from "react";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  return (
    <main>
      <h1 className="text-6xl font-bold text-center text-red-600">Creation de VM</h1>
      <div className="flex min-h-screen flex-col items-center justify-evenly p-24">{<SignIn />}</div>;
    </main>
  );
};

export default Login;
