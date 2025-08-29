import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "react-router";
import { ModeToggle } from "./ModeToggler";
import {
  authApi,
  useLogOutMutation,
  useUserInfoQuery,
} from "@/Redux/feature/auth/auth.api";
import { useAppDispatch } from "@/Redux/hook";
import { role } from "@/constant/role";


const publicLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/features", label: "Features", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/pricing", label: "Pricing", role: "PUBLIC" },
  { href: "/contact", label: "Contact", role: "PUBLIC" },
  { href: "/user/overview", label: "User-Dashboard", role: role.user },
  { href: "/agent/cash-in", label: "Agent-Dashboard", role: role.agent },
  { href: "/admin/all-user", label: "Admin-Dashboard", role: role.admin },
];

export default function Navbar() {
  const { data } = useUserInfoQuery(undefined);
  const dispatch = useAppDispatch();
  const [logOut] = useLogOutMutation();
  const handleLogout = async () => {
    try {
      const res = await logOut({}).unwrap();
      dispatch(authApi.util.resetApiState());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header className="border-b rounded-lg shadow-sm dark:bg-gray-900 md:p-4">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                {/* Hamburger icon */}
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 12L20 12" />
                  <path d="M4 6H20" />
                  <path d="M4 18H20" />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-2">
                  {publicLinks.map((link, index, role) => (
                    <>
                      {link.role === "PUBLIC" && (
                        <NavigationMenuItem className="font-semibold" key={index}>
                          <Link to={link.href}>{link.label}</Link>
                        </NavigationMenuItem>
                      )}
                      {link.role === data?.data?.role && (
                        <NavigationMenuItem className="font-semibold" key={index}>
                          <Link to={link.href}>{link.label}</Link>
                        </NavigationMenuItem>
                      )}
                    </>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          {/* Desktop menu */}
          <div className="flex items-center gap-6">
            <Link to="/">
              <Logo />
            </Link>
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-4">
                {publicLinks.map((link, index) => (
                  <>
                    {link.role === "PUBLIC" && (
                      <NavigationMenuItem className="font-semibold" key={index}>
                        <Link to={link.href}>{link.label}</Link>
                      </NavigationMenuItem>
                    )}
                    {link.role === data?.data?.role && (
                      <NavigationMenuItem className="font-semibold" key={index}>
                        <Link to={link.href}>{link.label}</Link>
                      </NavigationMenuItem>
                    )}
                  </>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right side: login/register + theme toggle */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          {data?.data?.email ? (
            <Button size="sm" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            // user not logged in → show login
            <Button asChild size="sm">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
