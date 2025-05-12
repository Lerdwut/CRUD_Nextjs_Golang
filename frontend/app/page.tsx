'use client';

import { useEffect, useState } from "react";
import {
  User,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../services/api";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState({ name: "", email: "", age: 0 });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (editingId) {
      await updateUser(editingId, form);
    } else {
      await createUser(form);
    }

    setForm({ name: "", email: "", age: 0 });
    setEditingId(null);
    fetchUsers();
  };

  const handleEdit = (user: User) => {
    setForm({ name: user.name, email: user.email, age: user.age });
    setEditingId(user.id);
  };

  const handleDelete = async (id: number) => {
    if (confirm("แน่ใจว่าจะลบผู้ใช้นี้?")) {
      await deleteUser(id);
      fetchUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📋 จัดการผู้ใช้</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        <input
          className="border px-3 py-2 rounded w-full md:w-auto"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border px-3 py-2 rounded w-full md:w-auto"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="number"
          className="border px-3 py-2 rounded w-full md:w-auto"
          placeholder="Age"
          value={form.age}
          onChange={(e) =>
            setForm({ ...form, age: parseInt(e.target.value || "0") })
          }
        />
        <button
          className={`px-4 py-2 rounded text-white ${
            editingId ? "bg-yellow-500" : "bg-blue-500"
          }`}
          onClick={handleSubmit}
        >
          {editingId ? "Update" : "Add"}
        </button>
        {editingId && (
          <button
            className="px-4 py-2 rounded bg-gray-500 text-white"
            onClick={() => {
              setForm({ name: "", email: "", age: 0 });
              setEditingId(null);
            }}
          >
            Cancel
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Age</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-4">กำลังโหลด...</td>
              </tr>
            ) : users && users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{user.id}</td>
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.age}</td>
                  <td className="py-2 px-4 border-b flex gap-2">
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">ไม่มีข้อมูล</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}