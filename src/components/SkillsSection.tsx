import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skills = [
  {
    name: "Zoho One",
    level: 95,
    description: "Custom modules, workflows, and business applications",
  },
  {
    name: "JavaScript (React.js)",
    level: 85,
    description: "Modern web applications with React ecosystem",
  },
  {
    name: "Node.js Development",
    level: 75,
    description: "Backend APIs and server-side applications",
  },
  {
    name: "WordPress Design",
    level: 90,
    description: "Custom themes, plugins, and responsive designs",
  },
  {
    name: "REST API Integration",
    level: 88,
    description: "Connecting systems and automating data flows",
  },
  {
    name: "Business Automation",
    level: 92,
    description: "Workflow automation and process optimization",
  },
];

const SkillBar = ({
  skill,
  index,
  isInView,
}: {
  skill: (typeof skills)[0];
  index: number;
  isInView: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
          {skill.name}
        </h4>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 + index * 0.1 }}
          className="text-sm font-medium gradient-text"
        >
          {skill.level}%
        </motion.span>
      </div>
      <p className="text-muted-foreground text-sm mb-3">{skill.description}</p>
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{
            duration: 1,
            delay: 0.3 + index * 0.1,
            ease: "easeOut",
          }}
          className="h-full gradient-bg rounded-full relative"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 1 + index * 0.2,
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">
            My Expertise
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Focused expertise in Zoho ecosystem, modern JavaScript development,
            and professional website design.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-8">
          {skills.map((skill, index) => (
            <SkillBar
              key={skill.name}
              skill={skill}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Tech Stack Icons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 flex flex-wrap justify-center gap-8"
        >
          {[
            "Zoho One",
            "React",
            "Node.js",
            "WordPress",
            "JavaScript",
            "REST API",
          ].map((tech, i) => (
            <motion.div
              key={tech}
              whileHover={{ scale: 1.1, y: -5 }}
              className="px-6 py-3 bg-card rounded-full shadow-card border border-border/50 text-muted-foreground font-medium hover:text-primary hover:border-primary/50 transition-all cursor-default"
            >
              {tech}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
