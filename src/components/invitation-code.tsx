// InvitationCode.tsx
import React, { useState } from "react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { LockKeyholeOpen } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { Loader2 } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { claimCode } from "@/app/actions";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type InvitationCodeProps = {
  isLoading: boolean;
  code: string;
  setCode: (code: string) => void;
};

export default function InvitationCode({
  isLoading,
  code,
  setCode,
}: InvitationCodeProps) {
  const [checkingCode, setCheckingCode] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleCheckCode = async () => {
    setCheckingCode(true);
    const success = await claimCode(code);
    if (success) {
      // Visual success feedback
      toast({
        title: "Success",
        description: "Welcome to the OUTLAW revolution!",
      });
      
      // Redirect to dashboard
      router.push("/dashboard");
    } else {
      toast({
        title: "Invalid Invitation Code",
        description: "Please enter a valid invitation code",
      });
    }
    setCheckingCode(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: `url('/images/outlaw-bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      
      <Card className="bg-black bg-opacity-90 border-2 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)] relative z-10 w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
          <img
                  src="/images/logo.png"
                  alt="Logo"
                  className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-amber-500 object-cover"
                />
            {/* <svg width="60" height="60" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 20C70 20 40 50 40 80C40 110 70 140 100 140C130 140 160 110 160 80C160 50 130 20 100 20Z" fill="#F59E0B"/>
              <path d="M74 60L100 100L126 60L100 20L74 60Z" fill="#1E293B"/>
              <path d="M100 140V180M80 160H120" stroke="#F59E0B" strokeWidth="10"/>
            </svg> */}
          </div>
          <CardTitle className="text-amber-500 text-2xl font-bold tracking-wider">OUTLAW WAITLIST</CardTitle>
          <p className="text-white/70 mt-2">Enter your invitation code to continue</p>
        </CardHeader>
        
        <CardContent className="flex flex-col items-center">
          {isLoading ? (
            <>
              <Skeleton className="w-full mt-4 h-16 bg-amber-500/20" />
              <Skeleton className="w-full mt-4 h-12 bg-amber-500/20" />
            </>
          ) : (
            <div className="my-4">
              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                value={code}
                onChange={(newValue: string) => setCode(newValue)}
                inputMode="text"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="md:w-16 md:h-16 text-lg bg-amber-500/10 border-amber-500 text-amber-500" />
                  <InputOTPSlot index={1} className="md:w-16 md:h-16 text-lg bg-amber-500/10 border-amber-500 text-amber-500" />
                  <InputOTPSlot index={2} className="md:w-16 md:h-16 text-lg bg-amber-500/10 border-amber-500 text-amber-500" />
                  <InputOTPSlot index={3} className="md:w-16 md:h-16 text-lg bg-amber-500/10 border-amber-500 text-amber-500" />
                  <InputOTPSlot index={4} className="md:w-16 md:h-16 text-lg bg-amber-500/10 border-amber-500 text-amber-500" />
                  <InputOTPSlot index={5} className="md:w-16 md:h-16 text-lg bg-amber-500/10 border-amber-500 text-amber-500" />
                </InputOTPGroup>
              </InputOTP>
              
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  onClick={handleCheckCode}
                  className="w-full flex items-center justify-center p-4  text-white mt-6 font-bold bg-amber-500 hover:bg-amber-600 transition-colors"
                  disabled={checkingCode || code.length < 6}
                >
                  {checkingCode ? (
                    <Loader2 className="mr-2 animate-spin" />
                  ) : (
                    <LockKeyholeOpen className="mr-2" />
                  )}
                  Join the OUTLAWS
                </Button>
              </motion.div>

              
            </div>
          )}
        </CardContent>
        
        <CardFooter className="justify-center">
          <div className="text-sm text-amber-500/80 text-center">
          <p className="font-medium">Need an invitation code?</p>
            <p className="text-white/60 mt-1">Contact an existing OUTLAW member to get one</p>
      
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}