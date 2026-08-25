import { motion, AnimatePresence } from 'motion/react';
import { Github, Linkedin, Mail, MapPin, Terminal, SkipForward } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { portfolioData } from '../data';
import { MatrixText } from './MatrixText';

export function Hero() {
  const [showContent, setShowContent] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => {
        console.warn("Autoplay prevented or failed:", err);
      });
    }

    const timer = setTimeout(() => {
      setShowContent(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleVideoEnded = () => {
    setShowContent(true);
    if (videoRef.current) {
      videoRef.current.loop = true;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleSkipIntro = () => {
    setShowContent(true);
    if (videoRef.current) {
      videoRef.current.loop = true;
    }
  };

  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-6 overflow-hidden bg-black matrix-grid">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-500/10 via-cyan-500/10 to-purple-600/15 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Background Video & Overlays */}
      <div className="absolute inset-0 z-0">
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          playsInline 
          preload="auto"
          onEnded={handleVideoEnded}
          className="w-full h-full object-cover object-center opacity-85 transition-all duration-1000"
        >
          <source src="/Timeline 1.mp4" type="video/mp4" />
          <source src="/background.mp4" type="video/mp4" />
        </video>

        <div 
          className={`absolute inset-0 transition-all duration-1000 ${
            showContent 
              ? 'bg-gradient-to-b from-black/80 via-black/85 to-[#030305] backdrop-blur-[3px]' 
              : 'bg-gradient-to-t from-black via-black/30 to-black/50'
          }`} 
        />
      </div>

      {/* Floating Intro Indicator */}
      <AnimatePresence>
        {!showContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-12 z-20 flex items-center gap-4 glossy-card px-6 py-3 rounded-full border border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.3)]"
          >
            <div className="flex items-center gap-2.5 text-xs font-mono text-cyan-400">
              <Terminal className="w-4 h-4 animate-pulse text-cyan-400" />
              <span className="tracking-widest">INITIALIZING MATRIX REVEAL...</span>
            </div>
            <div className="w-px h-4 bg-zinc-700/60" />
            <button
              onClick={handleSkipIntro}
              className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-cyan-300 font-semibold transition-colors cursor-pointer"
            >
              SKIP INTRO <SkipForward className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Hero Content */}
      <div className="max-w-4xl mx-auto relative z-10 w-full flex flex-col items-center">
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center gap-6 w-full"
            >
              {/* Main Title */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight font-heading">
                <span className="align-baseline">Hi, I'm </span>
                <span className="font-digital-fingerprint text-matrix-green-gradient font-normal text-5xl sm:text-7xl md:text-8xl lg:text-[5.5rem] align-baseline">
                  <MatrixText text={portfolioData.name} delay={400} speed={30} />
                </span>
                <br />
                <span className="font-audio-nugget text-audio-outlined text-3xl sm:text-5xl md:text-6xl font-bold mt-2 block">
                  <MatrixText text={portfolioData.role} delay={900} speed={35} />
                </span>
              </h1>
              
              {/* Summary */}
              <p className="text-base sm:text-lg md:text-xl text-zinc-300 leading-relaxed max-w-2xl font-normal drop-shadow-md">
                {portfolioData.summary}
              </p>

              {/* Contact Meta Info */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm mt-2 font-mono">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl glossy-card border border-white/10 text-cyan-300 shadow-md">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>{portfolioData.location}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl glossy-card border border-white/10 text-cyan-300 shadow-md">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>{portfolioData.email}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4 mt-4">
                <a 
                  href={portfolioData.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2.5 px-6 py-3 glossy-card glossy-card-hover rounded-full text-zinc-200 hover:text-cyan-300 border border-white/10 hover:border-cyan-400/50 shadow-lg text-xs font-mono font-semibold transition-all"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4 text-cyan-400" />
                  <span>LINKEDIN</span>
                </a>
                <a 
                  href={portfolioData.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2.5 px-6 py-3 glossy-card glossy-card-hover rounded-full text-zinc-200 hover:text-emerald-300 border border-white/10 hover:border-emerald-400/50 shadow-lg text-xs font-mono font-semibold transition-all"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4 text-emerald-400" />
                  <span>GITHUB</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
