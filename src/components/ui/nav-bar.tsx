"use client";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { ArrowUpRight, TextAlignJustify } from "lucide-react";
import type { MouseEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

export type NavigationSection = {
  title: string;
  href: string;
};

const navigationData: NavigationSection[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Users",
    href: "/add-user",
  },
  {
    title: "Reports",
    href: "#",
  },
  {
    title: "Roles",
    href: "#",
  },
  {
    title: "Dashboard",
    href: "#",
  },
  {
    title: "Settings",
    href: "#",
  },

];

const CollaborateButton = ({ className, onClick }: { className?: string, onClick?: () => void }) => (
  <Button onClick={onClick} className={cn("relative text-sm font-medium rounded-full h-10 p-1 ps-4 pe-12 group transition-all duration-500 hover:ps-12 hover:pe-4 w-fit overflow-hidden hover:bg-primary/80", className)}>
    <span className="relative z-10 transition-all duration-500 hover:cursor-pointer">
      Add User
    </span>
    <div className="absolute right-1 w-8 h-8 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-36px)] group-hover:rotate-45">
      <ArrowUpRight size={16} />
    </div>
  </Button>
);

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  const handleRoute = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("/")) return;

    event.preventDefault();
    setIsOpen(false);
    navigate(href);
  };

  const handleScroll = useCallback(() => {
    setSticky(window.scrollY >= 50);
  }, []);

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 768) setIsOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleScroll, handleResize]);

  return (
    <div>
      <header className="bg-background">
        <div className="max-w-7xl mx-auto w-full px-4 py-4 sm:px-6">
          <nav
            className={cn(
              "w-full flex items-center h-fit justify-between gap-3.5 lg:gap-6 transition-all duration-500",
              sticky
                ? "p-2.5 bg-background/60 backdrop-blur-lg border border-border/40 shadow-2xl shadow-primary/5 rounded-full"
                : "bg-transparent border-transparent"
            )}
          >
            <a href="/" onClick={(event) => handleRoute(event, "/")} aria-label="Go to home">
              <img src="/Logo.png" alt="Management system logo" className="h-10 w-10" />
            </a>
            <div>
              <NavigationMenu className="max-lg:hidden bg-muted p-0.5 rounded-full">
                <NavigationMenuList className="flex gap-0">
                  {navigationData.map((navItem) => (
                    <NavigationMenuItem key={navItem.title}>
                      <NavigationMenuLink
                        href={navItem.href}
                        onClick={(event) => handleRoute(event, navItem.href)}
                        className="px-2 lg:px-4 py-2 text-sm font-medium rounded-full text-muted-foreground hover:text-foreground hover:bg-background outline outline-transparent hover:outline-border hover:shadow-xs transition tracking-normal"
                      >
                        {navItem.title}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <CollaborateButton className="hidden lg:flex" onClick={() => navigate('/add-user')} />

            <div className="lg:hidden">
              <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger className="rounded-full bg-background border border-border p-2 outline-none flex items-center justify-center cursor-pointer transition-colors">
                  <TextAlignJustify size={20} />
                  <span className="sr-only">Menu</span>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-56 mt-2"
                >
                  {navigationData.map((item) => (
                    <DropdownMenuItem key={item.title}>
                      <a
                        href={item.href}
                        onClick={(event) => handleRoute(event, item.href)}
                        className="w-full cursor-pointer text-sm font-medium"
                      >
                        {item.title}
                      </a>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuItem>
                    <a
                      href="/add-user"
                      onClick={(event) => handleRoute(event, "/add-user")}
                      className="w-full cursor-pointer text-sm font-medium text-primary"
                    >
                      Add User
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
