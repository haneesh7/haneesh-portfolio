import { motion } from 'motion/react';
import { Cpu } from 'lucide-react';
import { portfolioData } from '../data';

export function Skills() {
  return (
    <section id="skills" className="py-28 px-6 bg-[#030305] relative matrix-grid">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center flex flex-col items-center"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 font-heading tracking-tight">
            <span>Technical</span> <span className="text-rainbow font-piper font-normal">Arsenal</span>
          </h2>

          <p className="text-zinc-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            A comprehensive overview of my AI/ML stack, programming languages, and engineering frameworks.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.skills.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ 
                opacity: 0, 
                x: i % 2 === 0 ? 40 : -40
              }}
              whileInView={{ 
                opacity: 1, 
                x: 0
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
              className="p-8 glossy-card border border-white/10 rounded-3xl glossy-card-hover"
            >
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3 font-heading">
                <div className="w-8 h-1 rounded-full bg-gradient-to-r from-amber-300 via-amber-500 to-yellow-600 shadow-[0_0_10px_rgba(229,193,88,0.6)]" />
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map(skill => (
                  <span
                    key={skill}
                    className="px-3.5 py-1.5 glossy-card border border-amber-500/30 text-xs text-mid-gold rounded-xl hover:border-amber-300 hover:bg-amber-500/10 transition-all cursor-default shadow-[0_0_12px_rgba(229,193,88,0.15)] font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
