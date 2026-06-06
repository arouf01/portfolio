import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Facebook,
  ExternalLink,
  Send,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "arouf@a1zohosolutions.com",
    href: "mailto:arouf@a1zohosolutions.com",
    color: "hover:text-emerald-500",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+8801518980983",
    href: "https://wa.me/8801518980983",
    color: "hover:text-green-500",
  },
  {
    icon: ExternalLink,
    label: "Fiverr",
    value: "dev_abdur_rouf",
    href: "https://fiverr.com/dev_abdur_rouf",
    color: "hover:text-emerald-500",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "arouf01",
    href: "https://github.com/arouf01",
    color: "hover:text-foreground",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "abdur-rouf-ar",
    href: "https://www.linkedin.com/in/abdur-rouf-ar/",
    color: "hover:text-blue-500",
  },
  {
    icon: Facebook,
    label: "Facebook",
    value: "dev.abdur.rouf",
    href: "https://www.facebook.com/dev.abdur.rouf/",
    color: "hover:text-blue-600",
  },
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send as URL-encoded form data so this stays a CORS "simple request"
      // (no preflight) and populates PHP's $_POST for the Bit Integrations
      // webhook. We use mode: "no-cors" because the WordPress endpoint does
      // not return Access-Control-Allow-Origin headers — the request is still
      // delivered, but the response is opaque so we can't read its status.
      const payload = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        source: "Portfolio Contact Form",
        timestamp: new Date().toISOString(),
      });

      await fetch(
        "https://a1zohosolutions.com/wp-json/bit-pi/v1/webhook/callback/34d10e6b-4abf-40e7-8968-5aea12ab2852",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: payload,
        },
      );

      toast.success("Message sent successfully! I will get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Webhook error:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Have a project in mind or want to discuss how I can help your
            business? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {/* Quick Facts Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="glass-card rounded-2xl p-8 h-full border border-primary/20">
              <h3 className="text-lg font-semibold mb-6 text-foreground flex items-center gap-2">
                <span className="w-2 h-6 bg-gradient-to-b from-primary to-secondary rounded-full" />
                Quick Facts
              </h3>
              <div className="space-y-6">
                <div className="flex gap-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                      Location
                    </p>
                    <p className="text-foreground font-semibold">Bangladesh</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-2xl">⏱️</span>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                      Experience
                    </p>
                    <p className="text-foreground font-semibold">5+ Years</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-2xl">🏆</span>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                      Specialization
                    </p>
                    <p className="text-foreground font-semibold">
                      Zoho & JavaScript
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-2xl">💼</span>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                      Engagement
                    </p>
                    <p className="text-foreground font-semibold">
                      Hourly / Project
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-primary/10">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => {
                      // Replace with your actual CV URL
                      window.open("https://a1zohosolutions.com/cv", "_blank");
                    }}
                    className="w-full px-4 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                  >
                    📥 Download CV
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form & Links */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="grid lg:grid-cols-2 gap-8 h-full">
              {/* Contact Form */}
              <form
                onSubmit={handleSubmit}
                className="glass-card rounded-2xl p-8 border border-primary/10"
              >
                <h3 className="text-xl font-bold font-display mb-6">
                  Send a Message
                </h3>

                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2 text-muted-foreground"
                    >
                      Your Name
                    </label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="bg-background/50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2 text-muted-foreground"
                    >
                      Your Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="bg-background/50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2 text-muted-foreground"
                    >
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      rows={4}
                      className="bg-background/50 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                      />
                    ) : (
                      <>
                        Send Message
                        <Send size={18} className="ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </form>

              {/* Contact Links */}
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold font-display mb-6">
                    Direct Contact
                  </h3>
                  <div className="space-y-3">
                    {contactLinks.map((link, index) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                          duration: 0.4,
                          delay: 0.4 + index * 0.08,
                        }}
                        whileHover={{ x: 5, scale: 1.01 }}
                        className={`flex items-center gap-3 p-3 bg-primary/5 rounded-lg transition-all duration-300 ${link.color} group border border-primary/10 hover:border-primary/30`}
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                          <link.icon
                            size={18}
                            className="text-primary group-hover:text-primary transition-colors"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm">
                            {link.label}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {link.value}
                          </p>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
