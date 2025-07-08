import { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { Trash2, Edit, RefreshCw } from "lucide-react";

const UsersTable = () => {
  const { Users, fetchUsers, deleteUser, updateUserRole } = useAppContext();

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = (userId: string, newRole: string) => {
    if (newRole === "admin" || newRole === "user") {
      updateUserRole(userId, newRole);
    } else {
      console.warn("Invalid role:", newRole);
    }
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-white">Users List</h2>
        <button
          className="btn btn-primary"
          onClick={fetchUsers}
          title="Refresh"
          aria-label="Refresh users list"
        >
          <RefreshCw className="mr-2" size={16} /> Refresh
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
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!Users || Users.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center">
                  No users to display
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
                      title="Delete user"
                      aria-label={`Delete user ${user.name}`}
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                    <button
                      className="btn btn-sm btn-secondary"
                      title="Change role"
                      aria-label={`Change role of user ${user.name}`}
                      onClick={() => {
                        const newRole = prompt(
                          "Enter the new role for this user (admin or user):",
                          user.role || ""
                        );
                        if (newRole === "admin" || newRole === "user") {
                          handleRoleChange(user.id, newRole);
                        } else if (newRole !== null) {
                          alert("Role must be 'admin' or 'user'.");
                        }
                      }}
                    >
                      <Edit size={16} /> Change Role
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
