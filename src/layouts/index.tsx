import { GithubIcon } from "@/components/Icons";
import { Button } from "@heroui/button"

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-baseline gap-2 font-semibold tracking-tight" aria-label="JUIT Timetable home">
            <span className="text-primary text-xl">JUIT</span>
            <span className="text-default-600 text-lg">Timetable</span>
          </a>
          <Button variant="light" isIconOnly>
            <GithubIcon />
          </Button>
        </div>
      </nav>
      <main className="flex-1 mx-auto w-full max-w-7xl px-6 py-10">
        {children}
      </main>
    </div>
  );
}
