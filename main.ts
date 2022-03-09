import 'dotenv/config';
import { createGroupedUserSessions } from './functions/createUserSession';
import { postGroupedUserSessions } from './functions/postGroupedUserSessions';
import { requestActivities } from "./functions/requestActivities";


async function main() {
  try {
    console.log('Fetching activities.');
    const activities = await requestActivities();
    console.log(`${activities.length} Activities fetched.`);
    const groupedUserSessions = createGroupedUserSessions(activities);
    console.log('Created user sessions.', JSON.stringify(groupedUserSessions, null, 2));
    await postGroupedUserSessions(groupedUserSessions);
    console.log('User sessions posted.');
  } catch (e) {
    console.log('Ops... something went wrong', e);
  }
}

main();
