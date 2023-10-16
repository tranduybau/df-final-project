import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import ROUTES from "@/constants/ROUTES";

function Header() {
  return (
    <header className="container">
      <nav className="flex items-center justify-between py-4 bg-red-700">
        <Link href={ROUTES.HOME}>Cosmeller</Link>

        <div>
          <Link href={ROUTES.SEARCH}>
            <Button>Search Now</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
