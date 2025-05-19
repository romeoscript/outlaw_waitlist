import React, { useState } from "react";
import { motion } from "framer-motion";
import { Award, ChevronDown, ChevronUp, Gift, Trophy, Lock, Star, DollarSign, Zap } from "lucide-react";
import { UserData, containerVariants, itemVariants } from "./types";
import { AnimatePresence } from "framer-motion";

interface RewardsViewProps {
  userData: UserData | null;
}

const RewardsView: React.FC<RewardsViewProps> = ({ userData }) => {
  const [isRewardDetailOpen, setIsRewardDetailOpen] = useState(false);
  
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

  return (
    <div className="p-3 sm:p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-5 sm:mb-8 bg-gray-900 p-4 sm:p-5 rounded-xl border border-yellow-400/30"
      >
        <motion.div variants={itemVariants} className="flex items-center mb-3 sm:mb-4">
          <Gift className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500 mr-2" />
          <h3 className="text-base sm:text-lg font-bold text-white">Ranks & Badges</h3>
        </motion.div>
        <motion.p variants={itemVariants} className="text-white/70 mb-4 sm:mb-6 text-xs sm:text-sm">
          Complete missions and rise through the ranks to unlock exclusive Outlaw loot and badges.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {/* Level 1 - Gunslinger */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(245, 158, 11, 0.3)" }}
            className={`p-3 sm:p-4 rounded-xl border ${getCurrentLevel() >= 1 ? 'bg-gradient-to-b from-amber-400/20 to-transparent border-amber-500' : 'bg-black/80 border-amber-500/10'}`}
          >
            <div className="flex justify-between items-center mb-2 sm:mb-3">
              <h4 className="font-bold text-sm sm:text-lg">Gunslinger</h4>
              <div className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-black text-white/70">Rank 1</div>
            </div>
            <div className="text-white/70 text-[10px] sm:text-xs mb-2 sm:mb-3">Unlocks at 4,000 points</div>
            <ul className="space-y-1 sm:space-y-2 text-[11px] sm:text-sm">
              <li className="flex items-center">
                <div className={`w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 rounded-full ${getCurrentLevel() >= 1 ? 'bg-amber-500' : 'bg-black/40'}`}></div>
                <span className={getCurrentLevel() >= 1 ? 'text-white' : 'text-white/50'}>Outlaw Discord Role</span>
              </li>
              <li className="flex items-center">
                <div className={`w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 rounded-full ${getCurrentLevel() >= 1 ? 'bg-amber-500' : 'bg-black/40'}`}></div>
                <span className={getCurrentLevel() >= 1 ? 'text-white' : 'text-white/50'}>Bonus mini-game loot</span>
              </li>
              <li className="flex items-center">
                <div className={`w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 rounded-full ${getCurrentLevel() >= 1 ? 'bg-amber-500' : 'bg-black/40'}`}></div>
                <span className={getCurrentLevel() >= 1 ? 'text-white' : 'text-white/50'}>10% discount on all purchases</span>
              </li>
            </ul>
            {getCurrentLevel() >= 1 ? (
              <div className="mt-3 sm:mt-4 text-amber-500 text-[10px] sm:text-sm font-bold flex items-center">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> UNLOCKED
              </div>
            ) : (
              <div className="mt-3 sm:mt-4 text-white/50 text-[10px] sm:text-sm flex items-center">
                <Lock size={12} className="mr-1 sm:text-base" /> Locked
              </div>
            )}
          </motion.div>

          {/* Level 2 - Desperado */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(245, 158, 11, 0.3)" }}
            className={`p-3 sm:p-4 rounded-xl border ${getCurrentLevel() >= 2 ? 'bg-gradient-to-b from-amber-400/20 to-transparent border-amber-500' : 'bg-black/80 border-amber-500/10'}`}
          >
            <div className="flex justify-between items-center mb-2 sm:mb-3">
              <h4 className="font-bold text-sm sm:text-lg">Desperado</h4>
              <div className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-black text-white/70">Rank 2</div>
            </div>
            <div className="text-white/70 text-[10px] sm:text-xs mb-2 sm:mb-3">Unlocks at 10,000 points</div>
            <ul className="space-y-1 sm:space-y-2 text-[11px] sm:text-sm">
              <li className="flex items-center">
                <div className={`w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 rounded-full ${getCurrentLevel() >= 2 ? 'bg-amber-500' : 'bg-black/40'}`}></div>
                <span className={getCurrentLevel() >= 2 ? 'text-white' : 'text-white/50'}>All Gunslinger Benefits</span>
              </li>
              <li className="flex items-center">
                <div className={`w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 rounded-full ${getCurrentLevel() >= 2 ? 'bg-amber-500' : 'bg-black/40'}`}></div>
                <span className={getCurrentLevel() >= 2 ? 'text-white' : 'text-white/50'}>Priority private sale access</span>
              </li>
              <li className="flex items-center">
                <div className={`w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 rounded-full ${getCurrentLevel() >= 2 ? 'bg-amber-500' : 'bg-black/40'}`}></div>
                <span className={getCurrentLevel() >= 2 ? 'text-white' : 'text-white/50'}>Special Loot Drops</span>
              </li>
              <li className="flex items-center">
                <div className={`w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 rounded-full ${getCurrentLevel() >= 2 ? 'bg-amber-500' : 'bg-black/40'}`}></div>
                <span className={getCurrentLevel() >= 2 ? 'text-white' : 'text-white/50'}>20% discount on all purchases</span>
              </li>
            </ul>
            {getCurrentLevel() >= 2 ? (
              <div className="mt-3 sm:mt-4 text-amber-500 text-[10px] sm:text-sm font-bold flex items-center">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> UNLOCKED
              </div>
            ) : (
              <div className="mt-3 sm:mt-4 text-white/50 text-[10px] sm:text-sm flex items-center">
                <Lock size={12} className="mr-1 sm:text-base" /> Locked
              </div>
            )}
          </motion.div>

          {/* Level 3 - Outlaw */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(245, 158, 11, 0.3)" }}
            className={`p-3 sm:p-4 rounded-xl border ${getCurrentLevel() >= 3 ? 'bg-gradient-to-b from-amber-400/20 to-transparent border-amber-500' : 'bg-black/80 border-amber-500/10'}`}
          >
            <div className="flex justify-between items-center mb-2 sm:mb-3">
              <h4 className="font-bold text-sm sm:text-lg">Outlaw</h4>
              <div className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-black text-white/70">Rank 3</div>
            </div>
            <div className="text-white/70 text-[10px] sm:text-xs mb-2 sm:mb-3">Unlocks at 25,000 points</div>
            <ul className="space-y-1 sm:space-y-2 text-[11px] sm:text-sm">
              <li className="flex items-center">
                <div className={`w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 rounded-full ${getCurrentLevel() >= 3 ? 'bg-amber-500' : 'bg-black/40'}`}></div>
                <span className={getCurrentLevel() >= 3 ? 'text-white' : 'text-white/50'}>All Desperado Benefits</span>
              </li>
              <li className="flex items-center">
                <div className={`w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 rounded-full ${getCurrentLevel() >= 3 ? 'bg-amber-500' : 'bg-black/40'}`}></div>
                <span className={getCurrentLevel() >= 3 ? 'text-white' : 'text-white/50'}>OG Outlaw Status</span>
              </li>
              <li className="flex items-center">
                <div className={`w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 rounded-full ${getCurrentLevel() >= 3 ? 'bg-amber-500' : 'bg-black/40'}`}></div>
                <span className={getCurrentLevel() >= 3 ? 'text-white' : 'text-white/50'}>Legendary Loot Airdrop</span>
              </li>
              <li className="flex items-center">
                <div className={`w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 rounded-full ${getCurrentLevel() >= 3 ? 'bg-amber-500' : 'bg-black/40'}`}></div>
                <span className={getCurrentLevel() >= 3 ? 'text-white' : 'text-white/50'}>30% discount on all purchases</span>
              </li>
            </ul>
            {getCurrentLevel() >= 3 ? (
              <div className="mt-3 sm:mt-4 text-amber-500 text-[10px] sm:text-sm font-bold flex items-center">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> UNLOCKED
              </div>
            ) : (
              <div className="mt-3 sm:mt-4 text-white/50 text-[10px] sm:text-sm flex items-center">
                <Lock size={12} className="mr-1 sm:text-base" /> Locked
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>

     
    </div>
  );
};

export default RewardsView;
