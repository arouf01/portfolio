import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed Hassan",
    role: "CEO, Tech Startup",
    content:
      "Abdur's expertise in Zoho automation transformed our workflow. He understood our needs perfectly and delivered beyond expectations. Highly recommended!",
    rating: 5,
    initials: "AH",
  },
  {
    name: "Sarah Johnson",
    role: "Product Manager, E-Commerce",
    content:
      "The React application Abdur built is clean, performant, and a joy to work with. Professional communication throughout the project.",
    rating: 5,
    initials: "SJ",
  },
  {
    name: "Fatima Ahmed",
    role: "Business Owner, Service Company",
    content:
      "Outstanding work on our WordPress website redesign. The site is faster, more beautiful, and has increased our conversions significantly.",
    rating: 5,
    initials: "FA",
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="testimonials"
      className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-56 h-56 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-56 h-56 bg-secondary/5 rounded-full blur-3xl" />
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
            Client Feedback
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold mt-4 mb-6"
          >
            What Clients <span className="gradient-text">Say</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-24 h-1 gradient-bg mx-auto rounded-full"
          />
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.15 }}
              className="group"
            >
              <div className="glass-card rounded-2xl p-8 h-full flex flex-col hover:scale-[1.02] transition-all duration-500 border border-primary/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5 + index * 0.15 + i * 0.05 }}
                    >
                      <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                    </motion.div>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-foreground mb-6 flex-1 leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 border-t border-primary/10 pt-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {testimonial.initials}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
