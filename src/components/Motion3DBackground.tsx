import { motion, useScroll, useTransform } from 'motion/react';
import { Cpu, Terminal, Sparkles, Layers, Box, Database, Network } from 'lucide-react';

export function Motion3DBackground() {
  const { scrollYProgress } = useScroll();

  // 3D Parallax & Rotation Transforms driven by scroll position
  const rotateLeft = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotateRight = useTransform(scrollYProgress, [0, 1], [0, -360]);

  const translateY1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const translateY2 = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const translateY3 = useTransform(scrollYProgress, [0, 1], [0, -800]);

  const scalePulse = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.25, 0.9]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden perspective-1000">

      {/* Left Side Floating 3D Cyber Cube */}
      <motion.div
        style={{
          y: translateY1,
          rotateY: rotateLeft,
          rotateX: rotateRight,
          scale: scalePulse,
        }}
        className="absolute top-[25%] -left-12 w-44 h-44 rounded-3xl bg-gradient-to-tr from-cyan-500/20 via-emerald-500/10 to-transparent border border-cyan-400/30 backdrop-blur-2xl shadow-[0_0_50px_rgba(6,182,212,0.3)] flex items-center justify-center transform -rotate-12 hover:scale-110 transition-transform"
      >
        <div className="w-24 h-24 rounded-2xl border border-cyan-400/40 bg-black/40 flex items-center justify-center shadow-inner">
          <Cpu className="w-12 h-12 text-cyan-400 animate-pulse" />
        </div>
      </motion.div>

      {/* Right Side Floating 3D Holographic Matrix Sphere */}
      <motion.div
        style={{
          y: translateY2,
          rotateY: rotateRight,
          rotateZ: rotateLeft,
        }}
        className="absolute top-[45%] -right-16 w-52 h-52 rounded-full bg-gradient-to-br from-emerald-500/25 via-teal-500/10 to-purple-600/20 border border-emerald-400/40 backdrop-blur-2xl shadow-[0_0_60px_rgba(16,185,129,0.35)] flex items-center justify-center"
      >
        <div className="w-28 h-28 rounded-full border border-emerald-400/50 bg-black/50 flex items-center justify-center">
          <Network className="w-14 h-14 text-emerald-400 animate-spin" style={{ animationDuration: '20s' }} />
        </div>
      </motion.div>

      {/* Mid Left Side 3D Floating Data Chip */}
      <motion.div
        style={{
          y: translateY3,
          rotateX: rotateLeft,
        }}
        className="absolute top-[70%] -left-8 w-40 h-40 rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/10 to-transparent border border-purple-400/30 backdrop-blur-xl shadow-[0_0_40px_rgba(168,85,247,0.3)] flex items-center justify-center rotate-45"
      >
        <Database className="w-10 h-10 text-purple-400 -rotate-45" />
      </motion.div>

      {/* Right Bottom Floating 3D Sparkle Orb */}
      <motion.div
        style={{
          y: translateY1,
          rotateZ: rotateRight,
        }}
        className="absolute top-[85%] -right-10 w-36 h-36 rounded-3xl bg-gradient-to-tl from-amber-500/20 via-cyan-500/15 to-transparent border border-amber-400/30 backdrop-blur-xl shadow-[0_0_45px_rgba(245,158,11,0.25)] flex items-center justify-center rotate-12"
      >
        <Box className="w-10 h-10 text-amber-300" />
      </motion.div>

    </div>
  );
}
