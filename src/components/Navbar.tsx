import { Moon, Sun, Menu, X, User, LogOut, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { logout } from "@/store/authSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import toast from "react-hot-toast";
import logo from "../assets/logo1.png"

export const Navigation = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, token } = useAppSelector((state) => state.auth);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname === path;
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully! See you soon!");
    navigate('/');
    setShowLogoutDialog(false);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Courses", path: "/all-courses" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const AuthButtons = () => {
    if (!token) {
      return (
        <Link to="/auth">
          <Button variant="default" size="sm" className="ml-2 bg-gradient-to-r from-primary to-accent hover:shadow-blue">
            Login
          </Button>
        </Link>
      );
    }

    return (
      <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.image} alt={user?.firstName} />
                <AvatarFallback>
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium">{user?.firstName} {user?.lastName}</p>
                <p className="w-[200px] truncate text-sm text-muted-foreground">
                  {user?.email}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user?.accountType}
                </p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/dashboard')}>
              <User className="mr-2 h-4 w-4" />
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/profile')}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/all-courses')}>
              <BookOpen className="mr-2 h-4 w-4" />
              All Courses
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setShowLogoutDialog(true)}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1 sm:gap-2 smooth-transition hover:opacity-80 group">
              <img loading="lazy" src={logo} alt="Logo" className="h-16 w-16 sm:h-40 sm:w-40 object-cover "/>
              <div className="flex flex-col">
                <span className="font-display text-xs sm:text-sm font-bold group-hover:text-primary transition-colors" style={{color: '#38871E'}}>Shell E-learning academy</span>
                <span className="text-xs font-body hidden sm:block" style={{color: '#38871E'}}>MSME Verified</span>
              </div>
            </Link>
      
            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 lg:flex">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-all duration-300 ${
                    isActive(item.path)
                      ? "bg-secondary font-semibold"
                      : "smooth-transition hover:opacity-80"
                  }`}
                  style={{color: '#38871E'}}
                >
                  {item.name}
                </Link>
              ))}

              <AuthButtons />
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden flex items-center space-x-2">
              {token ? (
                <>                    
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full p-0"
                    onClick={() => navigate('/profile')}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.image} alt={user?.firstName} />
                      <AvatarFallback>
                        {user?.firstName?.[0]}{user?.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                  {location.pathname.includes('/course-learning') && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowLogoutDialog(true)}
                      aria-label="Logout"
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  )}
                  {!location.pathname.includes('/course-learning') && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                      aria-label="Toggle menu"
                    >
                      {mobileMenuOpen ? (
                        <X className="h-5 w-5" />
                      ) : (
                        <Menu className="h-5 w-5" />
                      )}
                    </Button>
                  )}
                </>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay for Better UX */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop Overlay */}
          <div 
            className="fixed inset-0 z-40 bg-black/50 lg:hidden animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Slide-in Menu from Top */}
          <div className="fixed top-16 left-0 right-0 z-50 bg-background border-b border-border lg:hidden animate-slide-down">
            <div className="container mx-auto px-4 py-4 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {/* Nav Items */}
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block w-full rounded-xl px-4 py-4 text-base font-semibold transition-all duration-300 ease-in-out ${
                    isActive(item.path)
                      ? "text-primary bg-secondary/50 shadow-sm"
                      : "text-foreground hover:bg-accent hover:text-primary"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              


              {/* Auth Section */}
              {!token ? (
                <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                  <Button 
                    variant="default" 
                    className="w-full rounded-xl py-4 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/25 text-base font-semibold"
                  >
                    Sign In
                  </Button>
                </Link>
              ) : (
                <>
                  {/* User Profile Card */}
                  <div className="bg-secondary/30 rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.image} alt={user?.firstName} />
                        <AvatarFallback className="text-sm font-semibold">
                          {user?.firstName?.[0]}{user?.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="font-semibold text-foreground">{user?.firstName} {user?.lastName}</p>
                        <p className="text-xs text-muted-foreground">{user?.accountType}</p>
                      </div>
                    </div>
                  </div>

                  {/* Authenticated Actions */}
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setShowLogoutDialog(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full justify-start px-4 py-4 text-left rounded-xl transition-all duration-300 hover:bg-destructive/90"
                  >
                    <LogOut className="w-5 h-5 mr-3 flex-shrink-0" />
                    Log Out
                  </Button>
                </>
              )}
            </div>
          </div>
        </>
      )}
      
      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be signed out of your account and redirected to the home page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};