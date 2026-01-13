import { GithubIcon } from "@/components/custom-icons";
import { Button } from "@heroui/button"

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-screen bg-background text-foreground min-h-screen flex flex-col items-center">
      <nav className="h-16 fixed top-0 max-w-7xl w-full flex items-center px-4">
        <span className="mr-auto text-xl">
          <a className="text-primary font-bold text-3xl">
            JUIT
          </a>
          Timetable
        </span>
        <Button isIconOnly variant="light">
          <GithubIcon size={28} />
        </Button>
      </nav>
      <main className="container w-full">
        {children}
      </main>
    </div>
  );
}
