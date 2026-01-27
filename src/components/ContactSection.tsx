import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import axios from "axios";
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
import { log } from "console";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "arouf@advanced-it.top",
    href: "mailto:arouf@advanced-it.top",
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
      const payload = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        source: "Portfolio Contact Form",
        timestamp: new Date().toISOString(),
      };
      console.log(payload);
      await axios.post(
        "https://advanced-it.top/wp-json/bit-pi/v1/webhook/callback/b9c52282-d6bc-4b0b-8476-8389877b436c",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
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

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-3xl p-8 shadow-card border border-border/50"
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
                    rows={5}
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
          </motion.div>

          {/* Contact Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-xl font-bold font-display mb-6">
              Or Reach Out Directly
            </h3>

            <div className="space-y-4">
              {contactLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className={`flex items-center gap-4 p-4 bg-card rounded-2xl shadow-soft border border-border/50 transition-all duration-300 ${link.color} group`}
                >
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center group-hover:gradient-bg transition-colors duration-300">
                    <link.icon
                      size={22}
                      className="text-muted-foreground group-hover:text-primary-foreground transition-colors"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{link.label}</p>
                    <p className="text-sm text-muted-foreground">
                      {link.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
