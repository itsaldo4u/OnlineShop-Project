import React, { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { Trash2, Edit, RefreshCw } from "lucide-react";

const UsersTable = () => {
  const { Users, fetchUsers, deleteUser, updateUserRole } = useAppContext();

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = (userId: number, newRole: string) => {
    if (newRole === "admin" || newRole === "user") {
      updateUserRole(userId, newRole);
    } else {
      console.warn("Roli i papranueshëm:", newRole);
    }
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-white">Lista e Përdoruesve</h2>
        <button
          className="btn btn-primary"
          onClick={fetchUsers}
          title="Rifresko"
          aria-label="Rifresko lista e përdoruesve"
        >
          <RefreshCw className="mr-2" size={16} /> Rifresko
        </button>
      </div>
      <div
        className="table-responsive rounded shadow-sm"
        style={{ overflowX: "auto" }}
      >
        <table className="table table-hover table-bordered align-middle text-white">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Emri</th>
              <th>Email</th>
              <th>Roli</th>
              <th>Veprime</th>
            </tr>
          </thead>
          <tbody>
            {!Users || Users.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center">
                  Nuk ka përdorues për të shfaqur
                </td>
              </tr>
            ) : (
              Users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <select
                      className="form-select"
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user.id, e.target.value)
                      }
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger me-2"
                      onClick={() => deleteUser(user.id)}
                      title="Fshi përdoruesin"
                      aria-label={`Fshi përdoruesin ${user.name}`}
                    >
                      <Trash2 size={16} /> Fshi
                    </button>
                    <button
                      className="btn btn-sm btn-secondary"
                      title="Ndrysho rolin"
                      aria-label={`Ndrysho rolin e përdoruesit ${user.name}`}
                      onClick={() => {
                        const newRole = prompt(
                          "Shkruani rolin e ri për këtë përdorues (admin ose user):",
                          user.role || ""
                        );
                        if (newRole === "admin" || newRole === "user") {
                          handleRoleChange(user.id, newRole);
                        } else if (newRole !== null) {
                          alert("Roli duhet të jetë 'admin' ose 'user'.");
                        }
                      }}
                    >
                      <Edit size={16} /> Ndrysho Rolin
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
