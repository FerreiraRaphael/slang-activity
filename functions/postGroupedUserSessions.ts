import { fetch, handleApiCommonErrors } from "../fetch";
import { GroupedUserSession } from "./createUserSession";

export async function postGroupedUserSessions(groupedUserSessions: GroupedUserSession) {
  return fetch.post('activities/sessions', {
    user_sessions: groupedUserSessions,
  }).catch(handleApiCommonErrors);
}
