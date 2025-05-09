import React from "react";
import { motion } from "framer-motion";
import { Zap, CheckCircle2, Lock } from "lucide-react";
import { itemVariants } from "./types";

interface TaskItemProps {
  isCompleted: boolean;
  points: number;
  children: React.ReactNode;
}

const TaskItem: React.FC<TaskItemProps> = ({ isCompleted, points, children }) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ backgroundColor: "rgba(234, 179, 8, 0.1)" }}
      className="p-3 sm:p-4 flex items-center"
    >
      <div className={`min-w-[28px] h-7 sm:min-w-[32px] sm:h-8 flex items-center justify-center rounded-full ${isCompleted ? 'bg-yellow-400' : 'bg-gray-800'} mr-2 sm:mr-4`}>
        {isCompleted ? (
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
        {children}
      </div>
      <div className="ml-2 sm:ml-4 flex items-center text-yellow-400 whitespace-nowrap">
        <Zap size={14} className="mr-1 sm:h-4 sm:w-4" />
        <span className="font-bold text-xs sm:text-sm">{points}</span>
      </div>
    </motion.div>
  );
};

export default TaskItem;