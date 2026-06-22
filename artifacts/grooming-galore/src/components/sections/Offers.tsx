import { useListOffers } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Tag, Clock } from "lucide-react";
import { format } from "date-fns";

export function Offers() {
  const { data: offers = [] } = useListOffers();
  
  // Paste your fix right here:
  const safeOffers = Array.isArray(offers) ? offers : [];
  const activeOffers = safeOffers.filter((o) => o.isActive);

  if (activeOffers.length === 0) return null;


  return (
    <section id="offers" className="py-24 bg-card border-y border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4 text-foreground">
              Exclusive <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 italic font-light">Offers</span>
            </h2>
            <p className="text-muted-foreground text-lg font-light">
              Limited-time premium experiences at exceptional value.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeOffers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative bg-background border border-primary/20 p-8 overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <Tag className="h-24 w-24 text-primary" />
              </div>
              
              <div className="relative z-10">
                {(offer.discountPercent || offer.discountAmount) && (
                  <div className="inline-block bg-primary text-primary-foreground px-3 py-1 text-sm font-bold tracking-wider mb-6">
                    {offer.discountPercent ? `${offer.discountPercent}% OFF` : `$${offer.discountAmount} OFF`}
                  </div>
                )}
                
                <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
                  {offer.title}
                </h3>
                
                <p className="text-muted-foreground font-light mb-8">
                  {offer.description}
                </p>
                
                {offer.validUntil && (
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-semibold">
                    <Clock className="h-4 w-4" />
                    <span>Valid until {format(new Date(offer.validUntil), 'MMM dd, yyyy')}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
