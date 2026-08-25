import { motion } from 'motion/react';
import { Terminal, Sparkles } from 'lucide-react';

export function Navigation() {
  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
  ];

  return (
    <motion.header 
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-40 py-5 transition-all duration-500 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between pointer-events-auto">
        
        {/* Brand Logo - Liquid Translucent Glass */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-black/25 backdrop-blur-3xl border border-white/[0.08] flex items-center justify-center text-cyan-300 group-hover:scale-105 group-hover:border-cyan-400/50 group-hover:bg-cyan-500/10 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <Terminal className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white font-heading group-hover:text-cyan-300 transition-colors drop-shadow-md">
            H.G.
          </span>
        </a>

        {/* Floating Pill Nav - Ultra Transparent Liquid Glass */}
        <nav className="hidden md:flex items-center gap-1 bg-black/25 backdrop-blur-3xl px-3 py-1.5 rounded-full border border-white/[0.08] shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="px-4 py-1.5 text-xs text-zinc-300 hover:text-cyan-300 hover:bg-white/[0.08] rounded-full transition-all duration-300 font-medium tracking-wide"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Contact Button - Liquid Glass Action Capsule */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-cyan-300 bg-black/25 hover:bg-cyan-500/15 backdrop-blur-3xl border border-cyan-500/30 hover:border-cyan-400/60 rounded-full transition-all duration-300 shadow-[0_10px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:scale-105"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="tracking-wide">CONTACT ME</span>
        </a>

      </div>
    </motion.header>
  );
}
