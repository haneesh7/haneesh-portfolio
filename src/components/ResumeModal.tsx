import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, Download } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const handleDownload = (version: string) => {
    // In a real app, this would point to the actual PDF URLs
    const fileName = version === 'v1' ? 'Haneesh_Gowda_Resume_Detailed.pdf' : 'Haneesh_Gowda_Resume_Concise.pdf';
    alert(`Downloading ${fileName}... (Placeholder for actual file download)`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 z-50 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Download Resume</h2>
              <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-zinc-400 mb-6">
              Which version of my resume would you like to download?
            </p>

            <div className="space-y-4">
              <button
                onClick={() => handleDownload('v1')}
                className="w-full group flex items-center justify-between p-4 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/50 rounded-xl transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-zinc-900 rounded-lg text-zinc-300 group-hover:text-blue-400 transition-colors">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-white font-medium">Detailed Version</h3>
                    <p className="text-sm text-zinc-400">Comprehensive view of projects & education</p>
                  </div>
                </div>
                <Download className="w-5 h-5 text-zinc-500 group-hover:text-blue-400 transition-colors" />
              </button>

              <button
                onClick={() => handleDownload('v2')}
                className="w-full group flex items-center justify-between p-4 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/50 rounded-xl transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-zinc-900 rounded-lg text-zinc-300 group-hover:text-emerald-400 transition-colors">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-white font-medium">Concise Version</h3>
                    <p className="text-sm text-zinc-400">Streamlined AI/ML engineering overview</p>
                  </div>
                </div>
                <Download className="w-5 h-5 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
