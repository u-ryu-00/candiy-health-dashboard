import axios from 'axios';

import { AuthPayload, CheckupResultPayload } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const CANDIY_API_KEY = process.env.NEXT_PUBLIC_CANDIY_API_KEY;

const clientAxios = axios.create({
  timeout: 300000,
});

export async function requestAuth(
  payload: AuthPayload,
) {
  const url = `${API_BASE_URL}/candiy/nhis/checkup`;

  const { data } = await clientAxios.post(url, payload, {
    headers: {
      'x-api-key': CANDIY_API_KEY,
    },
  });

  if (data.error) {
    throw new Error(data.error.message);
  }

  return data;
}

export async function fetchCheckupResult(
  payload: CheckupResultPayload,
) {
  const url = `${API_BASE_URL}/candiy/nhis/checkup`;

  const { data } = await clientAxios.post(url, payload, {
    headers: {
      'x-api-key': CANDIY_API_KEY,
    },
  });

  if (data.error) {
    throw new Error(data.error.message);
  }

  return data;
}
