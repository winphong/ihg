"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_ITEMS = ["Home", "About", "Schedule", "Results", "Gallery", "Documents"];

function navHref(item: string) {
  return `/${item.toLowerCase()}`;
}

function NavLink({
  item,
  active,
  onNavigate,
  className,
}: {
  item: string;
  active: boolean;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <Link
      href={navHref(item)}
      onClick={onNavigate}
      className={cn(
        "font-sans font-bold transition-colors",
        active ? "text-ihg-charcoal" : "text-ihg-taupe hover:text-ihg-charcoal",
        className
      )}
    >
      {item}
    </Link>
  );
}

export function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-ihg-bg sticky top-0 z-40 shadow-[1px_1px_5px_#aaaaaa]">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          {/* Mobile: hamburger + drawer */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={<Button variant="ghost" size="icon" aria-label="Open menu" />}
              >
                <Menu className="text-ihg-gold size-6" />
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle className="sr-only">Navigation</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 px-4">
                  {NAV_ITEMS.map((item) => (
                    <NavLink
                      key={item}
                      item={item}
                      active={pathname === navHref(item)}
                      onNavigate={() => setOpen(false)}
                    />
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <Link href="/home" className="flex items-center">
            <Image
              src="/Logo.png"
              alt="IHG logo"
              width={45}
              height={45}
              className="h-11 w-auto"
              priority
            />
          </Link>
        </div>

        {/* Desktop: inline links */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item} item={item} active={pathname === navHref(item)} />
          ))}
        </nav>
      </div>
    </header>
  );
}
