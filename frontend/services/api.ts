import axios from "axios";

const API_BASE = "http://localhost:3001";

export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

export const getUsers = async () => {
  const res = await axios.get<User[]>(`${API_BASE}/users`);
  return res.data;
};

export const createUser = async (user: Omit<User, "id">) => {
  const res = await axios.post(`${API_BASE}/users`, user);
  return res.data;
};

export const updateUser = async (id: number, user: Omit<User, "id">) => {
  const res = await axios.put(`${API_BASE}/users/${id}`, user);
  return res.data;
};

export const deleteUser = async (id: number) => {
  const res = await axios.delete(`${API_BASE}/users/${id}`);
  return res.data;
};
