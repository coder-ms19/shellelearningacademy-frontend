import { Moon, Sun, Menu, X, User, LogOut, BookOpen, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import logo from "../assets/logo2.png"

export const Navigation = () => {
    const { theme, toggleTheme } = useTheme();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
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
        toast.success("Logged out successfully! See you soon! 👋");
        navigate('/');
        setShowLogoutDialog(false);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const query = searchQuery.trim();
        if (query) {
            navigate(`/all-courses?search=${encodeURIComponent(query)}`);
            // Close mobile menu if search is performed from there
            if (mobileMenuOpen) setMobileMenuOpen(false); 
        } else {
            navigate('/all-courses');
        }
        setSearchQuery("");
    };

    const navItems = [
        { name: "Home", path: "/" },
        { name: "Courses", path: "/all-courses" },
        { name: "About", path: "/about" },
        { name: "Services", path: "/services" },
        { name: "Contact", path: "/contact" },
    ];

    const UserAuthSection = () => {
        return (
            <div className="flex items-center gap-2">
                {/* Theme Toggle Button (Desktop) */}
                <Button variant="ghost" size="icon" className="h-9 w-9" onClick={toggleTheme} aria-label="Toggle theme">
                    {theme === 'light' ? (
                        <Moon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-gray-700" />
                    ) : (
                        <Sun className="h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-yellow-500" />
                    )}
                </Button>

                {isAuthenticated ? (
                    // Authenticated Dropdown
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-9 w-9 rounded-full p-0 border border-primary/20 hover:bg-primary/5">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={user?.image} alt={user?.firstName} />
                                    <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                                        {user?.firstName?.[0]}{user?.lastName?.[0]}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-60" align="end" forceMount>
                            <div className="flex flex-col space-y-1 p-2">
                                <p className="font-bold text-foreground">{user?.firstName} {user?.lastName}</p>
                                <p className="truncate text-sm text-muted-foreground">{user?.email}</p>
                                <p className="text-xs font-semibold text-primary">{user?.accountType}</p>
                            </div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                                <User className="mr-2 h-4 w-4 text-primary" />
                                Dashboard
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate('/profile')}>
                                <User className="mr-2 h-4 w-4 text-primary" />
                                Profile Settings
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate('/all-courses')}>
                                <BookOpen className="mr-2 h-4 w-4 text-primary" />
                                My Learning
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive font-semibold" onClick={() => setShowLogoutDialog(true)}>
                                <LogOut className="mr-2 h-4 w-4" />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    // Unauthenticated CTA
                    <Button 
                        size="sm" 
                        className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-5 font-semibold shadow-md shadow-primary/30 transition-all duration-300"
                        onClick={() => navigate("/auth")}
                    >
                        Start Learning
                    </Button>
                )}
            </div>
        );
    };

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="flex h-16 items-center justify-between">
                        
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 transition-opacity duration-300 hover:opacity-90 group">
                            <img loading="lazy" src={logo} alt="Shell E-learning Academy Logo" className="h-10 w-10 sm:h-11 sm:w-11 object-contain" />
                            <div className="flex flex-col leading-none">
                                {/* Using Tailwind color variables for the custom green primary color */}
                                <span className="font-extrabold text-base sm:text-lg text-primary transition-colors">Shell E-Learning</span>
                                <span className="text-xs font-medium text-muted-foreground hidden sm:block">MSME Verified Academy</span>
                            </div>
                        </Link>
                    
                        {/* Desktop Navigation, Search, and Auth/Theme Buttons */}
                        <div className="hidden items-center gap-8 xl:flex">
                            <div className="flex items-center gap-6">
                                {/* Nav Items */}
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        className={`text-sm font-semibold transition-colors duration-300 ${
                                            isActive(item.path)
                                                ? "text-primary border-b-2 border-primary pb-1"
                                                : "text-foreground/80 hover:text-primary"
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>

                            {/* Desktop Search Input */}
                            <form onSubmit={handleSearch} className="relative w-64">
                                <Input 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search courses..." 
                                    className="h-10 bg-card border border-border rounded-xl pl-4 pr-10 text-sm focus-visible:ring-primary focus-visible:border-primary/50"
                                />
                                <Button 
                                    type="submit"
                                    size="sm"
                                    variant="ghost"
                                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-primary/10"
                                >
                                    <Search className="h-4 w-4 text-muted-foreground hover:text-primary" />
                                </Button>
                            </form>
                            <UserAuthSection />
                        </div>

                        {/* Mobile/Tablet Controls */}
                        <div className="flex items-center gap-2 xl:hidden">
                            
                            {/* Theme Toggle (Mobile) */}
                             <Button variant="ghost" size="icon" className="h-9 w-9" onClick={toggleTheme} aria-label="Toggle theme">
                                {theme === 'light' ? (
                                    <Moon className="h-5 w-5 text-gray-700" />
                                ) : (
                                    <Sun className="h-5 w-5 text-yellow-500" />
                                )}
                            </Button>

                            {/* User Avatar (Mobile - if logged in) */}
                            {token && (
                                <Button
                                    variant="ghost"
                                    className="h-9 w-9 rounded-full p-0 border border-primary/20 hover:bg-primary/5"
                                    onClick={() => navigate('/profile')}
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user?.image} alt={user?.firstName} />
                                        <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                                            {user?.firstName?.[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            )}

                            {/* Mobile Menu Toggle Button */}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label="Toggle menu"
                                className="h-10 w-10 text-foreground/80 hover:bg-primary/10 transition-colors"
                            >
                                {mobileMenuOpen ? (
                                    <X className="h-6 w-6 text-primary" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <>
                    {/* Backdrop Overlay */}
                    <div 
                        className="fixed inset-0 top-16 z-40 bg-black/50 xl:hidden animate-fade-in"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                    
                    {/* Slide-in Menu from Top */}
                    <div className="fixed top-16 left-0 right-0 z-50 bg-card border-b border-border xl:hidden animate-slide-down shadow-2xl">
                        <div className="container mx-auto px-4 py-6 space-y-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
                            
                            {/* Mobile Search Form */}
                            <form onSubmit={handleSearch} className="relative mb-4">
                                <Input 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search courses..." 
                                    className="h-12 bg-white border border-border rounded-xl pl-4 pr-12 text-base shadow-inner"
                                />
                                <Button 
                                    type="submit"
                                    size="icon"
                                    variant="ghost"
                                    className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 p-0 hover:bg-primary/10"
                                >
                                    <Search className="h-5 w-5 text-muted-foreground hover:text-primary" />
                                </Button>
                            </form>
                            
                            {/* Nav Items */}
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`block w-full rounded-xl px-4 py-3 text-base font-semibold transition-all duration-300 ease-in-out ${
                                        isActive(item.path)
                                            ? "text-primary bg-primary/10 shadow-sm border border-primary/20"
                                            : "text-foreground/80 hover:bg-muted/50"
                                    }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            
                            {/* Auth Section in Mobile Menu */}
                            {!token ? (
                                <div className="space-y-3 pt-6 border-t border-border">
                                    <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                                        <Button 
                                            variant="default" 
                                            className="w-full rounded-xl h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-bold shadow-lg shadow-primary/30"
                                        >
                                            Start Learning Now
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-3 pt-6 border-t border-border">
                                    <Button
                                        variant="destructive"
                                        onClick={() => {
                                            setShowLogoutDialog(true);
                                            setMobileMenuOpen(false);
                                        }}
                                        className="w-full justify-center h-12 rounded-xl text-base font-bold transition-all duration-300"
                                    >
                                        <LogOut className="w-5 h-5 mr-3 flex-shrink-0" />
                                        Log Out
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
            
            {/* Logout Confirmation Dialog */}
            <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to log out? 🥺</AlertDialogTitle>
                        <AlertDialogDescription>
                            You will be securely signed out of your account. You can always log back in later.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleLogout} className="bg-destructive hover:bg-destructive/90">
                            Yes, Log me out
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};