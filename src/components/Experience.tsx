import { motion } from 'motion/react';
import { Briefcase, GraduationCap } from 'lucide-react';
import { portfolioData } from '../data';

export function Experience() {
  return (
    <section id="experience" className="py-28 px-6 bg-[#060609] border-y border-white/10 relative">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">

        {/* Experience Column */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12"
          >
            <div className="p-3.5 glossy-card rounded-2xl border border-amber-500/40 shadow-[0_0_20px_rgba(229,193,88,0.3)]">
              <Briefcase className="w-6 h-6 text-amber-400" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white font-heading">
              Experience
            </h2>
          </motion.div>

          <div className="space-y-12 border-l border-amber-500/30 ml-6 pl-8 relative">
            {portfolioData.experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative glossy-card p-6 rounded-2xl border border-white/10 glossy-card-hover"
              >
                <div className="absolute -left-[45px] top-6 w-5 h-5 rounded-full bg-black border-2 border-amber-400 shadow-[0_0_12px_rgba(229,193,88,0.9)]" />

                <span className="text-xs text-mid-gold mb-2 block tracking-wider">{exp.period}</span>
                <h3 className="text-xl font-bold text-white mb-1 font-heading">{exp.role}</h3>
                <h4 className="text-sm font-semibold text-rainbow mb-4">{exp.company}</h4>
                <ul className="space-y-3">
                  {exp.description.map((item, j) => (
                    <li key={j} className="text-zinc-300 text-sm leading-relaxed flex gap-3">
                      <span className="text-mid-gold font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education Column */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12"
          >
            <div className="p-3.5 glossy-card rounded-2xl border border-amber-500/40 shadow-[0_0_20px_rgba(229,193,88,0.3)]">
              <GraduationCap className="w-6 h-6 text-amber-400" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white font-heading">
              Education
            </h2>
          </motion.div>

          <div className="space-y-12 border-l border-amber-500/30 ml-6 pl-8 relative">
            {portfolioData.education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative glossy-card p-6 rounded-2xl border border-white/10 glossy-card-hover"
              >
                <div className="absolute -left-[45px] top-6 w-5 h-5 rounded-full bg-black border-2 border-amber-400 shadow-[0_0_12px_rgba(229,193,88,0.9)]" />

                <span className="text-xs text-mid-gold mb-2 block tracking-wider">{edu.period}</span>
                <h3 className="text-xl font-bold text-white mb-1 font-heading">{edu.degree}</h3>
                <h4 className="text-sm font-semibold text-zinc-300">{edu.institution}</h4>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
