import { MoonIcon } from '@/ui/icons/moon.icon';
import { SunIcon } from '@/ui/icons/sun.icon';
import { useState, useEffect } from 'react';

export function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    updateTheme(isDark);
  }, []);

  const updateTheme = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(isDark));
  };

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    updateTheme(newMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition-colors"
    >
      {darkMode ? (
        <SunIcon className="h-6 w-6 text-yellow-300" />
      ) : (
        <MoonIcon className="h-6 w-6 text-gray-700" />
      )}
    </button>
  );
}