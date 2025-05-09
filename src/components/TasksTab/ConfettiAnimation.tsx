import { motion } from "framer-motion";

interface ConfettiAnimationProps {
  showConfetti: boolean;
}

const ConfettiAnimation: React.FC<ConfettiAnimationProps> = ({ showConfetti }) => {
  if (!showConfetti) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 pointer-events-none z-40"
    >
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(40)].map((_, i) => (
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
            className="absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full"
            style={{
              background: i % 2 === 0 ? "#FFD700" : "#000000",
              boxShadow: "0 0 10px rgba(255, 215, 0, 0.7)"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ConfettiAnimation;
