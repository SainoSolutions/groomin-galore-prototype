import { useGetAcademy } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { GraduationCap, Award, Globe, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Academy() {
  const { data: academy } = useGetAcademy();

  if (!academy || !academy.isActive) return null;

  return (
    <section id="academy" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <span className="font-serif text-xl text-primary font-semibold tracking-widest uppercase">The Academy</span>
          </div>
          
          <h2 className="font-serif text-4xl md:text-6xl font-bold mb-8 text-foreground">
            Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 italic font-light">Craft</span>
          </h2>
          
          <div className="bg-card border border-border p-8 md:p-12 shadow-2xl relative">
            {academy.internationalRecognition && (
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 text-xs font-bold tracking-widest uppercase flex items-center gap-2 shadow-lg">
                <Globe className="h-4 w-4" />
                Internationally Recognized
              </div>
            )}
            
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              {academy.name}
            </h3>
            
            <p className="text-muted-foreground text-lg font-light leading-relaxed mb-10">
              {academy.description}
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold tracking-widest uppercase text-foreground mb-3 flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" /> Credentials
                  </h4>
                  <p className="text-muted-foreground font-light">{academy.credentialInfo}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold tracking-widest uppercase text-foreground mb-3">
                    Programs Included
                  </h4>
                  <p className="text-muted-foreground font-light">{academy.courses}</p>
                </div>
              </div>
              
              <div className="bg-background border border-primary/20 p-6 flex flex-col justify-center">
                <div className="mb-6">
                  <span className="block text-sm text-muted-foreground uppercase tracking-widest mb-1">Duration</span>
                  <span className="font-serif text-2xl text-foreground">{academy.duration}</span>
                </div>
                <div>
                  <span className="block text-sm text-muted-foreground uppercase tracking-widest mb-1">Investment</span>
                  <span className="font-serif text-2xl text-primary font-bold">
                    {academy.fee ? `$${academy.fee}` : "Contact for pricing"}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-border pt-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="flex gap-6 text-sm">
                {academy.inquiryEmail && (
                  <a href={`mailto:${academy.inquiryEmail}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="h-4 w-4" /> {academy.inquiryEmail}
                  </a>
                )}
                {academy.inquiryPhone && (
                  <a href={`tel:${academy.inquiryPhone}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <Phone className="h-4 w-4" /> {academy.inquiryPhone}
                  </a>
                )}
              </div>
              
              <Button className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-semibold tracking-wider px-8 w-full sm:w-auto">
                APPLY NOW
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
