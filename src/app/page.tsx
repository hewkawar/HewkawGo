import { getSite } from "@/libs/site";
import HomeClientPage from "./client";

export default function Home() {
  const site = getSite();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold text-center">{site.name}</h1>
      <HomeClientPage site={site} />
    </div>
  );
}
