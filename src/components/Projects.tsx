import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      title: "EduGig",
      description:
        "A comprehensive educational freelance platform built with Django. Features include user management, gig marketplace, course system, integrated wallet, real-time chat, and notifications. Empowering educators and students to connect and learn.",
      tags: ["Django", "Python", "PostgreSQL", "REST API", "WebSocket"],
      github: "https://github.com/Cheatcode17/lasued-edugig",
      live: "#",
      featured: true,
    },
    {
      title: "LASUED Campus Navigator App",
      description:
        "A navigation app for Lagos State University of Education (LASUED) built with React Native. Features include interactive campus maps, building directories, event calendars, and real-time notifications to enhance student experience.",
      tags: ["React Native", "Expo", "Firebase", "Google Maps API"],
      github: "https://github.com/Cheatcode17/uni-map-navigate",
      live: "#",
      featured: false,
    },
    {
      title: "Lady Atinuke Oyindamola Memorial Orphanage Home Website",
      description:
        "A responsive website for Lady Atinuke Oyindamola Memorial Orphanage Home built with HTML, CSS, and JavaScript. Showcasing the orphanage's mission, programs, and ways to support through donations and volunteering.",
      tags: ["HTML", "CSS", "JavaScript", "Responsive Design"],
      github: "https://github.com/Cheatcode17/lady2",
      featured: false,
    },
  ];

  return (
    <section id="projects" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-black mb-4 text-center">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
            A selection of my recent work showcasing full-stack development, security, and innovation
          </p>

          <div className="space-y-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`bg-card border border-border rounded-lg p-6 md:p-8 hover:border-primary/50 transition-all group ${
                  project.featured ? "shadow-glow" : ""
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      {project.featured && (
                        <Badge className="bg-accent text-accent-foreground">Featured</Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="border-primary/30 text-primary font-mono text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      size="icon"
                      variant="outline"
                      className="border-primary/30 hover:bg-primary/10"
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-5 w-5" />
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
