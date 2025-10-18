import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      title: "Backend",
      skills: ["Python", "Django", "Node.js", "Express", "PostgreSQL", "REST APIs"],
    },
    {
      title: "Frontend",
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "HTML/CSS", "JavaScript"],
    },
    {
      title: "Security",
      skills: ["Penetration Testing", "Vulnerability Assessment", "Network Security", "Cryptography"],
    },
    {
      title: "Tools & DevOps",
      skills: ["Git", "Docker", "Linux", "CI/CD", "AWS", "Nginx"],
    },
  ];

  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-black mb-4 text-center">
            Tech <span className="text-primary">Stack</span>
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
            Tools and technologies I use to bring ideas to life
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all group"
              >
                <h3 className="text-2xl font-bold mb-6 text-foreground group-hover:text-primary transition-colors font-mono">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.3,
                        delay: categoryIndex * 0.1 + skillIndex * 0.05,
                      }}
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 bg-muted rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all cursor-default border border-border hover:border-primary/30 font-mono text-sm"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
