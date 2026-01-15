import { GithubIcon } from "@/components/custom-icons";
import { Button } from "@heroui/button"
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar"

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-screen bg-background text-foreground min-h-screen flex flex-col items-center">
      <Navbar>
        <NavbarBrand>
          <p className="font-bold text-inherit">JUIT</p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              isIconOnly
              variant="flat"
              onPress={() => window.open(
                "https://github.com/SurajKharkwal/juit-timetable",
                "_blank",
                "noopener,noreferrer"
              )}
            >
              <GithubIcon />
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <main className="container w-full flex-1 flex items-center max-md:justify-center px-4">
        {children}
      </main>
    </div>
  );
}
