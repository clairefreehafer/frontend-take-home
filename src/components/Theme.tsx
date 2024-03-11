import React, { useEffect, useState } from "react";

export default function Theme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <fieldset>
      <legend>Theme</legend>
      <input
        type="radio"
        id="dark"
        name="dark"
        value="dark"
        checked={theme === "dark"}
        onChange={() => setTheme("dark")}
      />
      <label htmlFor="dark">Dark</label>
      <input
        type="radio"
        id="light"
        name="light"
        value="light"
        checked={theme === "light"}
        onChange={() => setTheme("light")}
      />
      <label htmlFor="light">Light</label>
    </fieldset>
  )
}