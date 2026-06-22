import { useGetStats } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Users, Calendar, Scissors, GraduationCap } from "lucide-react";

export function StatsRow() {
  const { data: stats } = useGetStats();

  const statItems = [
    {
      label: "Happy Clients",
      value: stats?.happyClients || 5000,
      suffix: "+",
      icon: Users,
    },
    {
      label: "Years Experience",
      value: stats?.yearsOfExperience || 10,
      suffix: "+",
      icon: Calendar,
    },
    {
      label: "Premium Services",
      value: stats?.totalServices || 30,
      suffix: "",
      icon: Scissors,
    },
    {
      label: "Academy Students",
      value: stats?.academyStudents || 1000,
      suffix: "+",
      icon: GraduationCap,
    },
  ];

  return (
    <section className="py-20 bg-card border-y border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {statItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <item.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-serif text-4xl font-bold text-foreground mb-2">
                  {item.value}{item.suffix}
                </h3>
                <p className="text-sm uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
