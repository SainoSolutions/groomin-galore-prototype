import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/80 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background z-10" />
        <img 
          src="/images/gallery-interior.png" 
          alt="Luxury Salon Interior" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-20 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 border border-primary/50 text-primary text-xs tracking-[0.2em] uppercase mb-6 rounded-sm bg-background/50 backdrop-blur-sm">
              Premium Unisex Salon & Academy
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.1] mb-8"
          >
            Where Precision <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 italic font-light">
              Meets Artistry
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10 font-light"
          >
            Step into a high-end urban atelier. A sophisticated grooming destination for those who take their personal style seriously.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button 
              onClick={() => scrollTo("locations")}
              size="lg" 
              className="w-full sm:w-auto rounded-none bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-sm font-semibold tracking-[0.15em]"
            >
              BOOK AN APPOINTMENT
            </Button>
            <Button 
              onClick={() => scrollTo("services")}
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto rounded-none border-primary/50 text-foreground hover:bg-primary/10 h-14 px-8 text-sm font-semibold tracking-[0.15em]"
            >
              EXPLORE SERVICES
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
