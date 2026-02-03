import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Globe, Code, Utensils } from "lucide-react";
import { Button } from "./ui/button";

const projects = [
  {
    title: "A1 Zoho Solutions",
    description:
      "Professional IT services and solutions platform with modern design and seamless user experience.",
    url: "https://a1zohosolutions.com",
    icon: Globe,
    tags: ["WordPress", "Web Design", "SEO"],
    gradient: "from-primary to-primary/60",
  },
  {
    title: "JSON Tools Platform",
    description: "Developer-focused JSON Formatter and Viewer Online.",
    url: "https://json.a1zohosolutions.com",
    icon: Code,
    tags: ["JavaScript", "React", "Tools"],
    gradient: "from-secondary to-secondary/60",
  },
  {
    title: "Food Menu Application",
    description:
      "A dynamic daily team meal management system where members can sign up, add their food items, and view the team’s meals through a beautiful, easy-to-use interface.",
    url: "https://foodmenu.a1zohosolutions.com",
    icon: Utensils,
    tags: ["React", "UI/UX", "CMS"],
    gradient: "from-primary to-secondary",
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-sm font-medium text-primary uppercase tracking-wider"
            >
              Portfolio
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-5xl font-bold mt-4 mb-6"
            >
              Recent <span className="gradient-text">Projects</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-24 h-1 gradient-bg mx-auto rounded-full"
            />
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.15 }}
                className="group"
              >
                <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col hover:scale-[1.03] transition-all duration-500">
                  {/* Project Header */}
                  <div
                    className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-20 h-20 bg-background/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                      >
                        <project.icon className="w-10 h-10 text-primary-foreground" />
                      </motion.div>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-20 h-20 border border-primary-foreground/20 rounded-full" />
                    <div className="absolute bottom-4 left-4 w-12 h-12 bg-primary-foreground/10 rounded-lg rotate-12" />
                  </div>

                  {/* Project Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold mb-3 group-hover:gradient-text transition-all">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 flex-1">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Button
                      variant="outline"
                      className="w-full group-hover:gradient-bg group-hover:text-primary-foreground group-hover:border-transparent transition-all"
                      asChild
                    >
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>Visit Site</span>
                        <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
