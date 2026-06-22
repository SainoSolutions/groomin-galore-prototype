import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Services", id: "services" },
    { name: "Offers", id: "offers" },
    { name: "Story", id: "about" },
    { name: "Gallery", id: "gallery" },
    { name: "Academy", id: "academy" },
    { name: "Locations", id: "locations" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Scissors className="h-6 w-6 text-primary transition-transform group-hover:rotate-45" />
          <span className="font-serif text-xl font-bold tracking-wider text-foreground">
            GROOMING <span className="text-primary">GALORE</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.id)}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors uppercase tracking-widest"
            >
              {link.name}
            </button>
          ))}
          <Button
            onClick={() => scrollTo("locations")}
            className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-semibold tracking-wider px-6"
          >
            BOOK NOW
          </Button>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border shadow-lg py-4 px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.id)}
              className="text-left text-sm font-medium text-foreground/80 hover:text-primary transition-colors uppercase tracking-widest py-2"
            >
              {link.name}
            </button>
          ))}
          <Button
            onClick={() => scrollTo("locations")}
            className="w-full rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-semibold tracking-wider mt-2"
          >
            BOOK NOW
          </Button>
        </div>
      )}
    </header>
  );
}
