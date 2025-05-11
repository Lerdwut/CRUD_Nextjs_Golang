import { useEffect, useState } from "react";
import { getUsers, deleteUser, User } from "../services/api";
import { useRouter } from "next/router";

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>User List</h1>
      <button onClick={() => router.push("/create")}>➕ Create User</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email}) - Age: {user.age}{" "}
            <button onClick={() => router.push(`/edit/${user.id}`)}>✏️</button>
            <button onClick={() => handleDelete(user.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
