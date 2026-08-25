/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Footer } from './components/Footer';
import { AIAssistantCursor } from './components/AIAssistantCursor';

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-cyan-500/30 selection:text-white font-sans overflow-x-hidden scroll-smooth relative">
      <AIAssistantCursor />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <Projects />
        <Experience />
        <Skills />
      </main>
      <Footer />
    </div>
  );
}
