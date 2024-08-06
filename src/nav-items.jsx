import { Home, TrendingUp, Info } from "lucide-react";
import Index from "./pages/Index.jsx";
import TopGainers from "./pages/TopGainers.jsx";
import About from "./pages/About.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Top Gainers",
    to: "/top-gainers",
    icon: <TrendingUp className="h-4 w-4" />,
    page: <TopGainers />,
  },
  {
    title: "About",
    to: "/about",
    icon: <Info className="h-4 w-4" />,
    page: <About />,
  },
];
