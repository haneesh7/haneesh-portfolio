import { Github, Linkedin, Mail, Terminal, Heart } from 'lucide-react';
import { portfolioData } from '../data';

export function Footer() {
  return (
    <footer id="contact" className="py-24 px-6 border-t border-white/10 bg-[#030305] relative overflow-hidden flex flex-col justify-center">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 right-1/3 w-[500px] h-[250px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Large Watermark Text HANEESH in Thernaly Italic Font with Light Gold Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0 opacity-90">
        <span className="font-thernaly text-gold-watermark text-7xl sm:text-9xl md:text-[14rem] lg:text-[18rem] font-normal tracking-widest text-center leading-none uppercase">
          HANEESH
        </span>
      </div>

      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">

        <div className="text-center md:text-left">
          <div className="flex items-center gap-2.5 justify-center md:justify-start mb-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <h2 className="text-2xl md:text-4xl font-extrabold text-white font-heading">Let's Connect</h2>
          </div>
          <p className="text-zinc-300 text-sm md:text-base">Open for AI/ML engineering roles, research, and project collaborations.</p>
        </div>

        <div className="flex items-center gap-4">
          <SocialLink href={`mailto:${portfolioData.email}`} icon={<Mail />} label="Email" />
          <SocialLink href={portfolioData.linkedin} icon={<Linkedin />} label="LinkedIn" />
          <SocialLink href={portfolioData.github} icon={<Github />} label="GitHub" />
        </div>

      </div>

      <div className="max-w-7xl mx-auto w-full mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400 relative z-10">
        <p>© {new Date().getFullYear()} {portfolioData.name}. All rights reserved.</p>
        <p className="flex items-center gap-1.5 text-cyan-300 font-semibold">
          Crafted with <Heart className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400 animate-pulse" /> & Motion.
        </p>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center justify-center w-12 h-12 glossy-card glossy-card-hover border border-white/10 hover:border-cyan-400/50 rounded-full text-zinc-300 hover:text-cyan-300 shadow-lg"
      aria-label={label}
    >
      {icon}
    </a>
  );
}
