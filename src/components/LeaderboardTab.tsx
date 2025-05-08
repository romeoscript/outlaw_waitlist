"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
    LeaderboardListCount,
    LeaderboardUserPosition,
    LeaderboardPageData
 } from "@/app/actions";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type LeaderboardEntry = {
  id: string;
  user: string;
  invitedCount: number;
  points: number;
};

const ITEMS_PER_PAGE = 50;
//const [isLoading, setIsLoading] = useState(false);

export default function LeaderboardTab() {
  // setup pagination here
  const [currentPage, setCurrentPage] = useState(1);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  );
  //setIsLoading(true);
  // setup supabase here
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const supabase = createClient();
  const [totalUsers, setTotalUsers] = useState(0);
  const [userPosition, setUserPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      // Fetch the logged in user data
      setIsLoading(true);
      try{
        const { data: userData, error: userFetchError } =
          await supabase.auth.getUser();
        if (userFetchError) {
          console.error("Error fetching user data:", userFetchError);
          return;
        }

        setLoggedInUser(userData.user);

        const count = await LeaderboardListCount();
        // Update the total number of users
        setTotalUsers(count || 0);

        // Fetch the user's position
        const positionData = await LeaderboardUserPosition();
        if (positionData === null) {
            return;
        }
        // Find the user's position
        const userPositionIndex =
          positionData.findIndex((entry) => entry.id === userData.user?.id) + 1;
        setUserPosition(userPositionIndex);

        // Fetch top 50 accounts based on current page
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE - 1;
        const pageData = await LeaderboardPageData(startIndex, endIndex);
        if (pageData === null) {
            return;
        }

        // Map the data to the leaderboard entries
        const leaderboardEntries = pageData.map((entry: any) => ({
          id: entry.id,
          user: entry.twitter_handle,
          invitedCount: entry.invited_accounts_count,
          points: entry.total_points,
        }));
        setLeaderboardData(leaderboardEntries);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      } finally {
        setIsLoading(false);
      }
    }
      

    fetchLeaderboardData();
  }, [supabase, currentPage]);
  
  const currentData = leaderboardData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Handle pagination change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center pt-24">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-points"></div>
      </div>
    );
  }

  return (
    <Card className="bg-black bg-opacity-90 border-2 border-yellow-400 shadow-[0_0_15px_rgba(255,215,0,0.3)]">
      <CardContent>
        <CardTitle className="px-4 text-center mt-6 font-semibold text-lg text-yellow-400">
          Your Position : {userPosition}/{totalUsers}
        </CardTitle>
      </CardContent>
      <CardContent>
        <div className="bg-black p-2 w-full mx-auto rounded-lg shadow-none">
          <Table className="bg-black">
            <TableHeader>
              <TableRow className="border-b border-yellow-400/20">
                <TableHead className="text-yellow-400">Place</TableHead>
                <TableHead className="text-yellow-400">User</TableHead>
                <TableHead className="text-yellow-400">Invited Count</TableHead>
                <TableHead className="text-yellow-400">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((entry: LeaderboardEntry, index: number) => (
                <TableRow
                  key={entry.id}
                  className={`border-b border-gray-800 hover:bg-black/50 ${
                    entry.id === loggedInUser?.id ? "bg-yellow-400/10" : ""
                  }`}
                >
                  <TableCell className="text-white">{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</TableCell>
                  <TableCell className="text-white">{entry.user}</TableCell>
                  <TableCell className="text-white">{entry.invitedCount}</TableCell>
                  <TableCell className="text-yellow-400 font-bold">{entry.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      {/* Pagination component here */}
    </Card>
  );
}
