import React from "react";
import { motion } from "framer-motion";
import { Trophy, Star } from "lucide-react";
import { UserData, containerVariants, itemVariants } from "./types";

interface LevelProgressProps {
  userData: UserData | null;
  userPointsTotal: number;
}

const LevelProgress: React.FC<LevelProgressProps> = ({ userData, userPointsTotal }) => {
  const calculateProgress = (): number => {
    if (!userData) return 0;

    if (userData.total_points < 5000) {
      return (userData.total_points / 5000) * 100;
    } else if (userData.total_points < 20000) {
      return ((userData.total_points - 5000) / 15000) * 100;
    } else if (userData.total_points < 50000) {
      return ((userData.total_points - 20000) / 30000) * 100;
    }
    return 100;
  };

  const getCurrentLevel = (): number => {
    if (!userData) return 0;

    if (userData.total_points < 5000) {
      return 0;
    } else if (userData.total_points < 20000) {
      return 1;
    } else if (userData.total_points < 50000) {
      return 2;
    }
    return 3;
  };

  const getNextLevelTarget = (): number | null => {
    if (!userData) return 5000;

    if (userData.total_points < 5000) {
      return 5000;
    } else if (userData.total_points < 20000) {
      return 20000;
    } else if (userData.total_points < 50000) {
      return 50000;
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
      case 1: return "Street Cat";
      case 2: return "Capo";
      case 3: return "Big Boss";
      default: return "Rookie";
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mb-5 sm:mb-8 bg-gray-900 p-3 sm:p-6 rounded-xl border border-yellow-400/30"
    >
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4">
        <div className="flex items-center mb-2 sm:mb-0">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-yellow-400/30 animate-ping opacity-30"></div>
            <div className="relative bg-yellow-400/20 rounded-full p-1 sm:p-2">
              <Trophy className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-400" />
            </div>
          </div>
          <div className="ml-2 sm:ml-3">
            <h3 className="text-base sm:text-lg font-bold text-white">
              Level {getCurrentLevel()}: <span className="text-yellow-400">{getLevelName(getCurrentLevel())}</span>
            </h3>
            <p className="text-xs text-white/60">
              {getNextLevelTarget() ? `${getPointsToNextLevel()} points to next level` : "Maximum level reached!"}
            </p>
          </div>
        </div>
        <div className="bg-black py-1 px-2 sm:px-3 rounded-full text-white font-bold border border-yellow-400/30 text-center text-sm sm:text-base w-full sm:w-auto mt-2 sm:mt-0">
          {userPointsTotal} <span className="text-yellow-400">points</span>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-3 sm:mt-4 mb-2">
        <div className="w-full h-2 sm:h-3 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${calculateProgress()}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-yellow-500 to-yellow-300"
          />
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-4 sm:mt-6 grid grid-cols-3 gap-1 sm:gap-2 text-center"
      >
        <div
          className={`p-1 sm:p-2 rounded-lg relative overflow-hidden ${getCurrentLevel() >= 1
              ? 'bg-gradient-to-br from-yellow-500 to-yellow-300 text-black'
              : 'bg-gray-800 text-white/50 border border-yellow-400/20'
            }`}
        >
          {getCurrentLevel() >= 1 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute top-0 right-0 sm:top-1 sm:right-1"
            >
              <div className="bg-black rounded-full p-0.5 sm:p-1">
                <Star className="h-2 w-2 sm:h-3 sm:w-3 text-yellow-400" />
              </div>
            </motion.div>
          )}
          <div className="font-bold text-xs sm:text-sm">Street Cat</div>
          <div className="text-[10px] sm:text-xs">5,000 pts</div>
        </div>
        <div
          className={`p-1 sm:p-2 rounded-lg relative overflow-hidden ${getCurrentLevel() >= 2
              ? 'bg-gradient-to-br from-yellow-500 to-yellow-300 text-black'
              : 'bg-gray-800 text-white/50 border border-yellow-400/20'
            }`}
        >
          {getCurrentLevel() >= 2 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute top-0 right-0 sm:top-1 sm:right-1"
            >
              <div className="bg-black rounded-full p-0.5 sm:p-1">
                <Star className="h-2 w-2 sm:h-3 sm:w-3 text-yellow-400" />
              </div>
            </motion.div>
          )}
          <div className="font-bold text-xs sm:text-sm">Capo</div>
          <div className="text-[10px] sm:text-xs">20,000 pts</div>
        </div>
        <div
          className={`p-1 sm:p-2 rounded-lg relative overflow-hidden ${getCurrentLevel() >= 3
              ? 'bg-gradient-to-br from-yellow-500 to-yellow-300 text-black'
              : 'bg-gray-800 text-white/50 border border-yellow-400/20'
            }`}
        >
          {getCurrentLevel() >= 3 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="absolute top-0 right-0 sm:top-1 sm:right-1"
            >
              <div className="bg-black rounded-full p-0.5 sm:p-1">
                <Star className="h-2 w-2 sm:h-3 sm:w-3 text-yellow-400" />
              </div>
            </motion.div>
          )}
          <div className="font-bold text-xs sm:text-sm">Big Boss</div>
          <div className="text-[10px] sm:text-xs">50,000 pts</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LevelProgress;