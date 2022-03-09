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

const FIVE_MINUTES = 5 * 60 // In seconds.

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
    activity_ids: [activity.id, ...userSession.activity_ids],
    ended_at: activity.answered_at,
    duration_seconds: getDateDiffSeconds(startDate, endDate),
  }
}

export function createGroupedUserSessions(activities: Activity[]): GroupedUserSession {
  const groupedUserSessions: GroupedUserSession = {};
  /*
    Since the api returns the activities sorted by used_id and first_seen_at.
    We can assume that grouped user sessions will be sorted by started_at as well.
    Since I wanted the user_sessions to be sorted in descending order I'm adding
    the most recent activities to the begging of the sessions array. If I wanted
    it in the ascending order I could add the most recent activities to the end
    of the array.
    So only one loop is necessary to create the sessions.
    The complexity is O(N)—Linear Time.
  */
  for (let index = 0; index < activities.length; index++) {
    const activity = activities[index];
    const userSessions = groupedUserSessions[activity.user_id];
    if (userSessions) {
      const mostRecentUserSession = userSessions[0];
      const sessionEndedAt = new Date(mostRecentUserSession.ended_at);
      const activityStartedAt = new Date(activity.first_seen_at);
      const isMoreThenFiveMin = getDateDiffSeconds(sessionEndedAt, activityStartedAt) > FIVE_MINUTES;
      if (isMoreThenFiveMin) {
        // add new session
        groupedUserSessions[activity.user_id] = [createUserSession(activity), ...userSessions];
      } else {
        // add to session
        userSessions[0] = addActivityToUserSession(mostRecentUserSession, activity);
      }
    } else {
      // create new user session
      groupedUserSessions[activity.user_id] = [createUserSession(activity)];
    }
  }
  return groupedUserSessions;
}
