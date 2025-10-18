import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Github, Linkedin, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
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
      // Validate input
      const validated = contactSchema.parse(formData);
      
      console.log("Submitting contact form:", { name: validated.name, email: validated.email });

      // Insert into database
      const { error: dbError } = await supabase
        .from("contact_submissions")
        .insert([{
          name: validated.name,
          email: validated.email,
          message: validated.message
        }]);

      if (dbError) {
        console.error("Error submitting contact form:", dbError);
        throw dbError;
      }

      // Send email notification
      const { error: emailError } = await supabase.functions.invoke(
        "send-contact-email",
        {
          body: {
            name: validated.name,
            email: validated.email,
            message: validated.message,
          },
        }
      );

      if (emailError) {
        console.error("Error sending email:", emailError);
        // Don't throw here - form was still saved to database
      }

      console.log("Contact form submitted successfully");
      
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast({
          title: "Validation Error",
          description: firstError.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/Cheatcode17",
      color: "hover:text-primary",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://ng.linkedin.com/in/michel-akerele-330468234",
      color: "hover:text-primary",
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:michelakerele@gmail.com",
      color: "hover:text-accent",
    },
    {
      name: "Telegram",
      icon: MessageSquare,
      url: "https://t.me/thecheat23",
      color: "hover:text-secondary",
    },
  ];

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-4 text-center">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
            Let's collaborate on your next project or just chat about tech, security, or music
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-mono mb-2 text-foreground">
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-card border-border focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-mono mb-2 text-foreground">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-card border-border focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-mono mb-2 text-foreground">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-card border-border focus:border-primary min-h-[150px]"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary-glow text-primary-foreground shadow-glow font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              <h3 className="text-2xl font-bold mb-6 font-mono">Connect With Me</h3>
              <p className="text-muted-foreground mb-8">
                Find me on these platforms or reach out directly via email. I'm always open to
                discussing new projects, creative ideas, or collaboration opportunities.
              </p>
              <div className="space-y-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: 30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                      className={`flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-all group ${social.color}`}
                    >
                      <Icon className="h-6 w-6" />
                      <span className="font-mono">{social.name}</span>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
