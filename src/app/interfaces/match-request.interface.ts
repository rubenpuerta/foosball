export interface MatchRequest {
  id?: string;
  expired: boolean;
  matchName: string;
  players: any[];
  matchOwnerEmail?: any;
  startedAt?: number;
  createdAt: number;
}
