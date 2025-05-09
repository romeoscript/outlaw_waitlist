// components/TasksTab/LoadingScreen.tsx
import React from "react";
import { motion } from "framer-motion";

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 sm:py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-yellow-400"
      >
        Loading your $HODI data...
      </motion.div>
      <motion.div
        animate={{
          rotate: 360,
          borderRadius: ["20%", "50%", "20%"]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
        className="h-20 w-20 sm:h-32 sm:w-32 border-b-4 border-t-4 border-yellow-400"
      />
    </div>
  );
};

export default LoadingScreen;