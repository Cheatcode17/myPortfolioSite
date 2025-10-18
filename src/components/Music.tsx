import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Music as MusicIcon, Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Music = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const tracks = [
    {
      title: "Time",
      description: "A song reflecting on the passage of time and life's fleeting moments",
      platform: "SoundCloud",
      link: "https://soundcloud.com/user-830031623/time-1?si=58bd3ada2587446799143aad4584bb16&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    },
    {
      title: "Live For The Music",
      description: "Living life one beat at a time, embracing every moment",
      platform: "Spotify",
      link: "https://open.spotify.com/track/3DIQszDh1aj0oPgErmClsW?si=0037e4b3a77d40f3",
    },
    {
      title: "Pray",
      description: "A song about faith, hope, and resilience in tough times",
      platform: "SoundCloud",
      link: "https://soundcloud.com/user-830031623/pray?si=2c8598ec1d5e41858e89a9243870c3d9&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    },
  ];

  return (
    <section id="music" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <MusicIcon className="h-12 w-12 text-secondary animate-float" />
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              My <span className="text-secondary">Music</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Where code meets rhythm—raw, emotional rap that tells my story through sound
            </p>
          </div>

          <div className="space-y-6 mb-12">
            {tracks.map((track, index) => (
              <motion.div
                key={track.title}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border rounded-lg p-6 hover:border-secondary/50 transition-all group hover:shadow-purple"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">
                      {track.title}
                    </h3>
                    <p className="text-muted-foreground mb-3">{track.description}</p>
                    <span className="text-xs font-mono text-secondary">{track.platform}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="border-secondary/30 hover:bg-secondary/10"
                      asChild
                    >
                      <a href={track.link} target="_blank" rel="noopener noreferrer">
                        <Play className="h-5 w-5" />
                      </a>
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="border-secondary/30 hover:bg-secondary/10"
                      asChild
                    >
                      <a href={track.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-accent rounded-lg p-8 text-center"
          >
            <h3 className="text-2xl font-bold mb-3">More Coming Soon</h3>
            <p className="text-foreground/90 mb-6">
              Working on new tracks that blend technical precision with raw emotion. Stay tuned for releases.
            </p>
            <Button
  size="lg"
  variant="outline"
  className="border-foreground/30 text-foreground hover:bg-foreground/10"
  onClick={() => window.open("https://open.spotify.com/artist/5zBLRkFkEjQ47e0j1A1vkf?si=l_JrJfwySTmO6BXKeU1gaQ")}
>
  Follow on Spotify
</Button>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Music;
