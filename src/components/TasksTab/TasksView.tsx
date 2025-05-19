// components/TasksTab/TasksView.tsx
import React from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "./types"; // Add this import
import LevelProgress from "./LevelProgress";
import ReferralSection from "./ReferralSection";
import TaskItem from "./TaskItem";
import { TwitterButton, TwitterIIButton, TwitterIIIButton } from "../ui/twitterButton";
import DiscordButton from "../ui/discordButton";
import { TelegramButton, TelegramIIButton } from "../ui/telegramButton";
import HodiWalletConnect from "../HodiWalletConnect";
import { TaskStatusProps, UserData } from "./types";

interface TasksViewProps extends TaskStatusProps {
  userData: UserData | null;
  userPointsTotal: number;
  triggerConfetti: () => void;
}

const TasksView: React.FC<TasksViewProps> = ({ 
  userData,
  userPointsTotal,
  isTwitterFollowed,
  isTwitterIIFollowed,
  isTwitterIIIFollowed,
  isDiscordJoined,
  isTelegramJoined,
  isTelegramIIJoined,
  isSolanaWalletConnected,
  refreshTwitterFollowStatus,
  refreshTwitterIIFollowStatus,
  refreshTwitterIIIFollowStatus,
  refreshDiscordJoinStatus,
  refreshTelegramJoinStatus,
  refreshTelegramIIJoinStatus,
  triggerRewardAnimation,
  triggerConfetti
}) => {
  return (
    <div className="p-3 sm:p-6">
      {/* Level progress section */}
      <LevelProgress userData={userData} userPointsTotal={userPointsTotal} />

      {/* Referral section */}
      <ReferralSection userData={userData} triggerConfetti={triggerConfetti} />

      {/* Tasks list */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-black rounded-xl border border-amber-500/30 overflow-hidden"
      >
        <motion.div variants={itemVariants} className="p-3 sm:p-4 border-b border-amber-500/20">
          <h3 className="text-base sm:text-lg font-bold text-white">Complete Missions</h3>
          <p className="text-amber-400 text-xs sm:text-sm">Earn tokens, rise in rank, and claim loot by completing these missions</p>
        </motion.div>

        <div className="divide-y divide-yellow-400/10">
          {/* Twitter Follow */}
          <TaskItem isCompleted={isTwitterFollowed} points={1000}>
            <TwitterButton
              isDisabled={isTwitterFollowed}
              onFollowSuccess={refreshTwitterFollowStatus}
            />
          </TaskItem>

          {/* Twitter II Follow */}
          <TaskItem isCompleted={isTwitterIIFollowed} points={500}>
            <TwitterIIButton
              isDisabled={isTwitterIIFollowed}
              onFollowSuccess={refreshTwitterIIFollowStatus}
            />
          </TaskItem>

          {/* Twitter III Follow */}
          {/* <TaskItem isCompleted={isTwitterIIIFollowed} points={100}>
            <TwitterIIIButton
              isDisabled={isTwitterIIIFollowed}
              onFollowSuccess={refreshTwitterIIIFollowStatus}
            />
          </TaskItem> */}

          {/* Discord Join */}
          {/* <TaskItem isCompleted={isDiscordJoined} points={100}>
            <DiscordButton
              isDisabled={isDiscordJoined}
              onFollowSuccess={refreshDiscordJoinStatus}
            />
          </TaskItem> */}

          {/* Telegram II Join */}
          <TaskItem isCompleted={isTelegramIIJoined} points={1000}>
            <TelegramIIButton
              isDisabled={isTelegramIIJoined}
              onFollowSuccess={refreshTelegramIIJoinStatus}
            />
          </TaskItem>

          {/* Solana Wallet Connection */}
          <motion.div
            variants={itemVariants} // Add this to fix the error
            whileHover={{ backgroundColor: "rgba(234, 179, 8, 0.1)" }}
            className="p-3 sm:p-4 flex items-center"
          >
            <HodiWalletConnect
              isDisabled={isSolanaWalletConnected}
              points={500}
              onWalletConnectSuccess={(points) => {
                if (points > 0) {
                  triggerRewardAnimation(`Wallet connected with ${points.toLocaleString()} HODI holding bonus!`);
                } else {
                  triggerRewardAnimation("Wallet connected! +500 points");
                }
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default TasksView;