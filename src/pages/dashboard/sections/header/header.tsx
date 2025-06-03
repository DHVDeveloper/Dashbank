import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="w-full text-primary-text-color flex flex-col gap-2">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-extrabold">DASHBANK</h1>
          <h4 className="text-sm text-primary-text-color/70 font-light">
            Keep track your financial plan
          </h4>
        </div>
        <ThemeToggle/>
      </div>
    </header>
  );
}
