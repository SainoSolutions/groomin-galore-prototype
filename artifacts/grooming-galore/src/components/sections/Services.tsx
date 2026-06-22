import { useState } from "react";
import { useListServices } from "@workspace/api-client-react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Services() {
  const { data: services = [] } = useListServices();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(services.map((s) => s.category)))];

  const filteredServices = activeCategory === "All" 
    ? services.filter(s => s.isActive)
    : services.filter(s => s.category === activeCategory && s.isActive);

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4 text-foreground">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 italic font-light">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg font-light">
            Precision grooming and luxury spa treatments tailored to your individual style.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm tracking-wider uppercase transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground font-semibold shadow-[0_0_15px_rgba(212,175,122,0.3)]"
                  : "bg-card border border-border text-foreground/70 hover:border-primary/50 hover:text-primary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={service.id}
                className="group relative bg-card border border-border p-6 hover:border-primary/50 transition-colors duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <Badge variant="outline" className="mb-3 text-xs tracking-widest uppercase border-primary/30 text-primary bg-primary/5">
                        {service.category}
                      </Badge>
                      <h3 className="font-serif text-xl font-bold text-foreground">{service.name}</h3>
                    </div>
                    <div className="text-right">
                      {service.discountedPrice ? (
                        <>
                          <span className="block text-lg font-bold text-primary">${service.discountedPrice}</span>
                          <span className="block text-sm text-muted-foreground line-through">${service.price}</span>
                        </>
                      ) : (
                        <span className="block text-lg font-bold text-primary">${service.price}</span>
                      )}
                    </div>
                  </div>
                  
                  {service.description && (
                    <p className="text-muted-foreground font-light text-sm mb-6 line-clamp-2">
                      {service.description}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest mt-auto border-t border-border pt-4">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{service.duration}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
