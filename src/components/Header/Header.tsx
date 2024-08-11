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
    <header className="mx-auto flex max-w-6xl items-center justify-between py-7">
      {/* Logo */}
      <Link href="/" className="text-xl">
        なるほど
      </Link>

      <div>
        {/* Light / Dark theme toggle */}
        <button onClick={handleThemeToggle}>
          {theme === "light" ? <IconSunFilled /> : <IconMoonFilled />}
        </button>
      </div>
    </header>
  );
}

export default Header;
