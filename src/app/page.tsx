import SetCookieButton from "@/components/SetCookieButton";
import Head from "next/head";

export default function Home() {
  // const { loginAd, authenticated } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Cloud VM Launcher</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{" "}
          <span className="text-blue-600">
            Cloud VM Launcher
            {/* {authenticated} */}
          </span>
        </h1>

        <p className="mt-6 text-2xl">Your one-stop solution for creating, starting and destroying Azure VMs.</p>

        <div className="mt-6 text-lg max-w-5xl">
          <h2 className="font-semibold">How It Works</h2>
          <ol className="list-decimal list-inside mt-2 text-left">
            <li>
              Click the &apos;Get Started&apos; button below. This will open a new tab with Azure&apos;s interactive
              authentication page.
            </li>
            <li>
              After you&apos;ve authenticated with Azure, you&apos;ll be redirected to our authentication page. You can
              log in with any of the three user profiles provided.
              <br />
              username: &ldquo;user1&ldquo;, password: &ldquo;password1&ldquo;,
              <br />
              username: &ldquo;user1&ldquo;, password: &ldquo;password1&ldquo;,
              <br />
              username: &ldquo;user3&ldquo;, password: &ldquo;password3&ldquo;,
            </li>
            <li>
              If the profile you&apos;ve selected has the necessary permissions, you&apos;ll be able to create, start
              and destroy virtual machines. You can also choose the name of the resource group, storage account, virtual
              network, public IP address, and network interface.
            </li>
            <li>
              If your token expires, you can click the &apos;Re Fetch Token&apos; button below to get a new one. You
              will be redirected to Azure&apos;s interactive authentication page again.
            </li>
          </ol>
        </div>

        <div className="mt-6">
          <SetCookieButton />
        </div>
      </main>

      <footer className="w-full h-20 border-t flex justify-center items-center border-gray-200">
        <p className="text-sm text-gray-500">© 2023 Cloud VM Launcher - Matheus NUNES BORBA</p>
      </footer>
    </div>
  );
}
