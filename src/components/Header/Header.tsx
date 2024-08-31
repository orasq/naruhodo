"use client";

import { ThemeMode } from "@/lib/utils/types";
import { IconMoonFilled, IconSunFilled } from "@tabler/icons-react";
import { useState } from "react";
import Cookies from "js-cookie";
import { THEME_COOKIE_KEY } from "@/lib/utils/variants";
import Link from "next/link";

type HeaderProps = {
  initialTheme: ThemeMode;
};

function Header({ initialTheme }: HeaderProps) {
  const [theme, setTheme] = useState(initialTheme);

  function handleThemeToggle() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    Cookies.set(THEME_COOKIE_KEY, newTheme, { expires: 365 });

    document.documentElement.setAttribute("data-color-mode", newTheme);
  }

  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between pb-10 pt-7 md:pb-20 md:pt-10">
      {/* Logo */}
      <Link href="/" className="text-xl">
        なるほど
      </Link>

      <div>
        {/* Light / Dark theme toggle */}
        <button
          onClick={handleThemeToggle}
          aria-label={`Toggle theme | Current theme: ${theme}`}
          className="motion-safe:transition-background flex h-[45px] w-[45px] items-center justify-center rounded-xl duration-100 hover:bg-surface-light hover:shadow-sm"
        >
          {theme === "light" ? <IconSunFilled /> : <IconMoonFilled />}
        </button>
      </div>
    </header>
  );
}

export default Header;
