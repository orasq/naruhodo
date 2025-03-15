"use client";

import type { ThemeMode } from "@/lib/types/types";
import { THEME_COOKIE_KEY } from "@/lib/utils/constants";
import { IconMoonFilled, IconSunFilled } from "@tabler/icons-react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useState } from "react";
import Logo from "../Logo/Logo";
import { darkModeIconStyle } from "./Header.styles";
import { LoginDropdown } from "../LoginDropdown";

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
    <header className="mx-auto flex max-w-6xl items-center justify-between pt-7 pb-16 md:pt-10 md:pb-28">
      {/* Logo */}
      <Link href="/" className="text-xl" aria-label="Go back to homepage">
        <Logo />
      </Link>

      <div className="flex items-center justify-center gap-3">
        {/* Login / Register button */}
        <LoginDropdown />

        {/* Light / Dark theme toggle */}
        <button
          className="motion-safe:transition-background hover:bg-surface-base relative flex h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-xl duration-100 hover:shadow-xs"
          aria-label={`Toggle theme (${theme})`}
          onClick={handleThemeToggle}
        >
          <IconSunFilled
            className={darkModeIconStyle({ active: theme === "light" })}
          />

          <IconMoonFilled
            className={darkModeIconStyle({ active: theme === "dark" })}
          />
        </button>
      </div>
    </header>
  );
}

export default Header;
