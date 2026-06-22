import { useListLocations } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function Locations() {
  const { data: locations = [] } = useListLocations();
    const safeLocatons = Array.isArray(locations) ? locations : [];

  if (safeLocatons.length === 0) return null;

  return (
    <section id="locations" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4 text-foreground">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 italic font-light">Locations</span>
          </h2>
          <p className="text-muted-foreground text-lg font-light">
            Find an atelier near you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {locations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-card border ${location.isMain ? 'border-primary' : 'border-border'} p-8`}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-foreground">{location.name}</h3>
                  {location.city && <p className="text-primary tracking-widest uppercase text-xs mt-2">{location.city}</p>}
                </div>
                {location.isMain && (
                  <span className="bg-primary/10 text-primary px-3 py-1 text-xs font-bold tracking-widest uppercase border border-primary/20">
                    Flagship
                  </span>
                )}
              </div>

              <div className="space-y-4 text-muted-foreground font-light text-sm">
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <p>{location.address}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <Phone className="h-5 w-5 text-primary shrink-0" />
                  <p>{location.phone}</p>
                </div>

                {location.email && (
                  <div className="flex items-center gap-4">
                    <Mail className="h-5 w-5 text-primary shrink-0" />
                    <p>{location.email}</p>
                  </div>
                )}

                {location.openingHours && (
                  <div className="flex items-start gap-4">
                    <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p className="whitespace-pre-line">{location.openingHours}</p>
                  </div>
                )}
              </div>

              {location.mapUrl && (
                <div className="mt-8 pt-6 border-t border-border">
                  <a 
                    href={location.mapUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-primary font-semibold text-sm tracking-widest uppercase hover:text-primary/80 transition-colors"
                  >
                    Get Directions <span className="text-lg">→</span>
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
