import React from "react";
import { motion } from "framer-motion";
import { Trophy, Star, Award } from "lucide-react";
import { UserData, containerVariants, itemVariants } from "./types";

interface LevelProgressProps {
  userData: UserData | null;
  userPointsTotal: number;
}

const LevelProgress: React.FC<LevelProgressProps> = ({ userData, userPointsTotal }) => {
  const calculateProgress = (): number => {
    if (!userData) return 0;

    if (userData.total_points < 4000) {
      return (userData.total_points / 4000) * 100;
    } else if (userData.total_points < 10000) {
      return ((userData.total_points - 4000) / 6000) * 100;
    } else if (userData.total_points < 25000) {
      return ((userData.total_points - 10000) / 15000) * 100;
    }
    return 100;
  };

  const getCurrentLevel = (): number => {
    if (!userData) return 0;

    if (userData.total_points < 4000) {
      return 0;
    } else if (userData.total_points < 10000) {
      return 1;
    } else if (userData.total_points < 25000) {
      return 2;
    }
    return 3;
  };

  const getNextLevelTarget = (): number | null => {
    if (!userData) return 4000;

    if (userData.total_points < 4000) {
      return 4000;
    } else if (userData.total_points < 10000) {
      return 10000;
    } else if (userData.total_points < 25000) {
      return 25000;
    }
    return null;
  };

  const getPointsToNextLevel = (): number => {
    const nextLevel = getNextLevelTarget();
    if (!nextLevel || !userData) return 0;
    return nextLevel - userData.total_points;
  };

  const getLevelName = (level: number): string => {
    switch (level) {
      case 1: return "Gunslinger";
      case 2: return "Desperado";
      case 3: return "Outlaw";
      default: return "Rookie";
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mb-5 sm:mb-8 bg-black p-3 sm:p-6 rounded-lg border border-amber-500/30 relative overflow-hidden"
    >
      {/* Background pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(rgba(245, 158, 11, 0.6) 1px, transparent 0)",
          backgroundSize: "15px 15px",
          backgroundPosition: "-10px -10px",
        }}
      />
      
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 relative z-10">
        <div className="flex items-center mb-2 sm:mb-0">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 opacity-75 group-hover:opacity-100 blur group-hover:blur-md transition-all duration-300"></div>
            <div className="relative">
              <div className="bg-black rounded-full p-1.5 sm:p-2 border border-amber-500">
                <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
              </div>
            </div>
          </div>
          <div className="ml-2 sm:ml-3">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center">
              Rank: <span className="text-amber-500 ml-1">{getLevelName(getCurrentLevel())}</span>
              <span className="ml-2 text-xs text-amber-500/70">Level {getCurrentLevel()}</span>
            </h3>
            <p className="text-xs text-white/60">
              {getNextLevelTarget() ? `${getPointsToNextLevel()} tokens to next level` : "Maximum level reached!"}
            </p>
          </div>
        </div>
        <motion.div 
          className="bg-black py-1 px-2 sm:px-3 rounded-full text-white font-bold border border-amber-500 text-center text-sm sm:text-base w-full sm:w-auto mt-2 sm:mt-0"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-amber-500">{userPointsTotal}</span> <span className="text-white/80">tokens</span>
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-3 sm:mt-4 mb-2 relative z-10">
        <div className="w-full h-2 sm:h-3 bg-black/50 rounded-full overflow-hidden border border-amber-500/20">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${calculateProgress()}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-amber-600 to-amber-400"
          />
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-4 sm:mt-6 grid grid-cols-4 gap-1 sm:gap-2 text-center relative z-10"
      >
        <div
          className={`p-1 sm:p-2 rounded-lg relative overflow-hidden ${getCurrentLevel() >= 0
              ? 'bg-gradient-to-b from-amber-700/80 to-amber-900/60 text-white border border-amber-500/50'
              : 'bg-black/80 text-white/30 border border-amber-500/10'
            }`}
        >
          {getCurrentLevel() >= 0 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute top-0 right-0 sm:top-1 sm:right-1"
            >
              <div className="bg-black rounded-full p-0.5 sm:p-1 border border-amber-500/50">
                <Star className="h-2 w-2 sm:h-3 sm:w-3 text-amber-500" />
              </div>
            </motion.div>
          )}
          <div className="font-bold text-xs sm:text-sm">Rookie</div>
          <div className="text-[10px] sm:text-xs">0 pts</div>
        </div>
        
        <div
          className={`p-1 sm:p-2 rounded-lg relative overflow-hidden ${getCurrentLevel() >= 1
              ? 'bg-gradient-to-b from-amber-700/80 to-amber-900/60 text-white border border-amber-500/50'
              : 'bg-black/80 text-white/30 border border-amber-500/10'
            }`}
        >
          {getCurrentLevel() >= 1 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute top-0 right-0 sm:top-1 sm:right-1"
            >
              <div className="bg-black rounded-full p-0.5 sm:p-1 border border-amber-500/50">
                <Star className="h-2 w-2 sm:h-3 sm:w-3 text-amber-500" />
              </div>
            </motion.div>
          )}
          <div className="font-bold text-xs sm:text-sm">Gunslinger</div>
          <div className="text-[10px] sm:text-xs">4,000 pts</div>
        </div>
        
        <div
          className={`p-1 sm:p-2 rounded-lg relative overflow-hidden ${getCurrentLevel() >= 2
              ? 'bg-gradient-to-b from-amber-700/80 to-amber-900/60 text-white border border-amber-500/50'
              : 'bg-black/80 text-white/30 border border-amber-500/10'
            }`}
        >
          {getCurrentLevel() >= 2 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute top-0 right-0 sm:top-1 sm:right-1"
            >
              <div className="bg-black rounded-full p-0.5 sm:p-1 border border-amber-500/50">
                <Star className="h-2 w-2 sm:h-3 sm:w-3 text-amber-500" />
              </div>
            </motion.div>
          )}
          <div className="font-bold text-xs sm:text-sm">Desperado</div>
          <div className="text-[10px] sm:text-xs">10,000 pts</div>
        </div>
        
        <div
          className={`p-1 sm:p-2 rounded-lg relative overflow-hidden ${getCurrentLevel() >= 3
              ? 'bg-gradient-to-b from-amber-700/80 to-amber-900/60 text-white border border-amber-500/50'
              : 'bg-black/80 text-white/30 border border-amber-500/10'
            }`}
        >
          {getCurrentLevel() >= 3 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="absolute top-0 right-0 sm:top-1 sm:right-1"
            >
              <div className="bg-black rounded-full p-0.5 sm:p-1 border border-amber-500/50">
                <Star className="h-2 w-2 sm:h-3 sm:w-3 text-amber-500" />
              </div>
            </motion.div>
          )}
          <div className="font-bold text-xs sm:text-sm">Outlaw</div>
          <div className="text-[10px] sm:text-xs">25,000 pts</div>
        </div>
      </motion.div>
      
      {/* Decorative corner elements */}
      <div className="absolute bottom-0 right-0 w-14 h-14 opacity-10">
        <div className="w-full h-full border-b-2 border-r-2 border-amber-500 rounded-br-lg"></div>
      </div>
    </motion.div>
  );
};

export default LevelProgress;