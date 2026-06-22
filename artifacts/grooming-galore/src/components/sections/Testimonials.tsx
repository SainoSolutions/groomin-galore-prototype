import { useListTestimonials } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Testimonials() {
 const { data: testimonials = [] } = useListTestimonials();

// Safely normalize the object into an array if the backend wrapped it
const safeTestimonials = Array.isArray(testimonials) ? testimonials : [];
const visibleTestimonials = safeTestimonials.filter((t) => t.isVisible);

  if (visibleTestimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 bg-card border-y border-border overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4 text-foreground">
            Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 italic font-light">Experiences</span>
          </h2>
          <p className="text-muted-foreground text-lg font-light">
            Don't just take our word for it.
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative px-8 md:px-16">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {visibleTestimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/2 pl-4 md:pl-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-background border border-border p-8 h-full flex flex-col relative"
                  >
                    <Quote className="absolute top-6 right-6 h-12 w-12 text-primary/10" />
                    
                    <div className="flex gap-1 mb-6">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating
                              ? "fill-primary text-primary"
                              : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    
                    <p className="text-foreground/80 font-light leading-relaxed mb-8 flex-grow italic">
                      "{testimonial.review}"
                    </p>
                    
                    <div className="flex items-center gap-4 mt-auto">
                      <Avatar className="h-12 w-12 border border-primary/30">
                        {testimonial.avatarUrl ? (
                          <AvatarImage src={testimonial.avatarUrl} alt={testimonial.clientName} />
                        ) : null}
                        <AvatarFallback className="bg-primary/10 text-primary font-serif">
                          {testimonial.clientName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-foreground text-sm uppercase tracking-wider">
                          {testimonial.clientName}
                        </p>
                        {testimonial.role && (
                          <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
                            {testimonial.role}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 border-primary/30 hover:bg-primary hover:text-primary-foreground" />
            <CarouselNext className="right-0 border-primary/30 hover:bg-primary hover:text-primary-foreground" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
