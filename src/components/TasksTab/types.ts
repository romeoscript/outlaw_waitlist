export interface UserData {
    invitation_code: string;
    points: number;
    level: number;
    total_points: number;
    invited_accounts_count: number;
    principal_id?: string;
  }
  
  export interface Point {
    amount: number;
    note: string;
    created_at: string;
  }
  
  export type PointsList = Point[];
  
  export interface TaskStatusProps {
    isTwitterFollowed: boolean;
    isTwitterIIFollowed: boolean;
    isTwitterIIIFollowed: boolean;
    isDiscordJoined: boolean;
    isTelegramJoined: boolean;
    isTelegramIIJoined: boolean;
    isSolanaWalletConnected: boolean;
    refreshTwitterFollowStatus: () => Promise<void>;
    refreshTwitterIIFollowStatus: () => Promise<void>;
    refreshTwitterIIIFollowStatus: () => Promise<void>;
    refreshDiscordJoinStatus: () => Promise<void>;
    refreshTelegramJoinStatus: () => Promise<void>;
    refreshTelegramIIJoinStatus: () => Promise<void>;
    triggerRewardAnimation: (message: string) => void;
  }
  
  // Animation variants
  export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  export const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };