import React from 'react'
import Link from "next/link";

import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  return (
    <header className="sticky z-50 top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/dashbord"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <img src="/logo.svg" alt="Logo" className="h-24 w-48" />{" "}
          {/* Juster størrelsen etter behov */}
          <span className="sr-only">Hjem</span>
        </Link>

        <Link
          href="/dashbord"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Dashboard
        </Link>
        <Link
          href="/scriptpage"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Scripts
        </Link>
        <Link
          href="/datapage"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Data
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <img src="/logo.svg" alt="Logo" className="h-24 w-48" />{" "}
              {/* Juster størrelsen etter behov */}
              <span className="sr-only">Hjem</span>
            </Link>
            <Link href="/" className="hover:text-foreground">
              Dashboard
            </Link>
            <Link
              href="/scriptpage"
              className="text-muted-foreground hover:text-foreground"
            >
              Scripts
            </Link>
            <Link
              href="/datapage"
              className="text-muted-foreground hover:text-foreground"
            >
              Data
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            /> */}
          </div>
        </form>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Min konto</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Innstillinger</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logg ut</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
    </header>
  );
}
