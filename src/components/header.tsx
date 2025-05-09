'use client'
import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { Trophy, DollarSign, LogOut, Menu, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardHeader() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [userPoints, setUserPoints] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      
      // Get user authentication data
      const { data, error } = await supabase.auth.getUser();
      if (!error && data.user) {
        setUser(data.user);
        
        // Get user points from accounts table
        const { data: accountData } = await supabase
          .from("accounts")
          .select("total_points")
          .eq("id", data.user.id)
          .single();
          
        if (accountData) {
          setUserPoints(accountData.total_points);
        }
      }
      
      setIsLoading(false);
    };
    
    fetchUserData();
  }, [supabase.auth]);

  function signOut() {
    supabase.auth.signOut().then(() => {
      window.location.href = "/enter";
    });
  }

  const getLevelName = () => {
    if (userPoints < 5000) return "Rookie";
    if (userPoints < 20000) return "Gunslinger";
    if (userPoints < 50000) return "Desperado";
    return "Outlaw";
  };

  if (!user) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 py-2">
      {/* Animated background with grain texture */}
      <div 
        className="absolute inset-0 bg-black/90"
        style={{
          backgroundImage: "radial-gradient(rgba(245, 158, 11, 0.15) 1px, transparent 0)",
          backgroundSize: "20px 20px",
          backgroundPosition: "-10px -10px",
        }}
      />
      
      {/* Gold trim at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-500/50 via-amber-400 to-amber-500/50" />
      
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4 relative">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 opacity-75 group-hover:opacity-100 blur group-hover:blur-md transition-all duration-300"></div>
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-amber-500 bg-black flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <svg width="24" height="24" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform scale-75">
                  <path d="M100 20C70 20 40 50 40 80C40 110 70 140 100 140C130 140 160 110 160 80C160 50 130 20 100 20Z" fill="#F59E0B"/>
                  <path d="M74 60L100 100L126 60L100 20L74 60Z" fill="#1E293B"/>
                  <path d="M100 140V180M80 160H120" stroke="#F59E0B" strokeWidth="10"/>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Level badge */}
          <div className="ml-2 sm:ml-4 hidden sm:block">
            <motion.div 
              className="bg-black border border-amber-500 rounded-lg px-3 py-1 text-xs font-bold text-white flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Trophy className="w-3 h-3 mr-1 text-amber-500" />
              <span>{getLevelName()}</span>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          {/* Points display with animation */}
          <motion.div 
            className="mr-3 bg-black border border-amber-500 rounded-full px-3 py-1 text-sm font-bold flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-amber-500" />
            <span className="text-amber-500">{userPoints}</span>
          </motion.div>
          
          {/* User profile section */}
          <div className="relative">
            <motion.button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 focus:outline-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative group">
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  src={user.user_metadata.avatar_url}
                  alt={user.user_metadata.full_name}
                  className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-amber-500 object-cover"
                />
              </div>
              <ChevronDown className="w-4 h-4 text-amber-500 hidden sm:block" />
            </motion.button>
            
            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-black border border-amber-500/50 rounded-lg shadow-lg py-1 z-50"
                >
                  <div className="px-4 py-2 border-b border-amber-500/20">
                    <p className="text-amber-500 font-bold text-sm">@{user.user_metadata.preferred_username}</p>
                    <p className="text-white/70 text-xs">{user.email}</p>
                  </div>
                  <button
                    onClick={signOut}
                    className="w-full text-left px-4 py-2 text-white hover:bg-amber-500/10 transition-colors flex items-center text-sm"
                  >
                    <LogOut className="w-4 h-4 mr-2 text-amber-500" />
                    Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </header>
  );
}