import { Link } from "wouter";
import { Scissors, ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminStats } from "@/components/admin/AdminStats";
import { AdminServices } from "@/components/admin/AdminServices";
import { AdminOffers } from "@/components/admin/AdminOffers";
import { AdminTestimonials } from "@/components/admin/AdminTestimonials";
import { AdminAcademy } from "@/components/admin/AdminAcademy";
import { AdminLocations } from "@/components/admin/AdminLocations";
import { AdminGallery } from "@/components/admin/AdminGallery";

export default function AdminPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground">
      {/* Admin Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scissors className="h-5 w-5 text-primary" />
            <span className="font-serif text-lg font-bold tracking-wider">
              GROOMING <span className="text-primary">GALORE</span>
              <span className="ml-2 text-xs text-muted-foreground uppercase tracking-widest font-sans border border-border px-2 py-1 rounded-sm">Admin</span>
            </span>
          </div>
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Site
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <AdminStats />

        <Tabs defaultValue="services" className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto bg-card border border-border h-auto p-1 mb-8">
            <TabsTrigger value="services" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground uppercase tracking-widest text-xs py-3 px-6 rounded-sm">Services</TabsTrigger>
            <TabsTrigger value="offers" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground uppercase tracking-widest text-xs py-3 px-6 rounded-sm">Offers</TabsTrigger>
            <TabsTrigger value="testimonials" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground uppercase tracking-widest text-xs py-3 px-6 rounded-sm">Testimonials</TabsTrigger>
            <TabsTrigger value="academy" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground uppercase tracking-widest text-xs py-3 px-6 rounded-sm">Academy</TabsTrigger>
            <TabsTrigger value="locations" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground uppercase tracking-widest text-xs py-3 px-6 rounded-sm">Locations</TabsTrigger>
            <TabsTrigger value="gallery" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground uppercase tracking-widest text-xs py-3 px-6 rounded-sm">Gallery</TabsTrigger>
          </TabsList>

          <div className="bg-card border border-border rounded-md p-6 min-h-[500px]">
            <TabsContent value="services" className="m-0 focus-visible:outline-none">
              <AdminServices />
            </TabsContent>
            
            <TabsContent value="offers" className="m-0 focus-visible:outline-none">
              <AdminOffers />
            </TabsContent>
            
            <TabsContent value="testimonials" className="m-0 focus-visible:outline-none">
              <AdminTestimonials />
            </TabsContent>
            
            <TabsContent value="academy" className="m-0 focus-visible:outline-none">
              <AdminAcademy />
            </TabsContent>
            
            <TabsContent value="locations" className="m-0 focus-visible:outline-none">
              <AdminLocations />
            </TabsContent>
            
            <TabsContent value="gallery" className="m-0 focus-visible:outline-none">
              <AdminGallery />
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
}
