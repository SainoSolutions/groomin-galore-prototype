import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] relative border border-primary/20 p-4">
              <div className="w-full h-full bg-card overflow-hidden">
                <img 
                  src="/images/gallery-haircut.png" 
                  alt="Master stylist at work" 
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t border-r border-primary"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b border-l border-primary"></div>
            </div>
            
            <div className="absolute -bottom-8 -right-8 bg-card border border-border p-6 shadow-2xl max-w-xs hidden md:block">
              <div className="flex items-start gap-4">
                <ShieldCheck className="h-8 w-8 text-primary shrink-0" />
                <div>
                  <h4 className="font-serif font-bold text-foreground mb-1">Global Standard</h4>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Dubai & USA Certified</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block py-1 px-3 border border-primary/30 text-primary text-xs tracking-[0.2em] uppercase mb-6 rounded-sm bg-primary/5">
              The Grooming Galore Story
            </span>
            
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-foreground leading-tight">
              Redefining the <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 italic font-light">Art of Grooming</span>
            </h2>
            
            <div className="space-y-6 text-muted-foreground font-light text-lg">
              <p>
                Founded on the principle that personal style is an extension of one's identity, Grooming Galore has evolved from a local premium salon into an internationally recognized grooming destination and academy.
              </p>
              <p>
                We believe in precision, luxury, and the transformative power of a perfect cut or treatment. Our space is designed to be a sanctuary—a dark, refined atelier where you can unwind while our master stylists work their craft.
              </p>
              <p>
                With credentials recognized across the UAE, Dubai, and USA markets, our techniques meet the highest global standards. Whether you're here for a signature service or to learn the craft at our Academy, you're experiencing grooming at its absolute peak.
              </p>
            </div>
            
            <div className="mt-10 grid grid-cols-2 gap-6 pt-10 border-t border-border">
              <div>
                <h4 className="text-primary font-bold text-xl mb-2">Artistry</h4>
                <p className="text-sm text-muted-foreground">Every service is executed with meticulous attention to detail.</p>
              </div>
              <div>
                <h4 className="text-primary font-bold text-xl mb-2">Excellence</h4>
                <p className="text-sm text-muted-foreground">Premium products and internationally certified techniques.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
