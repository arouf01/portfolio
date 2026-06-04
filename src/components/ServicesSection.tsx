import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Code, Puzzle, Layers, Briefcase, Lightbulb } from "lucide-react";

const services = [
  {
    icon: Zap,
    title: "Zoho Development",
    description:
      "Custom Zoho solutions with automation, custom modules, and business workflows tailored to your needs.",
    skills: ["Zoho Creator", "Zoho Flow", "Custom Apps", "Automation"],
  },
  {
    icon: Code,
    title: "JavaScript & React",
    description:
      "Modern web applications using React, TypeScript, and cutting-edge frontend technologies.",
    skills: ["React.js", "TypeScript", "Tailwind CSS", "Next.js"],
  },
  {
    icon: Puzzle,
    title: "Zoho Integrations",
    description:
      "Seamlessly integrate Zoho with your existing systems, third-party apps, and custom solutions.",
    skills: ["API Integration", "Webhooks", "Data Sync", "Third-party Apps"],
  },
  {
    icon: Layers,
    title: "WordPress Solutions",
    description:
      "Professional WordPress design, custom themes, plugins, and optimization for your business.",
    skills: ["Theme Development", "Plugin Creation", "SEO", "Performance"],
  },
  {
    icon: Briefcase,
    title: "Business Automation",
    description:
      "Streamline workflows, reduce manual tasks, and boost productivity with intelligent automation.",
    skills: [
      "Workflow Design",
      "Process Automation",
      "CRM Setup",
      "Optimization",
    ],
  },
  {
    icon: Lightbulb,
    title: "Consulting & Strategy",
    description:
      "Expert guidance on technology solutions, system design, and digital transformation strategies.",
    skills: [
      "Technical Strategy",
      "System Design",
      "Best Practices",
      "Training",
    ],
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden"
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
            What I Offer
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold mt-4 mb-6"
          >
            Services & <span className="gradient-text">Expertise</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-24 h-1 gradient-bg mx-auto rounded-full"
          />
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="group"
              >
                <div className="glass-card rounded-2xl p-8 h-full hover:scale-[1.03] transition-all duration-500 border border-primary/10 hover:border-primary/30">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="mb-6"
                  >
                    <div className="p-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl w-fit">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2">
                    {service.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.05 }}
                        className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
