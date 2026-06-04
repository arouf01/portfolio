import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skillCategories = [
  {
    title: "Zoho Platform",
    skills: [
      {
        name: "Zoho Creator",
        level: 95,
        description: "Custom applications and modules",
      },
      {
        name: "Zoho CRM",
        level: 90,
        description: "Sales automation and customer management",
      },
      {
        name: "Zoho Flow",
        level: 92,
        description: "Workflow automation and integrations",
      },
    ],
  },
  {
    title: "Frontend Development",
    skills: [
      {
        name: "React & TypeScript",
        level: 85,
        description: "Modern web applications and components",
      },
      {
        name: "Tailwind CSS",
        level: 88,
        description: "Responsive design and animations",
      },
      {
        name: "Framer Motion",
        level: 82,
        description: "Interactive animations and transitions",
      },
    ],
  },
  {
    title: "Backend & Integration",
    skills: [
      {
        name: "Node.js",
        level: 75,
        description: "Server-side applications and APIs",
      },
      {
        name: "REST APIs",
        level: 88,
        description: "System integration and data flow",
      },
      {
        name: "Webhooks & Integrations",
        level: 90,
        description: "Third-party connections and automation",
      },
    ],
  },
  {
    title: "Web & Content",
    skills: [
      {
        name: "WordPress",
        level: 90,
        description: "Custom themes, plugins, and optimization",
      },
      {
        name: "SEO & Performance",
        level: 85,
        description: "Site optimization and search ranking",
      },
      {
        name: "JavaScript",
        level: 87,
        description: "Core programming and DOM manipulation",
      },
    ],
  },
];

const SkillBar = ({
  skill,
  index,
  isInView,
}: {
  skill: (typeof skillCategories)[0]["skills"][0];
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
            Technical proficiency across multiple platforms and technologies.
          </p>
        </motion.div>

        {/* Skills by Category */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {skillCategories.map((category, catIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: catIndex * 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-8 text-foreground flex items-center gap-3">
                  <span className="w-1 h-8 bg-gradient-to-b from-primary to-secondary rounded-full" />
                  {category.title}
                </h3>
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar
                      key={skill.name}
                      skill={skill}
                      index={catIndex * 3 + skillIndex}
                      isInView={isInView}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tech Stack Icons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 flex flex-wrap justify-center gap-4"
        >
          {[
            "Zoho Creator",
            "React",
            "TypeScript",
            "Node.js",
            "WordPress",
            "JavaScript",
            "REST API",
            "Tailwind CSS",
            "Framer Motion",
          ].map((tech, i) => (
            <motion.div
              key={tech}
              whileHover={{ scale: 1.1, y: -5 }}
              className="px-4 py-2 bg-primary/10 rounded-full border border-primary/20 text-primary font-medium hover:border-primary/50 transition-all cursor-default text-sm"
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
