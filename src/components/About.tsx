import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Shield, Music, GraduationCap } from "lucide-react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    {
      icon: Code2,
      title: "Full-Stack Developer",
      description: "Building scalable applications with Python, Django, React, and Node.js",
    },
    {
      icon: Shield,
      title: "Ethical Hacker",
      description: "Securing systems and finding vulnerabilities before the bad guys do",
    },
    {
      icon: Music,
      title: "Rap Artist",
      description: "Creating raw, introspective music that channels emotion and rebellion",
    },
    {
      icon: GraduationCap,
      title: "History Student",
      description: "Learning from the past to build a better future",
    },
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-8 text-center">
            <span className="text-primary">About</span> Me
          </h2>

          <div className="mb-16">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              I'm <span className="text-primary font-bold">Michel Akerele</span>, a 21-year-old
              creator who lives at the intersection of technology and art. By day, I'm building
              the future with code—architecting full-stack applications, securing systems as an
              ethical hacker, and founding{" "}
              <span className="text-secondary font-bold">EduGig</span>, an educational freelance
              platform.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              By night, I'm crafting raw, emotional rap music that tells my story—blending
              technical precision with creative soul. Whether I'm writing Python code or writing
              lyrics, I bring the same intensity and authenticity to everything I create.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              When I'm not coding or creating music, you'll find me studying history, gaming,
              or swimming. I believe in learning from the past to build a better future, and
              I'm always pushing myself to grow both as a developer and as an artist.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all group hover:shadow-glow"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-foreground">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
