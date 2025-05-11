'use client'
import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "./ui/button";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, Lock, Zap, Star, Shield } from "lucide-react";

interface ConfettiProps {
  show: boolean;
}

const Confetti: React.FC<ConfettiProps> = ({ show }) => {
  if (!show) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 pointer-events-none z-10"
    >
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              top: "0%", 
              left: `${Math.random() * 100}%`,
              scale: 0.5,
              opacity: 1
            }}
            animate={{ 
              top: "100%", 
              scale: 1,
              opacity: 0,
              rotate: Math.random() * 360
            }}
            transition={{ 
              duration: 3 + Math.random() * 2, 
              ease: "easeOut",
              delay: Math.random() * 0.5
            }}
            className="absolute w-3 h-3 rounded-full"
            style={{
              background: i % 2 === 0 ? "#F59E0B" : "#000000",
              boxShadow: "0 0 10px rgba(245, 158, 11, 0.7)"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default function WaitlistEntrance() {
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hoverButton, setHoverButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  async function signInWithTwitter() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "twitter",
    });
  }

  // Background grid animation variants
  const gridVariants = {
    animate: {
      backgroundPosition: ["0px 0px", "20px 20px"],
      transition: {
        duration: 2,
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse" 
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(rgba(245, 158, 11, 0.3) 1px, transparent 0)",
            backgroundSize: "30px 30px"
          }}
        ></div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center relative z-10"
        >
          <motion.div
            animate={{
              rotate: 360,
              boxShadow: ["0 0 20px rgba(245, 158, 11, 0.5)", "0 0 40px rgba(245, 158, 11, 0.8)", "0 0 20px rgba(245, 158, 11, 0.5)"]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              boxShadow: { duration: 2, repeat: Infinity, repeatType: "reverse" }
            }}
            className="rounded-full p-2 bg-black"
          >
            <div className="w-40 h-40 rounded-full flex items-center justify-center bg-amber-600 border-4 border-amber-500">
              <svg width="120" height="120" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform scale-75">
                <path d="M100 20C70 20 40 50 40 80C40 110 70 140 100 140C130 140 160 110 160 80C160 50 130 20 100 20Z" fill="#F59E0B"/>
                <path d="M74 60L100 100L126 60L100 20L74 60Z" fill="#1E293B"/>
                <path d="M100 140V180M80 160H120" stroke="#F59E0B" strokeWidth="10"/>
              </svg>
            </div>
          </motion.div>
          
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1.5, repeat: Infinity }
            }}
            className="mt-10 rounded-full h-16 w-16 border-4 border-r-amber-500 border-l-amber-700 border-t-amber-600 border-b-amber-400"
          />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-6 text-amber-500 font-bold text-xl tracking-widest"
          >
            LOADING OUTLAW ACCESS
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      className="relative flex items-center justify-center min-h-screen overflow-hidden h-fit"
      animate="animate"
     
    >
      {/* <div className="absolute inset-0 bg-black bg-opacity-60"></div> */}
      <Confetti show={showConfetti} />
      

      {/* Floating coin symbols in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              opacity: 0.1 + (Math.random() * 0.3)
            }}
            animate={{ 
              y: [0, -30, 0],
              rotate: Math.random() > 0.5 ? [0, 360] : [360, 0]
            }}
            transition={{ 
              y: { 
                duration: 2 + Math.random() * 3, 
                repeat: Infinity, 
                repeatType: "reverse"
              },
              rotate: {
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                ease: "linear"
              }
            }}
            className="absolute text-amber-500"
            style={{ fontSize: `${20 + Math.random() * 30}px` }}
          >
            {Math.random() > 0.7 ? "💰" : "🪙"}
          </motion.div>
        ))}
      </div>

      <Card className="w-full max-w-md bg-black bg-opacity-90 p-6 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.3)] border-2 border-amber-500 relative z-10">
        <CardHeader className="pb-0">
          <motion.div 
            className="flex justify-center mb-6"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative">
              <motion.div
                animate={{
                  boxShadow: ["0 0 15px rgba(245, 158, 11, 0.5)", "0 0 30px rgba(245, 158, 11, 0.8)", "0 0 15px rgba(245, 158, 11, 0.5)"]
                }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                className="absolute inset-0 rounded-full"
              ></motion.div>
             <img
                src="/images/logo.png"
                alt="Logo"
                className="w-[7rem] h-[7rem] rounded-full border-2 border-yellow-400 hover:scale-110 transition-transform duration-300"
              />
            </div>
          </motion.div>
          
          <CardTitle className="text-2xl sm:text-3xl font-bold text-center text-amber-500 mb-4 tracking-wider">
            JOIN THE OUTLAWS
          </CardTitle>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="pt-2 flex flex-col gap-4"
          >
            <div className="bg-gray-900/50 p-4 rounded-lg border border-amber-500/20 text-center text-white leading-relaxed">
              The OUTLAW token is here. Complete tasks, earn rewards, and be part of the revolution.
              <div className="text-amber-500 font-bold mt-1 text-sm">
                Early members get exclusive token benefits!
              </div>
            </div>
          </motion.div>
        </CardHeader>
        
        <CardContent className="flex flex-col items-center pt-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setHoverButton(true)}
            onHoverEnd={() => setHoverButton(false)}
            className="w-full"
          >
            <Button
              onClick={signInWithTwitter}
              className="w-full py-6 font-bold text-white bg-amber-500 hover:bg-black hover:text-amber-500 border-2 border-amber-500 transition-all duration-300 group transform rounded-xl relative overflow-hidden"
            >
              <AnimatePresence>
                {hoverButton && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: [1, 1.5, 1] }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="bg-amber-500/20 rounded-full h-20 w-20 animate-ping" />
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="relative flex items-center justify-center">
                <Image
                  src="/images/twitter.png"
                  alt="Twitter"
                  width={30}
                  height={30}
                  className="mr-3 group-hover:rotate-12 transition-all duration-300"
                />
                <span className="text-lg group-hover:tracking-wider transition-all duration-300">
                  SIGN IN WITH X
                </span>
              </div>
            </Button>
          </motion.div>
          
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Lock className="h-4 w-4 text-amber-500 mr-2" />
              <span className="text-amber-500 font-bold text-sm">EXCLUSIVE ACCESS</span>
            </div>
            <p className="text-white/70 text-sm">
              Join the waitlist to participate in the exclusive OUTLAW token launch
            </p>
          </div>
          
          <motion.div 
            className="flex items-center justify-center mt-6 space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex flex-col items-center">
              <div className="bg-gray-800 rounded-full h-10 w-10 flex items-center justify-center mb-1">
                <DollarSign className="h-5 w-5 text-amber-500" />
              </div>
              <span className="text-white text-xs">Earn Points</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-gray-800 rounded-full h-10 w-10 flex items-center justify-center mb-1">
                <Zap className="h-5 w-5 text-amber-500" />
              </div>
              <span className="text-white text-xs">Complete Tasks</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-gray-800 rounded-full h-10 w-10 flex items-center justify-center mb-1">
                <Shield className="h-5 w-5 text-amber-500" />
              </div>
              <span className="text-white text-xs">Claim Rewards</span>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}