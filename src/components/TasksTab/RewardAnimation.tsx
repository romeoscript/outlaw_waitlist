import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

interface RewardAnimationProps {
  showReward: boolean;
  rewardMessage: string;
}

const RewardAnimation: React.FC<RewardAnimationProps> = ({ showReward, rewardMessage }) => {
  if (!showReward) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed top-16 sm:top-24 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="bg-yellow-400 text-black px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-lg flex items-center">
        <Trophy className="mr-2 animate-pulse h-4 w-4 sm:h-5 sm:w-5" />
        <span className="font-bold text-sm sm:text-base">{rewardMessage}</span>
      </div>
    </motion.div>
  );
};

export default RewardAnimation;
