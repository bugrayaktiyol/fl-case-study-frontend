import { config } from './config';

export async function getUser(id: string) {
  const response = await fetch(`${config.baseURL}/api/users/${id}`);
  const data = await response.json();
  return data;
}