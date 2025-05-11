import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PublicKey } from '@solana/web3.js';
import { useToast } from "./ui/use-toast";
import { motion } from "framer-motion";
import { CheckCircle2, Lock } from "lucide-react";
import { savePrincipalId, fetchAccount } from "@/app/actions";

interface HodiWalletConnectProps {
  isDisabled: boolean;
  onWalletConnectSuccess: (points: number) => void;
}

const HodiWalletConnect: React.FC<HodiWalletConnectProps> = ({ isDisabled, onWalletConnectSuccess }) => {
  const { publicKey, connected } = useWallet();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Simplified effect to handle wallet connection only
  useEffect(() => {
    let isMounted = true;
    
    const connectWallet = async () => {
      if (!connected || !publicKey || !isMounted) return;
      
      try {
        setIsLoading(true);
        
        // Check if user already has an account
        const account = await fetchAccount();
        
        if (!account) {
          console.log("No account found");
          setIsLoading(false);
          return;
        }
        
        // Check if this wallet is already associated with the account
        if (account.principal_id === publicKey.toString()) {
          console.log("Wallet already connected to account");
          setIsWalletConnected(true);
          setIsLoading(false);
          return;
        }
        
        // Connect new wallet
        if (!isWalletConnected) {
          console.log("Connecting new wallet");
          
          // Save wallet address
          if (!account.principal_id) {
            console.log("Saving new principal ID");
            const success = await savePrincipalId(publicKey.toString(), 0); // Not checking balance, pass 0
            
            if (isMounted && success) {
              setIsWalletConnected(true);
              
              toast({
                title: "Wallet Connected Successfully",
                description: "Your wallet has been connected to your account."
              });
              
              // Use default point value since we're not checking balance
              onWalletConnectSuccess(200); // Using PLUG_WALLET_POINTS
            }
          } else {
            // Wallet already exists but different from current connection
            setIsWalletConnected(true);
            onWalletConnectSuccess(0);
          }
        }
      } catch (error) {
        console.error("Error connecting wallet:", error);
        toast({
          title: "Connection Error",
          description: "There was a problem connecting your wallet. Please try again.",
        });
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    
    // Check if wallet is already connected in database
    const checkExistingWallet = async () => {
      if (!isMounted) return;
      
      try {
        setIsLoading(true);
        const account = await fetchAccount();
        
        if (!account) {
          setIsLoading(false);
          return;
        }
        
        // If account has a wallet connected already
        if (account.principal_id) {
          try {
            // Just validate it's a valid public key
            new PublicKey(account.principal_id);
            setIsWalletConnected(true);
          } catch (error) {
            console.error("Invalid stored public key:", error);
          }
        }
      } catch (error) {
        console.error("Error checking existing wallet:", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    
    if (connected && publicKey) {
      connectWallet();
    } else {
      checkExistingWallet();
    }
    
    return () => {
      isMounted = false;
    };
  }, [connected, publicKey, onWalletConnectSuccess, toast]);

  return (
    <div className="flex items-center">
      <div className={`min-w-[28px] h-7 sm:min-w-[32px] sm:h-8 flex items-center justify-center rounded-full ${isWalletConnected ? 'bg-yellow-400' : 'bg-gray-800'} mr-2 sm:mr-4`}>
        {isWalletConnected ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-black" />
          </motion.div>
        ) : (
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Lock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white/50" />
          </motion.div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <WalletMultiButton
          className="wallet-adapter-button wallet-adapter-button-trigger"
          style={{
            backgroundColor: isWalletConnected ? "#d4af37" : "#eab308",
            color: "black",
            fontFamily: "inherit",
            height: "36px",
            padding: "0 12px",
            fontSize: "12px",
            borderRadius: "8px",
            cursor: isDisabled || isWalletConnected ? "default" : "pointer",
            display: "flex",
            alignItems: "center",
            fontWeight: "600",
            transition: "background-color 0.2s ease",
            opacity: isDisabled || isWalletConnected ? 0.7 : 1,
            maxWidth: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
          disabled={isDisabled || isWalletConnected || isLoading}
        >
          {isLoading ? "Connecting Wallet..." : 
           isWalletConnected ? "Wallet Connected" : 
           "Connect Wallet"}
        </WalletMultiButton>
      </div>
    </div>
  );
};

export default HodiWalletConnect;