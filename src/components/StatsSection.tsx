import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Users, Zap, Globe } from "lucide-react";

const stats = [
  {
    icon: Award,
    value: "5+",
    label: "Years of Experience",
    description: "Zoho & JavaScript",
    color: "text-blue-500",
  },
  {
    icon: Users,
    value: "480+",
    label: "Projects Completed",
    description: "Across multiple industries",
    color: "text-emerald-500",
  },
  {
    icon: Zap,
    value: "372+",
    label: "Clients Satisfied",
    description: "Worldwide partnerships",
    color: "text-amber-500",
  },
  {
    icon: Globe,
    value: "24/7",
    label: "Support Available",
    description: "Round-the-clock assistance",
    color: "text-pink-500",
  },
];

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 right-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4" ref={ref}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.15 }}
                className="group"
              >
                <div className="glass-card p-6 rounded-2xl text-center h-full hover:scale-105 transition-transform duration-300">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="flex justify-center mb-4"
                  >
                    <div className="p-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl">
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.2 + index * 0.15, type: "spring" }}
                    className="text-3xl md:text-4xl font-bold gradient-text mb-2"
                  >
                    {stat.value}
                  </motion.div>
                  <p className="font-semibold text-foreground text-sm md:text-base mb-1">
                    {stat.label}
                  </p>
                  <p className="text-muted-foreground text-xs md:text-sm">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
