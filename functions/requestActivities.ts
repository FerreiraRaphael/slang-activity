import { AxiosError } from "axios";
import { fetch, handleApiCommonErrors } from "../fetch";
import { Activity } from "./createUserSession";

export async function requestActivities() {
  try {
    const response = await fetch.get<{ activities: Activity[]}>('activities');
    return response.data.activities;
  } catch(e) {
    throw handleApiCommonErrors(e as AxiosError);
  }
}
