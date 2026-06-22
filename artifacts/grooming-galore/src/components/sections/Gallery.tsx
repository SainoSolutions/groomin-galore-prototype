import { useListGallery } from "@workspace/api-client-react";
import { motion } from "framer-motion";

export function Gallery() {
  const { data: gallery = [] } = useListGallery();

  // If no DB images, use the generated fallbacks for the showcase
  const images = gallery.length > 0 ? gallery.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)) : [
    { id: 1, url: "/images/gallery-haircut.png", alt: "Luxury Haircut" },
    { id: 2, url: "/images/gallery-beard.png", alt: "Beard Grooming" },
    { id: 3, url: "/images/gallery-nails.png", alt: "Nail Art" },
    { id: 4, url: "/images/gallery-facial.png", alt: "Facial Treatment" },
    { id: 5, url: "/images/gallery-color.png", alt: "Hair Coloring" },
    { id: 6, url: "/images/gallery-interior.png", alt: "Salon Interior" },
  ];

  return (
    <section id="gallery" className="py-24 bg-card border-y border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4 text-foreground">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 italic font-light">Atelier</span>
          </h2>
          <p className="text-muted-foreground text-lg font-light">
            A glimpse into the Grooming Galore experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative overflow-hidden group bg-background ${
                index === 0 || index === 5 ? "md:col-span-2 lg:col-span-2 aspect-[2/1]" : "aspect-square"
              }`}
            >
              <img
                src={image.url}
                alt={image.alt || "Gallery image"}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
