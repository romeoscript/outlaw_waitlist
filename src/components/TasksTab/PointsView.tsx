import React from "react";
import { motion } from "framer-motion";
import { DollarSign, Lock } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { PointsList, UserData, containerVariants, itemVariants } from "./types";

interface PointsViewProps {
  pointsList: PointsList | null;
  userPointsTotal: number;
}

const PointsView: React.FC<PointsViewProps> = ({ pointsList, userPointsTotal }) => {
  return (
    <div className="p-3 sm:p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-black bg-opacity-90 p-3 sm:p-5 rounded-xl border-2 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
      >
        <motion.div variants={itemVariants} className="flex justify-between items-center mb-3 sm:mb-4">
          <div>
            <div className="flex items-center">
              <span className="mr-2 text-amber-500 font-bold">📜</span>
              <h3 className="text-base sm:text-lg font-bold text-amber-400">Mission Log</h3>
            </div>
            <p className="text-white/70 text-[10px] sm:text-xs mt-0.5 sm:mt-1">Your outlaw activity and loot history</p>
          </div>
          <div className="bg-black py-1 px-2 sm:px-3 rounded-full text-white font-bold border border-amber-500 text-xs sm:text-base">
            <span className="text-amber-500">{userPointsTotal}</span> tokens
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader className="bg-black">
              <TableRow className="border-b border-amber-500/20">
                <TableHead className="text-amber-400 font-bold text-xs sm:text-sm p-2 sm:p-4">Points</TableHead>
                <TableHead className="text-amber-400 font-bold text-xs sm:text-sm p-2 sm:p-4">Activity</TableHead>
                <TableHead className="text-amber-400 font-bold text-xs sm:text-sm p-2 sm:p-4 hidden md:table-cell">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-black">
              {pointsList && pointsList.length > 0 ? (
                pointsList.map((point, index) => (
                  <TableRow key={index} className="border-b border-gray-800 hover:bg-black/50">
                    <TableCell className="font-medium text-amber-400 text-xs sm:text-sm p-2 sm:p-4">+{point.amount}</TableCell>
                    <TableCell className="text-white text-xs sm:text-sm p-2 sm:p-4">{point.note}</TableCell>
                    <TableCell className="hidden md:table-cell text-white/50 text-xs sm:text-sm p-2 sm:p-4">
                      {new Date(point.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-6 sm:py-8 text-white/50 text-xs sm:text-sm">
                    <div className="flex flex-col items-center">
                      <Lock className="h-6 w-6 sm:h-8 sm:w-8 mb-2 text-amber-400/30" />
                      <span>No points activity yet. Complete tasks to earn points!</span>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-3 sm:mt-4 text-white/50 text-xs sm:text-sm text-center">
          Complete more missions to join the Outlaws !
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PointsView;