import { Link } from "wouter";
import { Scissors, Instagram, Facebook, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Scissors className="h-6 w-6 text-primary" />
              <span className="font-serif text-2xl font-bold tracking-wider text-foreground">
                GROOMING <span className="text-primary">GALORE</span>
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-md mb-8">
              Where precision meets artistry. A premium unisex salon and academy offering sophisticated grooming experiences and world-class professional training.
            </p>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 rounded-full bg-background flex items-center justify-center text-foreground hover:text-primary transition-colors border border-border">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-background flex items-center justify-center text-foreground hover:text-primary transition-colors border border-border">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-background flex items-center justify-center text-foreground hover:text-primary transition-colors border border-border">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-6 text-foreground">Quick Links</h4>
            <ul className="space-y-4">
              <li><button onClick={() => document.getElementById('services')?.scrollIntoView({behavior: 'smooth'})} className="text-muted-foreground hover:text-primary transition-colors">Services</button></li>
              <li><button onClick={() => document.getElementById('academy')?.scrollIntoView({behavior: 'smooth'})} className="text-muted-foreground hover:text-primary transition-colors">Academy</button></li>
              <li><button onClick={() => document.getElementById('gallery')?.scrollIntoView({behavior: 'smooth'})} className="text-muted-foreground hover:text-primary transition-colors">Gallery</button></li>
              <li><Link href="/admin" className="text-muted-foreground hover:text-primary transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6 text-foreground">Contact</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li>Dubai / USA Certified</li>
              <li>info@groominggalore.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Grooming Galore. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
