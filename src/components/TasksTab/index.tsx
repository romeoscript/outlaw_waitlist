// components/TasksTab/index.tsx
'use client'
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Trophy, DollarSign } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { useWallet } from '@solana/wallet-adapter-react';
import {
  fetchAccount,
  fetchPointsList,
  fetchTwitterFollowed,
  fetchTwitterIIFollowed,
  fetchTwitterIIIFollowed,
  fetchDiscordJoined,
  fetchTelegramJoined,
  fetchTelegramIIJoined,
} from "@/app/actions";

// Import sub-components
import TasksView from "./TasksView";
import RewardsView from "./RewardsView";
import PointsView from "./PointsView";
import RewardAnimation from "./RewardAnimation";
import ConfettiAnimation from "./ConfettiAnimation";
import LoadingScreen from "./LoadingScreen";
import { UserData, PointsList } from "./types";

export default function TasksTab() {
  const [isTwitterFollowed, setIsTwitterFollowed] = useState(false);
  const [isTwitterIIFollowed, setIsTwitterIIFollowed] = useState(false);
  const [isTwitterIIIFollowed, setIsTwitterIIIFollowed] = useState(false);
  const [isDiscordJoined, setIsDiscordJoined] = useState(false);
  const [isTelegramJoined, setIsTelegramJoined] = useState(false);
  const [isTelegramIIJoined, setIsTelegramIIJoined] = useState(false);
  const [isSolanaWalletConnected, setIsSolanaWalletConnected] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pointsList, setPointsList] = useState<PointsList | null>(null);
  const [userPointsTotal, setUserPointsTotal] = useState(0);
  const [activeTab, setActiveTab] = useState('tasks');
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();
  const { publicKey, connected } = useWallet();
  
  // Reward animation state
  const [rewardMessage, setRewardMessage] = useState("");
  const [showReward, setShowReward] = useState(false);

  // Task status refresh functions
  const refreshTwitterFollowStatus = async () => {
    setIsLoading(true);
    try {
      const followed = await fetchTwitterFollowed();
      const wasAlreadyFollowed = isTwitterFollowed;
      setIsTwitterFollowed(!!followed);

      if (!wasAlreadyFollowed && followed) {
        triggerRewardAnimation("Twitter follow completed! +100 points");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const refreshTwitterIIFollowStatus = async () => {
    setIsLoading(true);
    try {
      const followed = await fetchTwitterIIFollowed();
      const wasAlreadyFollowed = isTwitterIIFollowed;
      setIsTwitterIIFollowed(!!followed);

      if (!wasAlreadyFollowed && followed) {
        triggerRewardAnimation("Subscribe completed! +100 points");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const refreshTwitterIIIFollowStatus = async () => {
    setIsLoading(true);
    try {
      const followed = await fetchTwitterIIIFollowed();
      const wasAlreadyFollowed = isTwitterIIIFollowed;
      setIsTwitterIIIFollowed(!!followed);

      if (!wasAlreadyFollowed && followed) {
        triggerRewardAnimation("Kev the Dev follow completed! +100 points");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const refreshDiscordJoinStatus = async () => {
    setIsLoading(true);
    try {
      const joined = await fetchDiscordJoined();
      const wasAlreadyJoined = isDiscordJoined;
      setIsDiscordJoined(!!joined);

      if (!wasAlreadyJoined && joined) {
        triggerRewardAnimation("Discord join completed! +100 points");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const refreshTelegramJoinStatus = async () => {
    setIsLoading(true);
    try {
      const joined = await fetchTelegramJoined();
      const wasAlreadyJoined = isTelegramJoined;
      setIsTelegramJoined(!!joined);

      if (!wasAlreadyJoined && joined) {
        triggerRewardAnimation("Telegram join completed! +100 points");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const refreshTelegramIIJoinStatus = async () => {
    setIsLoading(true);
    try {
      const joined = await fetchTelegramIIJoined();
      const wasAlreadyJoined = isTelegramIIJoined;
      setIsTelegramIIJoined(!!joined);

      if (!wasAlreadyJoined && joined) {
        triggerRewardAnimation("Telegram channel join completed! +100 points");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger reward animation
  const triggerRewardAnimation = (message: string) => {
    setRewardMessage(message);
    setShowReward(true);
    setTimeout(() => setShowReward(false), 3000);
  };

  // Show confetti animation for copy events
  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  // Check Solana wallet connection
  useEffect(() => {
    if (connected && publicKey) {
      setIsSolanaWalletConnected(true);
    } else {
      setIsSolanaWalletConnected(false);
    }
  }, [connected, publicKey]);

  // Load user data and update status
  useEffect(() => {
    setIsLoading(true);

    const loadData = async () => {
      let total = 0;
      try {
        const fetchUser = await fetchAccount();
        const fetchedPointsList = await fetchPointsList();

        setPointsList(fetchedPointsList);
        setUserData(fetchUser);

        if (fetchedPointsList) {
          setIsTwitterFollowed(
            fetchedPointsList.some(
              (point) => point.note === "Follow $HODI on Twitter"
            ) || false
          );

          setIsTwitterIIFollowed(
            fetchedPointsList.some(
              (point) => point.note === "Subscribe to our youtube channel"
            ) || false
          );

          setIsTwitterIIIFollowed(
            fetchedPointsList.some(
              (point) => point.note === "Follow Kev the Dev on X"
            ) || false
          );

          setIsDiscordJoined(
            fetchedPointsList.some(
              (point) => point.note === "Joined Discord Cat Cartel"
            ) || false
          );

          setIsTelegramJoined(
            fetchedPointsList.some(
              (point) => point.note === "Joined Telegram Community"
            ) || false
          );

          setIsTelegramIIJoined(
            fetchedPointsList.some(
              (point) => point.note === "Joined Telegram Channel"
            ) || false
          );

          fetchedPointsList.forEach((p) => {
            total += p.amount;
          });
        }

        setIsSolanaWalletConnected(fetchUser?.principal_id ? true : false);
        setUserPointsTotal(total);
      } catch (error) {
        console.error("Error loading data:", error);
        toast({
          title: "Error",
          description: "Failed to load your data. Please try again.",
        });
      }
    };

    loadData().finally(() => {
      setIsLoading(false);
    });

  }, [isSolanaWalletConnected, isTwitterFollowed, toast]);

  // Tab change handler
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // Special animations for loading state
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Reward animation overlay */}
      <AnimatePresence>
        {showReward && (
          <RewardAnimation showReward={showReward} rewardMessage={rewardMessage} />
        )}
      </AnimatePresence>

      {/* Confetti animation for referral copy */}
      <AnimatePresence>
        {showConfetti && <ConfettiAnimation showConfetti={showConfetti} />}
      </AnimatePresence>

      <Card className="border-2 border-yellow-400 bg-black text-white overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-yellow-500 to-yellow-400 p-4 sm:p-6">
          <div className="flex justify-between items-center">
            <div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <CardTitle className="text-xl sm:text-3xl font-bold text-black">
                  NFT Waitlist
                </CardTitle>
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <CardDescription className="text-black/80 mt-1 sm:mt-2 text-sm sm:text-lg">
                  Complete tasks, earn points, level up!
                </CardDescription>
              </motion.div>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.5
              }}
              className="flex items-center"
            >
              <div className="bg-black/30 p-2 sm:p-3 rounded-full text-white text-base sm:text-xl font-bold">
                {userPointsTotal}
                <span className="ml-1 text-yellow-300">⚡</span>
              </div>
            </motion.div>
          </div>
        </CardHeader>

        {/* Tabs navigation - Mobile Friendly */}
        <div className="bg-black border-b border-yellow-400/30">
          <div className="flex">
            <motion.button
              whileHover={{ backgroundColor: activeTab === 'tasks' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(234, 179, 8, 0.1)' }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 text-center font-medium text-xs sm:text-sm ${activeTab === 'tasks' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-white/70'
                }`}
              onClick={() => handleTabChange('tasks')}
            >
              <div className="flex items-center justify-center">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span>Tasks</span>
              </div>
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: activeTab === 'rewards' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(234, 179, 8, 0.1)' }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 text-center font-medium text-xs sm:text-sm ${activeTab === 'rewards' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-white/70'
                }`}
              onClick={() => handleTabChange('rewards')}
            >
              <div className="flex items-center justify-center">
                <Trophy className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span>Rewards</span>
              </div>
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: activeTab === 'points' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(234, 179, 8, 0.1)' }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 text-center font-medium text-xs sm:text-sm ${activeTab === 'points' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-white/70'
                }`}
              onClick={() => handleTabChange('points')}
            >
              <div className="flex items-center justify-center">
                <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span>Points</span>
              </div>
            </motion.button>
          </div>
        </div>

        <CardContent className="p-0">
          {/* Render the appropriate view based on active tab */}
          {activeTab === 'tasks' && (
            <TasksView 
              userData={userData}
              userPointsTotal={userPointsTotal}
              isTwitterFollowed={isTwitterFollowed}
              isTwitterIIFollowed={isTwitterIIFollowed}
              isTwitterIIIFollowed={isTwitterIIIFollowed}
              isDiscordJoined={isDiscordJoined}
              isTelegramJoined={isTelegramJoined}
              isTelegramIIJoined={isTelegramIIJoined}
              isSolanaWalletConnected={isSolanaWalletConnected}
              refreshTwitterFollowStatus={refreshTwitterFollowStatus}
              refreshTwitterIIFollowStatus={refreshTwitterIIFollowStatus}
              refreshTwitterIIIFollowStatus={refreshTwitterIIIFollowStatus}
              refreshDiscordJoinStatus={refreshDiscordJoinStatus}
              refreshTelegramJoinStatus={refreshTelegramJoinStatus}
              refreshTelegramIIJoinStatus={refreshTelegramIIJoinStatus}
              triggerRewardAnimation={triggerRewardAnimation}
              triggerConfetti={triggerConfetti}
            />
          )}

          {activeTab === 'rewards' && (
            <RewardsView userData={userData} />
          )}

          {activeTab === 'points' && (
            <PointsView pointsList={pointsList} userPointsTotal={userPointsTotal} />
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}