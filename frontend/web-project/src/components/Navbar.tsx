import { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useSession } from "./SessionContext";

interface RouteProps {
  href?: string;
  label: React.ReactNode;
}

export const Navbar = ({ onLoginToggle }: { onLoginToggle: () => void }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { session, setSession } = useSession();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/session", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setSession(data); // Actualiza la sesión global
        }
      } catch {
        setSession({ username: null, id: null }); // Limpia la sesión en caso de error
      }
    };

    checkSession();
  }, [setSession]);

  const handleLogout = async () => {
    try {
      const logoutResponse = await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Para asegurarnos de que el cuerpo sea JSON
        },
        credentials: "include", // Importante para enviar cookies de sesión al backend
      });

      if (logoutResponse.ok) {
        setSession({ username: null, id: null });

        setIsOpen(false); // Cerrar la ventana emergente de login después de 500ms
        window.location.reload();
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const routeList: RouteProps[] = [
    {
      href: "#about",
      label: "About this server",
    },
    {
      href: "#serverlink",
      label: "Server Link",
    },
    {
      href: "#pricing",
      label: "Shop",
    },
  ];

  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between">
          {/* Logo */}
          <NavigationMenuItem className="font-bold flex">
            <a
              rel="noreferrer noopener"
              href="/"
              className="ml-2 font-bold text-xl flex"
            >
              Ezplace Network
            </a>
          </NavigationMenuItem>

          {/* Mobile menu */}
          <span className="flex md:hidden">
            <ModeToggle />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                >
                  <span className="sr-only">Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    EzplaceNetwork
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }, index) => (
                    <a
                      rel="noreferrer noopener"
                      key={index}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </a>
                  ))}
                  <a
                    rel="noreferrer noopener"
                    href="https://github.com/andrewyernau"
                    target="_blank"
                    className={`w-[110px] border ${buttonVariants({
                      variant: "secondary",
                    })}`}
                  >
                    <GitHubLogoIcon className="mr-2 w-5 h-5" />
                    Github
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* Desktop menu */}
          <nav className="hidden md:flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <a
                rel="noreferrer noopener"
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {session.username ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <img
                      src={`https://crafatar.com/avatars/${session.id}`}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{session.username}</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <span>Log in</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onLoginToggle}>
                    Fast Login with username
                  </DropdownMenuItem>
                  <DropdownMenuItem>Login with email</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <ModeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
