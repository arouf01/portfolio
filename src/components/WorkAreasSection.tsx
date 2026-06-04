import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ShoppingCart,
  Building2,
  Rocket,
  Stethoscope,
  Banknote,
  BarChart3,
} from "lucide-react";

const workAreas = [
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    description: "Online stores, payment processing, inventory management",
  },
  {
    icon: Building2,
    title: "Enterprise",
    description: "Large-scale CRM, ERP, and business solutions",
  },
  {
    icon: Rocket,
    title: "Startups",
    description: "MVP development, rapid scaling, growth automation",
  },
  {
    icon: Stethoscope,
    title: "Healthcare",
    description: "Patient management, appointment systems, data security",
  },
  {
    icon: Banknote,
    title: "Finance",
    description: "Accounting, invoicing, financial reporting systems",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Data visualization, reporting, business intelligence",
  },
];

const WorkAreasSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="work-areas"
      className="py-20 lg:py-32 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden"
    >
      <div className="container mx-auto px-4" ref={ref}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-sm font-medium text-primary uppercase tracking-wider"
          >
            Specializations
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold mt-4 mb-6"
          >
            Industries & <span className="gradient-text">Work Areas</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Expertise across diverse sectors, delivering tailored solutions for
            every industry's unique challenges.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-24 h-1 gradient-bg mx-auto rounded-full mt-6"
          />
        </div>

        {/* Work Areas Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {workAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + index * 0.08 }}
                className="group"
              >
                <div className="glass-card rounded-2xl p-8 text-center h-full hover:scale-[1.05] transition-all duration-500 border border-primary/10 hover:border-primary/30">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    className="flex justify-center mb-6"
                  >
                    <div className="p-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl">
                      <Icon className="w-10 h-10 text-primary" />
                    </div>
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {area.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {area.description}
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

export default WorkAreasSection;
