import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin } from "lucide-react";

const clients = [
  {
    name: "A1 Zoho Solutions",
    industry: "IT Services",
    description: "Professional Zoho services and custom development solutions.",
    region: "Bangladesh",
    flag: "🇧🇩",
  },
  {
    name: "JSON Tools Platform",
    industry: "Developer Tools",
    description:
      "Advanced JSON formatting and manipulation tools for developers.",
    region: "Global",
    flag: "🌍",
  },
  {
    name: "Food Menu Application",
    industry: "Food & Beverage",
    description: "Dynamic team meal management and coordination system.",
    region: "Bangladesh",
    flag: "🇧🇩",
  },
  {
    name: "E-Commerce Platform",
    industry: "E-Commerce",
    description: "Full-stack e-commerce solution with Zoho integration.",
    region: "Asia",
    flag: "🌏",
  },
  {
    name: "Startup SaaS",
    industry: "SaaS",
    description:
      "Cloud-based business management application with React frontend.",
    region: "Global",
    flag: "🌍",
  },
  {
    name: "Enterprise CRM",
    industry: "Enterprise",
    description: "Large-scale CRM implementation with Zoho customization.",
    region: "Middle East",
    flag: "🌐",
  },
];

const ClientsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="clients"
      className="py-20 lg:py-32 bg-background relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4" ref={ref}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-sm font-medium text-primary uppercase tracking-wider"
          >
            Client Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold mt-4 mb-6"
          >
            Trusted by <span className="gradient-text">Global Clients</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Successfully delivered projects across multiple industries and
            regions, building lasting partnerships with clients worldwide.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-24 h-1 gradient-bg mx-auto rounded-full mt-6"
          />
        </div>

        {/* Clients Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.08 }}
              className="group"
            >
              <div className="glass-card rounded-2xl p-6 h-full hover:scale-[1.02] transition-all duration-500 border border-primary/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {client.name}
                    </h3>
                    <p className="text-sm text-primary font-medium">
                      {client.industry}
                    </p>
                  </div>
                  <span className="text-2xl ml-2">{client.flag}</span>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {client.description}
                </p>

                {/* Region */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{client.region}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-4">
            & many more businesses across the globe
          </p>
          <div className="flex flex-wrap justify-center gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">480+</div>
              <p className="text-sm text-muted-foreground">
                Projects Delivered
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">37+</div>
              <p className="text-sm text-muted-foreground">Industries Served</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">100%</div>
              <p className="text-sm text-muted-foreground">
                Client Satisfaction
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientsSection;
