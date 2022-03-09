import axios, { AxiosError } from 'axios';

export const fetch = axios.create({
  baseURL: 'https://api.slangapp.com/challenges/v1/',
  headers: {
    'Authorization': `Basic ${process.env.SLANG_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export function handleApiCommonErrors(e: AxiosError) {
  switch(e.response?.status) {
    case 400:
      return new Error('Http error: 400, user input error, check your request body.');
    case 401:
      return new Error('Http error: 401, unauthorized, check if the SLANG_API_TOKEN is set at the .env file.');
    case 429:
      return new Error('Http error: 429, too many requests, please try again later');
    default:
      return new Error('Unknown error, please try again later');
  }
}


