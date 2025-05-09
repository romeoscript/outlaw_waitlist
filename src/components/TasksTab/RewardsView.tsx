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

    if (userData.total_points < 5000) {
      return 0;
    } else if (userData.total_points < 20000) {
      return 1;
    } else if (userData.total_points < 50000) {
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
          <Gift className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 mr-2" />
          <h3 className="text-base sm:text-lg font-bold text-white">$HODI Rewards Program</h3>
        </motion.div>
        <motion.p variants={itemVariants} className="text-white/70 mb-4 sm:mb-6 text-xs sm:text-sm">
          Complete tasks and level up to unlock exclusive rewards for the $HODI project.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {/* Level 1 - Street Cat */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(234, 179, 8, 0.3)" }}
            className={`p-3 sm:p-4 rounded-xl border ${getCurrentLevel() >= 1 ? 'bg-gradient-to-b from-yellow-400/20 to-transparent border-yellow-400' : 'bg-gray-800 border-gray-700'
              }`}
          >
            <div className="flex justify-between items-center mb-2 sm:mb-3">
              <h4 className="font-bold text-sm sm:text-lg">Street Cat</h4>
              <div className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-black text-white/70">Level 1</div>
            </div>
            <div className="text-white/70 text-[10px] sm:text-xs mb-2 sm:mb-3">Unlocks at 5,000 points</div>
            <ul className="space-y-1 sm:space-y-2 text-[11px] sm:text-sm">
              <li className="flex items-center">
                <div className={`w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 rounded-full ${getCurrentLevel() >= 1 ? 'bg-yellow-400' : 'bg-gray-700'}`}></div>
                <span className={getCurrentLevel() >= 1 ? 'text-white' : 'text-white/50'}>Access to Cat Cartel Events</span>
              </li>
            </ul>
            {getCurrentLevel() >= 1 ? (
              <div className="mt-3 sm:mt-4 text-yellow-400 text-[10px] sm:text-sm font-bold flex items-center">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> UNLOCKED
              </div>
            ) : (
              <div className="mt-3 sm:mt-4 text-white/50 text-[10px] sm:text-sm flex items-center">
                <Lock size={12} className="mr-1 sm:text-base" /> Locked
              </div>
            )}
          </motion.div>

          {/* Level 2 - Capo */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(234, 179, 8, 0.3)" }}
            className={`p-3 sm:p-4 rounded-xl border ${getCurrentLevel() >= 2 ? 'bg-gradient-to-b from-yellow-400/20 to-transparent border-yellow-400' : 'bg-gray-800 border-gray-700'
              }`}
          >
            <div className="flex justify-between items-center mb-2 sm:mb-3">
              <h4 className="font-bold text-sm sm:text-lg">Capo</h4>
              <div className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-black text-white/70">Level 2</div>
            </div>
            <div className="text-white/70 text-[10px] sm:text-xs mb-2 sm:mb-3">Unlocks at 20,000 points</div>
            <ul className="space-y-1 sm:space-y-2 text-[11px] sm:text-sm">
              <li className="flex items-center">
                <div className={`w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 rounded-full ${getCurrentLevel() >= 2 ? 'bg-yellow-400' : 'bg-gray-700'}`}></div>
                <span className={getCurrentLevel() >= 2 ? 'text-white' : 'text-white/50'}>All Street Cat Benefits</span>
              </li>
              <li className="flex items-center">
                <div className={`w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 rounded-full ${getCurrentLevel() >= 2 ? 'bg-yellow-400' : 'bg-gray-700'}`}></div>
                <span className={getCurrentLevel() >= 2 ? 'text-white' : 'text-white/50'}>Exclusive Discord Role</span>
              </li>
              <li className="flex items-center">
                <div className={`w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 rounded-full ${getCurrentLevel() >= 2 ? 'bg-yellow-400' : 'bg-gray-700'}`}></div>
                <span className={getCurrentLevel() >= 2 ? 'text-white' : 'text-white/50'}>Special Cat Traits</span>
              </li>
            </ul>
            {getCurrentLevel() >= 2 ? (
              <div className="mt-3 sm:mt-4 text-yellow-400 text-[10px] sm:text-sm font-bold flex items-center">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> UNLOCKED
              </div>
            ) : (
              <div className="mt-3 sm:mt-4 text-white/50 text-[10px] sm:text-sm flex items-center">
                <Lock size={12} className="mr-1 sm:text-base" /> Locked
              </div>
            )}
          </motion.div>

          {/* Level 3 - Big Boss */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(234, 179, 8, 0.3)" }}
            className={`p-3 sm:p-4 rounded-xl border ${getCurrentLevel() >= 3 ? 'bg-gradient-to-b from-yellow-400/20 to-transparent border-yellow-400' : 'bg-gray-800 border-gray-700'
              }`}
          >
            <div className="flex justify-between items-center mb-2 sm:mb-3">
              <h4 className="font-bold text-sm sm:text-lg">Big Boss</h4>
              <div className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-black text-white/70">Level 3</div>
            </div>
            <div className="text-white/70 text-[10px] sm:text-xs mb-2 sm:mb-3">Unlocks at 50,000 points</div>
            <ul className="space-y-1 sm:space-y-2 text-[11px] sm:text-sm">
              <li className="flex items-center">
                <div className={`w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 rounded-full ${getCurrentLevel() >= 3 ? 'bg-yellow-400' : 'bg-gray-700'}`}></div>
                <span className={getCurrentLevel() >= 3 ? 'text-white' : 'text-white/50'}>All Capo Benefits</span>
              </li>
              <li className="flex items-center">
                <div className={`w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 rounded-full ${getCurrentLevel() >= 3 ? 'bg-yellow-400' : 'bg-gray-700'}`}></div>
                <span className={getCurrentLevel() >= 3 ? 'text-white' : 'text-white/50'}>OG Cat Status</span>
              </li>
              <li className="flex items-center">
                <div className={`w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 rounded-full ${getCurrentLevel() >= 3 ? 'bg-yellow-400' : 'bg-gray-700'}`}></div>
                <span className={getCurrentLevel() >= 3 ? 'text-white' : 'text-white/50'}>$HODI Token Airdrop</span>
              </li>
            </ul>
            {getCurrentLevel() >= 3 ? (
              <div className="mt-3 sm:mt-4 text-yellow-400 text-[10px] sm:text-sm font-bold flex items-center">
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

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-gray-900 p-3 sm:p-5 rounded-xl border border-yellow-400/30"
      >
        <motion.div variants={itemVariants} className="flex justify-between items-center mb-3 sm:mb-4">
          <div className="flex items-center">
            <Award className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 mr-2" />
            <h3 className="text-base sm:text-lg font-bold text-white">NFT Benefits</h3>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsRewardDetailOpen(!isRewardDetailOpen)}
            className="text-yellow-400 flex items-center text-xs sm:text-sm bg-black px-2 py-1 sm:px-3 sm:py-1 rounded-full"
          >
            {isRewardDetailOpen ? "Less" : "Details"}
            {isRewardDetailOpen ? <ChevronUp size={14} className="ml-1 sm:h-4 sm:w-4" /> : <ChevronDown size={14} className="ml-1 sm:h-4 sm:w-4" />}
          </motion.button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-3 sm:mb-4"
        >
          <div className="text-center p-2 sm:p-3 bg-black rounded-lg border border-yellow-400/20">
            <div className="inline-block p-2 rounded-full bg-yellow-400/20 mb-1 sm:mb-2">
              <Trophy size={18} className="text-yellow-400 sm:h-6 sm:w-6" />
            </div>
            <div className="text-xs sm:text-sm font-medium">VIP Access</div>
          </div>
          <div className="text-center p-2 sm:p-3 bg-black rounded-lg border border-yellow-400/20">
            <div className="inline-block p-2 rounded-full bg-yellow-400/20 mb-1 sm:mb-2">
              <DollarSign size={18} className="text-yellow-400 sm:h-6 sm:w-6" />
            </div>
            <div className="text-xs sm:text-sm font-medium">NFT Rewards</div>
          </div>
          <div className="text-center p-2 sm:p-3 bg-black rounded-lg border border-yellow-400/20">
            <div className="inline-block p-2 rounded-full bg-yellow-400/20 mb-1 sm:mb-2">
              <Zap size={18} className="text-yellow-400 sm:h-6 sm:w-6" />
            </div>
            <div className="text-xs sm:text-sm font-medium">NFT Airdrops</div>
          </div>
          <div className="text-center p-2 sm:p-3 bg-black rounded-lg border border-yellow-400/20">
            <div className="inline-block p-2 rounded-full bg-yellow-400/20 mb-1 sm:mb-2">
              <Lock size={18} className="text-yellow-400 sm:h-6 sm:w-6" />
            </div>
            <div className="text-xs sm:text-sm font-medium">Governance</div>
          </div>
        </motion.div>

        <AnimatePresence>
          {isRewardDetailOpen && (
            <motion.div
              variants={itemVariants}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-white/70 text-xs sm:text-sm bg-black p-3 sm:p-4 rounded-lg border border-yellow-400/20"
            >
              <p className="mb-2 sm:mb-3">
                NFT holders will receive exclusive benefits in the ecosystem:
              </p>
              <ul className="space-y-1 sm:space-y-2 ml-3 sm:ml-4 list-disc">
                <li>Priority access to future NFT launches</li>
                <li>Revenue share from marketing activities</li>
                <li>Access to private Discord channels and events</li>
                <li>Staking rewards with passive income opportunities</li>
                <li>NFT airdrops based on your level and referral activity</li>
                <li>Voting rights on future project developments</li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default RewardsView;
