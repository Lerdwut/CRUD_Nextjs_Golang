const API_URL = "http://localhost:3001"

export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

export async function getUsers(): Promise<User[]> {
  const res = await fetch(`${API_URL}/users`);
  return res.json();
}

export async function getUser(id: number): Promise<User> {
  const res = await fetch(`${API_URL}/users/${id}`);
  return res.json();
}

export async function createUser(user: Omit<User, "id">) {
  return await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
}

export async function updateUser(id: number, user: Omit<User, "id">) {
  return await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
}

export async function deleteUser(id: number) {
  return await fetch(`${API_URL}/users/${id}`, { method: "DELETE" });
}
