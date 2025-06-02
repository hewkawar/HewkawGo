import { getSite } from "@/libs/site"

export default function Footer() {
    const site = getSite();

    return (
    <footer className="pb-4 text-sm text-zinc-400">
        <p>&copy; {site.name} {new Date().getFullYear()}</p>
    </footer>
  )
}