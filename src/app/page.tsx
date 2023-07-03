import Auth from "@/app/components/Auth";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold text-center">Creation de VM</h1>
      <Auth />
    </main>
  );
}
