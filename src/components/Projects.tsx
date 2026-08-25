import { motion } from 'motion/react';
import { Play, ArrowUpRight, Code2, Terminal } from 'lucide-react';
import { portfolioData } from '../data';
import { Project } from '../types';

export function Projects() {
  return (
    <section id="projects" className="py-28 px-6 relative bg-[#030305] matrix-grid">
      {/* Background Neon Spot Glows */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center flex flex-col items-center"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 font-heading tracking-tight">
            <span>Selected</span> <span className="text-rainbow font-piper font-normal">Works</span>
          </h2>

          <p className="text-zinc-300 text-base md:text-lg max-w-2xl leading-relaxed">
            A showcase of my AI, machine learning, computer vision, and LLM-integrated applications built with modern frameworks.
          </p>
        </motion.div>

        <div className="space-y-24">
          {portfolioData.projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project, index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            staggerChildren: 0.2
          }
        }
      }}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-14 items-center`}
    >
      {/* Glossy Media Container */}
      <motion.div
        variants={{
          hidden: { 
            opacity: 0, 
            x: isEven ? 50 : -50
          },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.4, ease: "easeOut" }
          }
        }}
        className="w-full lg:w-3/5 group relative overflow-hidden rounded-3xl glossy-card border border-white/10 aspect-video flex items-center justify-center shadow-2xl"
      >
        {project.video ? (
          <>
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              preload="auto"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            >
              <source src={project.video} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out" />

            <motion.div
              animate={{
                rotate: [0, 180, 360],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute w-[160%] h-[160%] opacity-25 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/40 via-cyan-500/20 to-transparent blur-3xl"
            />

            <div className="relative z-10 flex flex-col items-center justify-center gap-4 text-zinc-400 group-hover:text-white transition-colors duration-500">
              <div className="w-20 h-20 rounded-2xl glossy-card flex items-center justify-center border border-amber-500/40 group-hover:border-amber-300 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all duration-500 shadow-[0_0_30px_rgba(229,193,88,0.35)]">
                <Play className="w-8 h-8 ml-1 text-amber-300" fill="currentColor" />
              </div>
              <span className="text-xs tracking-widest uppercase text-mid-gold">
                Interactive Preview
              </span>
            </div>
          </>
        )}
      </motion.div>

      {/* Content Container */}
      <motion.div
        variants={{
          hidden: { opacity: 0, x: isEven ? 40 : -40 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          }
        }}
        className="w-full lg:w-2/5 flex flex-col items-start"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 glossy-card rounded-xl border border-amber-500/30">
            <Code2 className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-xs text-mid-gold">{project.period}</span>
        </div>

        <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-4 font-heading group-hover:text-rainbow transition-colors leading-tight">
          {project.title}
        </h3>

        <p className="text-zinc-300 leading-relaxed mb-6 text-sm md:text-base">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag: string) => (
            <span
              key={tag}
              className="px-3.5 py-1.5 glossy-card border border-amber-500/30 rounded-full text-xs text-mid-gold hover:border-amber-300 hover:bg-amber-500/10 transition-all"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href="#"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full glossy-card border border-amber-500/40 text-mid-gold text-xs hover:bg-amber-500/20 hover:border-amber-300 transition-all group shadow-[0_0_15px_rgba(229,193,88,0.2)]"
        >
          <span>VIEW PROJECT DETAILS</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-amber-400" />
        </a>
      </motion.div>
    </motion.div>
  );
}
