import { getDateDiffSeconds } from "./getDateDiff";

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
  [userId: string]: Array<UserSession>;
}

const FIVE_MINUTES = 60 * 5 // In seconds.

function createUserSession(activity: Activity): UserSession {
  const startDate = new Date(activity.first_seen_at);
  const endDate = new Date(activity.answered_at);
  return {
    activity_ids: [activity.id],
    ended_at: activity.answered_at,
    started_at: activity.first_seen_at,
    duration_seconds: getDateDiffSeconds(startDate, endDate),
  };
}

function addActivityToUserSession(userSession: UserSession, activity: Activity): UserSession {
  const startDate = new Date(userSession.started_at);
  const endDate = new Date(activity.answered_at);
  return {
    ...userSession,
    activity_ids: [...userSession.activity_ids, activity.id],
    ended_at: activity.answered_at,
    duration_seconds: getDateDiffSeconds(startDate, endDate),
  }
}

export function createGroupedUserSessions(activities: Activity[]): GroupedUserSession {
  const groupedUserSessions: GroupedUserSession = {};
  for (let index = 0; index < activities.length; index++) {
    const activity = activities[index];
    const userSessions = groupedUserSessions[activity.user_id];
    if (userSessions) {
      const lastUserSession = userSessions[userSessions.length - 1];
      const sessionEndedAt = new Date(lastUserSession.ended_at);
      const activityStartedAt = new Date(activity.first_seen_at);
      const isMoreThenFiveMin = getDateDiffSeconds(sessionEndedAt, activityStartedAt) > FIVE_MINUTES;
      if (isMoreThenFiveMin) {
        // add new session
        userSessions.push(createUserSession(activity));
      } else {
        // add to session
        userSessions[userSessions.length - 1] = addActivityToUserSession(lastUserSession, activity);
      }
    } else {
      // create new user session
      groupedUserSessions[activity.user_id] = [createUserSession(activity)];
    }
  }
  return groupedUserSessions;
}
