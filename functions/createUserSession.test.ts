import { Activity, GroupedUserSession, createGroupedUserSessions } from './createUserSession';

describe('createUserSession function', () => {
  it('Creates new session if interval is bigger then 5 minutes', () => {
    const activities = [{
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
    }];
    const result = {
      "1nqfprq4": [{
        activity_ids: [102107],
        duration_seconds: 13,
        started_at: "2022-02-12T03:04:27.598+00:00",
        ended_at: "2022-02-12T03:04:40.598+00:00",
      }, {
        activity_ids: [254232],
        duration_seconds: 7,
        started_at: "2022-02-12T02:58:59.598+00:00",
        ended_at: "2022-02-12T02:59:06.598+00:00",
      }],
    };

    expect(createGroupedUserSessions(activities)).toStrictEqual(result);
  });

  it('Groups by user id', () => {
    const activities = [{
      "id": 254232,
      "user_id": "1nqfprq4",
      "first_seen_at": "2022-02-12T02:58:59.598+00:00",
      "answered_at": "2022-02-12T02:59:06.598+00:00"
    },
    {
      "id": 84322,
      "user_id": "967o94ff",
      "first_seen_at": "2022-02-12T00:05:26.598+00:00",
      "answered_at": "2022-02-12T00:05:42.598+00:00"
    }];
    const result = {
      "1nqfprq4": [{
        activity_ids: [254232],
        duration_seconds: 7,
        started_at: "2022-02-12T02:58:59.598+00:00",
        ended_at: "2022-02-12T02:59:06.598+00:00",
      }],
      "967o94ff": [{
        activity_ids: [84322],
        duration_seconds: 16,
        started_at: "2022-02-12T00:05:26.598+00:00",
        ended_at: "2022-02-12T00:05:42.598+00:00"
      }],
    };
    expect(createGroupedUserSessions(activities)).toStrictEqual(result);
  });

  it('Creates the expected user sessions', () => {
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
    const result: GroupedUserSession = {
      "1nqfprq4": [{
        activity_ids: [102107],
        duration_seconds: 13,
        started_at: "2022-02-12T03:04:27.598+00:00",
        ended_at: "2022-02-12T03:04:40.598+00:00",
      }, {
        activity_ids: [254232, 96272],
        duration_seconds: 308,
        started_at: "2022-02-12T02:53:58.598+00:00",
        ended_at: "2022-02-12T02:59:06.598+00:00",
      }],
      "967o94ff": [{
        activity_ids: [84322],
        duration_seconds: 16,
        started_at: "2022-02-12T00:05:26.598+00:00",
        ended_at: "2022-02-12T00:05:42.598+00:00"
      }]
    }
    expect(createGroupedUserSessions(activities)).toStrictEqual(result);
  });
})
