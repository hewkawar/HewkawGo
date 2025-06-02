import { getSite } from "@/libs/site";
import HomeClientPage from "./client";

export default function Home() {
  const site = getSite();

  return (
    <main className="h-screen p-16 flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-center">{site.name}</h1>
      <HomeClientPage site={site} />
    </main>
  );
}
