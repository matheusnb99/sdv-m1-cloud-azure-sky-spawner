import SetCookieButton from "@/components/SetCookieButton";
import Head from "next/head";

export default function Home() {
  // const { loginAd, authenticated } = useContext(AuthContext);
  const users = [
    { username: "user1", password: "password1", vm: "0 vm" },
    { username: "user1", password: "password1", vm: "1 vm" },
    { username: "user3", password: "password3", vm: "more than one vm" },
  ];

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
              <div className="min-w-full bg-gray-800 text-white overflow-hidden shadow rounded-lg my-3">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-600 bg-gray-700 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        Username
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-600 bg-gray-700 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        Password
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-600 bg-gray-700 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                        VM Count
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={index}>
                        <td className="px-5 py-5 border-b border-gray-700 bg-gray-800 text-sm">{user.username}</td>
                        <td className="px-5 py-5 border-b border-gray-700 bg-gray-800 text-sm">{user.password}</td>
                        <td className="px-5 py-5 border-b border-gray-700 bg-gray-800 text-sm">{user.vm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </li>
            <li>
              If the profile you&apos;ve selected has the necessary permissions, you&apos;ll be able to create, start
              and destroy virtual machines. You can also choose the name of the resource group, storage account, virtual
              network, public IP address, and network interface. In 10 minutes, your virtual machine will be destroyed (
              dont mind the clock, int only refreshes when you reload the page).
            </li>
            <li>
              Sometimes, after clicking in a button you may have to wait a few seconds for the operation to complete. If
              nothing happens, please reload the page. Once you create your vm, wait a couple of seconds and then
              manually redirect to /app (there is a bug that prevents the page from redirecting automatically)
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
