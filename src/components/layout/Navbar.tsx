// "use client";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { usePathname } from "next/navigation";
// import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
// import { Menu, X, ChevronDown, UtensilsCrossed } from "lucide-react";
// import { NAV_LINKS } from "@/constants";
// import ThemeToggle from "@/components/ui/ThemeToggle";
// import Button from "@/components/ui/Button";
// import { cn } from "@/lib/utils";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [exploreOpen, setExploreOpen] = useState(false);
//   const pathname = usePathname();

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <header className={cn(
//       "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
//       scrolled
//         ? "bg-white/90 dark:bg-stone-950/90 backdrop-blur-md shadow-sm border-b border-stone-200/50 dark:border-stone-800/50"
//         : "bg-transparent"
//     )}>
//       <div className="container-pad">
//         <div className="flex items-center justify-between h-16">

//           {/* Logo */}
//           <Link href="/" className="flex items-center gap-2 font-bold text-lg">
//             <div className="w-8 h-8 rounded-xl flex items-center justify-center"
//               style={{ backgroundColor: "var(--color-primary)" }}>
//               <UtensilsCrossed size={16} className="text-white" />
//             </div>
//             <span className="text-stone-900 dark:text-white">
//               Foodie<span style={{ color: "var(--color-primary)" }}>AI</span>
//             </span>
//           </Link>

//           {/* Desktop nav */}
//           <nav className="hidden md:flex items-center gap-1">
//             {NAV_LINKS.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className={cn(
//                   "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
//                   pathname === link.href
//                     ? "text-[var(--color-primary)] bg-[var(--color-primary)]/10"
//                     : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800"
//                 )}
//               >
//                 {link.label}
//               </Link>
//             ))}

//             {/* Explore dropdown */}
//             <div className="relative" onMouseEnter={() => setExploreOpen(true)} onMouseLeave={() => setExploreOpen(false)}>
//               <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer">
//                 Cuisines <ChevronDown size={14} />
//               </button>
//               {exploreOpen && (
//                 <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl shadow-lg py-1 z-50">
//                   {["Bengali", "Chinese", "Italian", "Japanese", "Fast Food", "Pizza"].map((c) => (
//                     <Link key={c} href={`/explore?cuisine=${c}`}
//                       className="block px-4 py-2 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">
//                       {c}
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </nav>

//           {/* Right side */}
//           <div className="hidden md:flex items-center gap-3">
//             <ThemeToggle />
//             <SignedOut>
//               <Link href="/login">
//                 <Button variant="ghost" size="sm">Login</Button>
//               </Link>
//               <Link href="/register">
//                 <Button variant="primary" size="sm">Sign Up</Button>
//               </Link>
//             </SignedOut>
//             <SignedIn>
//               <Link href="/dashboard">
//                 <Button variant="outline" size="sm">Dashboard</Button>
//               </Link>
//               <UserButton afterSignOutUrl="/" />
//             </SignedIn>
//           </div>

//           {/* Mobile menu button */}
//           <div className="flex md:hidden items-center gap-2">
//             <ThemeToggle />
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="w-9 h-9 rounded-xl flex items-center justify-center bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 cursor-pointer"
//             >
//               {isOpen ? <X size={18} /> : <Menu size={18} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {isOpen && (
//         <div className="md:hidden bg-white dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 py-4">
//           <div className="container-pad flex flex-col gap-1">
//             {NAV_LINKS.map((link) => (
//               <Link key={link.href} href={link.href}
//                 onClick={() => setIsOpen(false)}
//                 className={cn(
//                   "px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
//                   pathname === link.href
//                     ? "text-[var(--color-primary)] bg-[var(--color-primary)]/10"
//                     : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
//                 )}>
//                 {link.label}
//               </Link>
//             ))}
//             <div className="flex flex-col gap-2 pt-3 mt-2 border-t border-stone-200 dark:border-stone-800">
//               <SignedOut>
//                 <Link href="/login" onClick={() => setIsOpen(false)}>
//                   <Button variant="ghost" size="md" className="w-full">Login</Button>
//                 </Link>
//                 <Link href="/register" onClick={() => setIsOpen(false)}>
//                   <Button variant="primary" size="md" className="w-full">Sign Up</Button>
//                 </Link>
//               </SignedOut>
//               <SignedIn>
//                 <Link href="/dashboard" onClick={() => setIsOpen(false)}>
//                   <Button variant="outline" size="md" className="w-full">Dashboard</Button>
//                 </Link>
//               </SignedIn>
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }





"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";
import { Menu, X, ChevronDown, UtensilsCrossed } from "lucide-react";
import { NAV_LINKS } from "@/constants";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const pathname = usePathname();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 dark:bg-stone-950/90 backdrop-blur-md shadow-sm border-b border-stone-200/50 dark:border-stone-800/50"
          : "bg-transparent"
      )}
    >
      <div className="container-pad">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              <UtensilsCrossed size={16} className="text-white" />
            </div>
            <span className="text-stone-900 dark:text-white">
              Foodie<span style={{ color: "var(--color-primary)" }}>AI</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-[var(--color-primary)] bg-[var(--color-primary)]/10"
                    : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Cuisines dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setExploreOpen(true)}
              onMouseLeave={() => setExploreOpen(false)}
            >
              <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer">
                Cuisines <ChevronDown size={14} />
              </button>
              {exploreOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl shadow-lg py-1 z-50">
                  {["Bengali", "Chinese", "Italian", "Japanese", "Fast Food", "Pizza"].map((c) => (
                    <Link
                      key={c}
                      href={`/explore?cuisine=${c}`}
                      className="block px-4 py-2 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                    >
                      {c}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right side — desktop */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            {isSignedIn ? (
              <>
                <Link href="/dashboard">
                  <Button variant="outline" size="sm">Dashboard</Button>
                </Link>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 cursor-pointer"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 py-4">
          <div className="container-pad flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-[var(--color-primary)] bg-[var(--color-primary)]/10"
                    : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                )}
              >
                {link.label}
              </Link>
            ))}

            <div className="flex flex-col gap-2 pt-3 mt-2 border-t border-stone-200 dark:border-stone-800">
              {isSignedIn ? (
                <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" size="md" className="w-full">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" size="md" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    <Button variant="primary" size="md" className="w-full">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}