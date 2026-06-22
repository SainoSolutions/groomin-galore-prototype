import { useGetStats } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Scissors, GraduationCap, Tag, MessageSquare, MapPin } from "lucide-react";

export function AdminStats() {
  const { data: stats } = useGetStats();

  const statCards = [
    { title: "Total Services", value: stats?.totalServices || 0, icon: Scissors },
    { title: "Active Offers", value: stats?.activeOffers || 0, icon: Tag },
    { title: "Testimonials", value: stats?.totalTestimonials || 0, icon: MessageSquare },
    { title: "Locations", value: stats?.totalLocations || 0, icon: MapPin },
    { title: "Happy Clients", value: stats?.happyClients || 0, icon: Users },
    { title: "Academy Students", value: stats?.academyStudents || 0, icon: GraduationCap },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {statCards.map((stat, i) => (
        <Card key={i} className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl font-bold font-serif">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
