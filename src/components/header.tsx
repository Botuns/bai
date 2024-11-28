import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useAuthStore } from "@/app/providers/stores/authStore";

export function Header() {
  const { isAuthenticated, user, logout, openModal } = useAuthStore();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-blue-600">Bai</h1>
          <nav className="hidden md:flex ml-10 space-x-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/features">Features</NavLink>
            <NavLink href="/how-it-works">How It Works</NavLink>
            <NavLink href="/contact">Contact Us</NavLink>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm font-medium text-gray-700">
                Welcome, {user}
              </span>
              <Button variant="ghost" onClick={logout}>
                <LogOut className="h-5 w-5 mr-2" />
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => openModal("login")}>
                Log In
              </Button>
              <Button onClick={() => openModal("signup")}>Start Saving</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="text-sm font-medium text-gray-600 hover:text-gray-900"
  >
    {children}
  </Link>
);
