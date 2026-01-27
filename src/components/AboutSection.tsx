import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code, Zap, Globe, Workflow } from "lucide-react";

const highlights = [
  { icon: Code, label: "Zoho CRM Expert", value: "3+ Years" },
  { icon: Zap, label: "JS Development", value: "React & Node" },
  { icon: Globe, label: "WordPress Sites", value: "30+ Built" },
  { icon: Workflow, label: "Automations", value: "100+ Workflows" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">About Me</span>
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
            Turning <span className="gradient-text">Ideas</span> Into Reality
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            I'm a passionate developer specializing in Zoho ecosystem,
            JavaScript development, and WordPress design. I help businesses
            streamline their operations with custom CRM solutions, automation
            workflows, and beautiful web experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border/50"
            >
              <motion.div
                whileHover={{ rotate: 10 }}
                className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center mb-4"
              >
                <item.icon className="text-primary-foreground" size={24} />
              </motion.div>
              <h3 className="text-2xl font-bold font-display gradient-text mb-1">
                {item.value}
              </h3>
              <p className="text-muted-foreground">{item.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-card rounded-3xl p-8 md:p-12 shadow-card border border-border/50"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold font-display mb-4">
                Why Work With Me?
              </h3>
              <p className="text-muted-foreground mb-6">
                I bring a unique combination of technical expertise and business
                understanding. Whether you need a custom Zoho CRM setup, a
                dynamic React application, or a stunning WordPress site, I
                deliver solutions that drive results.
              </p>
              <ul className="space-y-3">
                {[
                  "End-to-end Zoho CRM & Creator development",
                  "Custom JavaScript solutions with React & Node.js",
                  "Professional WordPress website design",
                  "REST API integration & automation",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-foreground/80">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="absolute inset-0 gradient-bg opacity-10 rounded-2xl blur-xl" />
              <div className="relative bg-background/50 backdrop-blur rounded-2xl p-6 border border-border">
                <pre className="text-sm overflow-x-auto">
                  <code className="text-muted-foreground">
                    {`const developer = {
  name: "Abdur Rouf",
  skills: [
    "Zoho One",
    "React.js",
    "Node.js",
    "WordPress"
  ],
  passion: "Building Solutions",
  available: true
};`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
