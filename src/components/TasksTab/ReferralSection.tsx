import React, { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, Clipboard, Share2 } from "lucide-react";
import { Input } from "../ui/input";
import Image from "next/image";
import { useToast } from "../ui/use-toast";
import { UserData, containerVariants, itemVariants } from "./types";

interface ReferralSectionProps {
  userData: UserData | null;
  triggerConfetti: () => void;
}

const ReferralSection: React.FC<ReferralSectionProps> = ({ userData, triggerConfetti }) => {
  const [buttonText, setButtonText] = useState("Copy");
  const { toast } = useToast();
  
  const COPY_BTN_TEXT = "Copy";

  const copyToClipboard = async () => {
    const link = document.getElementById("link-input") as HTMLInputElement;
    if (link) {
      await navigator.clipboard.writeText(link.value);
      setButtonText("Copied!");
      // Show success animation
      triggerConfetti();

      toast({
        title: "Link Copied!",
        description: "Your Outlaw referral link is ready to share!",
      });

      setTimeout(() => setButtonText(COPY_BTN_TEXT), 3000);
    }
  };

  const shareText = `Join the OUTLAW waitlist 🎯

- Early access to token launch
- Exclusive in-game rewards
- Join our gang of outlaws
- Earn bounties and compete for glory

Use my referral link to get bonus tokens:
${process.env.NEXT_PUBLIC_URL || "https://outlaw.xyz"}/?ref=${userData?.invitation_code}`;

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}`;
    window.open(url, "_blank");
    toast({
      title: "Sharing on Twitter",
      description: "Thanks for spreading the word, partner!",
    });
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
      
      {/* Gold trim at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-amber-500/5 via-amber-400/30 to-amber-500/5"></div>
      
      <motion.div variants={itemVariants} className="flex gap-4 flex-col sm:flex-row sm:items-center sm:justify-between relative z-10">
        <div className="mb-3 sm:mb-0">
          <div className="flex items-center">
            <div className="relative group mr-2">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 opacity-50 blur-sm group-hover:blur-md group-hover:opacity-75 transition-all duration-300"></div>
              <div className="relative">
                <UserPlus className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
              </div>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">Recruit Your Posse</h3>
          </div>
          <p className="text-white/70 text-xs sm:text-sm mt-1">
            <span className="text-amber-500 font-bold">500 tokens</span> for each recruit + <span className="text-amber-500 font-bold">10%</span> of their bounty earnings!
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(245, 158, 11, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            onClick={shareOnTwitter}
            className="bg-black text-white border border-amber-500/50 py-1.5 px-3 sm:py-2 sm:px-4 rounded-lg flex items-center space-x-2 text-xs sm:text-sm"
          >
            <Share2 className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500" />
            <span>Share</span>
          </motion.button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-3 sm:mt-5 flex flex-col sm:flex-row relative z-10">
        <div className="relative flex-grow">
          <Input
            id="link-input"
            type="text"
            defaultValue={`${process.env.NEXT_PUBLIC_URL || "https://outlaw.xyz"}/?ref=${userData?.invitation_code}`}
            readOnly
            className="bg-black border-amber-500/30 text-white rounded-lg sm:rounded-l-lg sm:rounded-r-none text-xs sm:text-sm mb-2 sm:mb-0 focus:ring-amber-500/30 focus:border-amber-500/50 pr-10"
          />
          {/* Lock icon for input security */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-500/50">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
        </div>
        
        <motion.button
          whileHover={{ backgroundColor: "rgba(245, 158, 11, 0.9)" }}
          whileTap={{ scale: 0.95 }}
          onClick={copyToClipboard}
          className="bg-amber-500 text-black py-2 px-3 sm:px-4 rounded-lg sm:rounded-l-none sm:rounded-r-lg flex items-center justify-center text-xs sm:text-sm"
        >
          <Clipboard size={14} className="mr-1 sm:mr-2 sm:h-4 sm:w-4" />
          {buttonText}
        </motion.button>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-3 sm:mt-4 flex items-center justify-between relative z-10">
        <div className="text-white/60 text-xs sm:text-sm">
          <span className="text-amber-500 font-bold">{userData?.invited_accounts_count || 0}</span> outlaws recruited
        </div>
        
        {userData?.invited_accounts_count && userData?.invited_accounts_count > 0 ? (
          <div className="bg-black/40 border border-amber-500/20 rounded-full px-2 py-0.5 text-[10px] text-amber-500">
            ACTIVE RECRUITER
          </div>
        ) : (
          <div className="bg-black/40 border border-amber-500/20 rounded-full px-2 py-0.5 text-[10px] text-amber-500/50 animate-pulse">
            NO RECRUITS YET
          </div>
        )}
      </motion.div>
      
      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-14 h-14 opacity-10">
        <div className="w-full h-full border-t-2 border-l-2 border-amber-500 rounded-tl-lg"></div>
      </div>
    </motion.div>
  );
};

export default ReferralSection;