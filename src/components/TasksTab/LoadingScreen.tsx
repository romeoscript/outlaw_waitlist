// components/TasksTab/LoadingScreen.tsx
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 sm:py-16 relative">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 to-gray-900/20 pointer-events-none"></div>
      
      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-amber-700/40 rounded-tl-lg"></div>
      <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-amber-700/40 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-amber-700/40 rounded-bl-lg"></div>
      <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-amber-700/40 rounded-br-lg"></div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-amber-400 relative z-10"
      >
        <div className="flex items-center justify-center mb-2">
          <Image 
            src="/images/logo.svg" 
            alt="Outlaw Token" 
            width={50} 
            height={50}
            className="mr-2"
          />
          <span className="text-white">LOADING YOUR <span className="text-amber-300">OUTLAW</span> DATA</span>
        </div>
        <div className="text-sm text-amber-300/70">Preparing your bounties...</div>
      </motion.div>

      {/* Western-themed spinner */}
      <div className="relative">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
          className="relative z-10"
        >
          <div className="h-20 w-20 sm:h-32 sm:w-32 rounded-full border-4 border-amber-700/40 border-t-4 border-t-amber-500"></div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
        >
          <Image 
            src="/images/logo.svg" 
            alt="Outlaw Token" 
            width={40} 
            height={40}
          />
        </motion.div>
      </div>
      
      {/* Flashing "Wanted" text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="mt-6 px-6 py-1 border border-amber-800/60 rounded-sm text-xs text-amber-500"
      >
        WANTED: DEAD OR ALIVE
      </motion.div>
    </div>
  );
};

export default LoadingScreen;