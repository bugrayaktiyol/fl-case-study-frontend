import { config } from './config';

export async function getUsers() {

  const response = await fetch(`${config.baseURL}/api/users`);
  const data = await response.json();
  return data
  
}

export async function createUser(userData: any) {
  const response = await fetch(`${config.baseURL}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  return data;
}

export async function updateUser(id: string, updatedUserData: any) {
  const response = await fetch(`${config.baseURL}/api/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedUserData),
  });
  const data = await response.json();
  return data;
}

export async function deleteUser(id: string) {
  const response = await fetch(`${config.baseURL}/api/users/${id}`, {
    method: 'DELETE',
  });
  return response.ok;
}