import React, { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, Clipboard } from "lucide-react";
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
        description: "Your NFT waitlist referral link is ready to share!",
      });

      setTimeout(() => setButtonText(COPY_BTN_TEXT), 3000);
    }
  };

  const shareText = `Just joined the NFT waitlist 🎨

- Limited collection with real utility
- Backed by a strong community
- Early access to mint
- Exclusive NFT rewards

Join me on the waitlist & earn points with my referral link:
${process.env.NEXT_PUBLIC_URL || "https://nft.xyz"}/?ref=${userData?.invitation_code}`;

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}`;
    window.open(url, "_blank");
    toast({
      title: "Sharing on Twitter",
      description: "Thanks for spreading the word!",
    });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mb-5 sm:mb-8 bg-gradient-to-b from-gray-900 to-black p-3 sm:p-6 rounded-xl border border-yellow-400/30"
    >
      <motion.div variants={itemVariants} className="flex gap-4 flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-3 sm:mb-0">
          <div className="flex items-center">
            <UserPlus className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 mr-1 sm:mr-2" />
            <h3 className="text-base sm:text-lg font-bold text-white">Invite Friends</h3>
          </div>
          <p className="text-white/70 text-xs sm:text-sm mt-1">
            <span className="text-yellow-400 font-bold">500 points</span> for each referral + <span className="text-yellow-400 font-bold">10%</span> of their earnings!
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#1a91da" }}
            whileTap={{ scale: 0.95 }}
            onClick={shareOnTwitter}
            className="bg-[#1DA1F2] text-white py-1.5 px-2.5 sm:py-2 sm:px-4 rounded-lg flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
          >
            <Image
              src="/images/twitter.png"
              alt="twitter"
              width={14}
              height={14}
              className="sm:w-4 sm:h-4"
            />
            <span>Twitter</span>
          </motion.button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-3 sm:mt-5 flex flex-col sm:flex-row">
        <Input
          id="link-input"
          type="text"
          defaultValue={`${process.env.NEXT_PUBLIC_URL || "https://nft.xyz"}/?ref=${userData?.invitation_code}`}
          readOnly
          className="bg-gray-800 border-gray-700 text-white rounded-lg sm:rounded-l-lg sm:rounded-r-none text-xs sm:text-sm mb-2 sm:mb-0"
        />
        <motion.button
          whileHover={{ backgroundColor: "#d4af37" }}
          whileTap={{ scale: 0.95 }}
          onClick={copyToClipboard}
          className="bg-yellow-400 text-black py-2 px-3 sm:px-4 rounded-lg sm:rounded-l-none sm:rounded-r-lg flex items-center justify-center text-xs sm:text-sm"
        >
          <Clipboard size={14} className="mr-1 sm:mr-2 sm:h-4 sm:w-4" />
          {buttonText}
        </motion.button>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-2 sm:mt-3 text-white/50 text-xs sm:text-sm">
        <span className="text-yellow-400 font-bold">{userData?.invited_accounts_count || 0}</span> friends invited so far
      </motion.div>
    </motion.div>
  );
};

export default ReferralSection;