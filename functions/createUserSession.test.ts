import { Activity, GroupedUserSession, createUserSession } from './createUserSession';

describe('createUserSession function', () => {
  const activities: Activity[] = [
    {
      "id": 96272,
      "user_id": "1nqfprq4",
      "first_seen_at": "2022-02-12T02:53:58.598+00:00",
      "answered_at": "2022-02-12T02:54:15.598+00:00"
    },
    {
      "id": 254232,
      "user_id": "1nqfprq4",
      "first_seen_at": "2022-02-12T02:58:59.598+00:00",
      "answered_at": "2022-02-12T02:59:06.598+00:00"
    },
    {
      "id": 102107,
      "user_id": "1nqfprq4",
      "first_seen_at": "2022-02-12T03:04:27.598+00:00",
      "answered_at": "2022-02-12T03:04:40.598+00:00"
    },
    {
      "id": 84322,
      "user_id": "967o94ff",
      "first_seen_at": "2022-02-12T00:05:26.598+00:00",
      "answered_at": "2022-02-12T00:05:42.598+00:00"
    },
  ];
  it('Creates the expected user sessions', () => {
    const result: GroupedUserSession = {
      "1nqfprq4": [{
        activity_ids: [96272, 254232],
        duration_seconds: 0,
        started_at: "2022-02-12T02:53:58.598+00:00",
        ended_at: "2022-02-12T02:59:06.598+00:00",
      }, {
        activity_ids: [102107],
        duration_seconds: 0,
        started_at: "2022-02-12T03:04:27.598+00:00",
        ended_at: "2022-02-12T03:04:40.598+00:00",
      }],
      "967o94ff": [{
        activity_ids: [102107],
        duration_seconds: 0,
        started_at: "2022-02-12T03:04:27.598+00:00",
        ended_at: "2022-02-12T03:04:40.598+00:00",
      }]
    }
    expect(createUserSession(activities)).toBe(result);
  })
})
