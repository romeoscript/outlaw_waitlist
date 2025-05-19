// components/TasksTab/index.tsx
'use client'
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, DollarSign, Target, Flame, Users, Award, LogOut, ChevronDown } from "lucide-react";
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
import Image from "next/image";

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
        triggerRewardAnimation("Twitter follow completed! +1000 OUTLAW tokens");
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
        triggerRewardAnimation("Whitepaper read! +500 OUTLAW tokens");
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
        triggerRewardAnimation("Dev followed! +100 OUTLAW tokens");
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
        triggerRewardAnimation("Joined the Outlaw Gang! +100 OUTLAW tokens");
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
        triggerRewardAnimation("Telegram Channel joined! +1000 OUTLAW tokens");
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
        triggerRewardAnimation("Telegram channel joined! +1000 OUTLAW tokens");
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
              (point) => point.note === "Follow Outlaw on Twitter"
            ) || false
          );

          setIsTwitterIIFollowed(
            fetchedPointsList.some(
              (point) => point.note === "Read whitepaper"
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
          description: "Failed to load your data, partner. Try again.",
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

  const getLevelName = () => {
    if (!userData) return "Rookie";

    if (userData.total_points < 500) {
      return "Rookie";
    } else if (userData.total_points < 2000) {
      return "Gunslinger";
    } else if (userData.total_points < 5000) {
      return "Desperado";
    }
    return "Outlaw";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
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

      <Card className="border border-amber-500/50 bg-black text-white overflow-hidden shadow-lg">
        {/* Animated background with grain texture */}
        <div 
          className="absolute inset-0 z-0 bg-black/90"
          style={{
            backgroundImage: "radial-gradient(rgba(245, 158, 11, 0.15) 1px, transparent 0)",
            backgroundSize: "20px 20px",
            backgroundPosition: "-10px -10px",
          }}
        />
        
        <CardHeader className="relative z-10 p-4 sm:p-6 border-b border-amber-500/20">
          <div className="flex justify-between items-center">
            <div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center"
              >
                <div className="relative group mr-3">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 opacity-75 group-hover:opacity-100 blur group-hover:blur-md transition-all duration-300"></div>
                 <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={50}
                  height={50}
                 />
                </div>
                <div>
                  <CardTitle className="text-xl sm:text-3xl font-bold text-white">
                    OUTLAW <span className="text-amber-500">WAITLIST</span>
                  </CardTitle>
                  <CardDescription className="text-white/70 mt-1 sm:mt-2 text-sm sm:text-base">
                    Complete bounties, earn tokens, become an outlaw
                  </CardDescription>
                </div>
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
              <motion.div 
                className="bg-black border border-amber-500 rounded-full px-3 py-1 text-base sm:text-xl font-bold flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 mr-1 text-amber-500" />
                <span className="text-amber-500">{userPointsTotal}</span>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Status Banner */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-3 sm:mt-4 flex items-center justify-between"
          >
            <motion.div 
              className="bg-black border border-amber-500 rounded-lg px-3 py-1 text-xs font-bold text-white flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Trophy className="w-3 h-3 mr-1 text-amber-500" />
              <span>Status: <span className="text-amber-500">{getLevelName()}</span></span>
            </motion.div>
            
            <div className="text-amber-500 text-xs animate-pulse">
              TOKEN LAUNCHING SOON
            </div>
          </motion.div>
        </CardHeader>

        {/* Tabs navigation */}
        <div className="relative z-10 bg-black border-b border-amber-500/20">
          <div className="flex">
            <motion.button
              whileHover={{ backgroundColor: 'rgba(245, 158, 11, 0.1)' }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 text-center font-medium text-xs sm:text-sm ${activeTab === 'tasks' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-white/70'
                }`}
              onClick={() => handleTabChange('tasks')}
            >
              <div className="flex items-center justify-center">
                <Target className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span>BOUNTIES</span>
              </div>
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: 'rgba(245, 158, 11, 0.1)' }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 text-center font-medium text-xs sm:text-sm ${activeTab === 'rewards' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-white/70'
                }`}
              onClick={() => handleTabChange('rewards')}
            >
              <div className="flex items-center justify-center">
                <Trophy className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span>LOOT</span>
              </div>
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: 'rgba(245, 158, 11, 0.1)' }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 text-center font-medium text-xs sm:text-sm ${activeTab === 'points' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-white/70'
                }`}
              onClick={() => handleTabChange('points')}
            >
              <div className="flex items-center justify-center">
                <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span>TOKENS</span>
              </div>
            </motion.button>
          </div>
        </div>

        <CardContent className="p-0 relative z-10">
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
        
        {/* Gold trim at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-500/50 via-amber-400 to-amber-500/50 z-10" />
      </Card>
    </motion.div>
  );
}