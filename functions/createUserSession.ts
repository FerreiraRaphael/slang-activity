export interface Activity {
  id: number;
  user_id: string;
  first_seen_at: string;
  answered_at: string;
}

export interface UserSession {
  ended_at: string;
  started_at: string;
  activity_ids: number[];
  duration_seconds: number;
}

export interface GroupedUserSession {
  [userId: string]: Array<UserSession>
}


export function createUserSession(activities: Activity[]): GroupedUserSession {
  return {};
}
