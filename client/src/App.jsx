import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  // Fetch users
  const fetchUsers = async () => {
    const { data } = await axios.get("http://localhost:5000/user/");
    console.log("------------------------", data.data);
    setUsers(data.data);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  ///Delete Useer
  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/user/${id}`);
    fetchUsers();
  };
  ///Update user
  const [editId, setEditId] = useState(null);
  const handleEdit = (user) => {
    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
    setEmail(user.email || "");
    setPhone(user.phone) || "";
    setPassword(user.password) || "";
    setEditId(user._id);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await axios.put(`http://localhost:5000/user/${editId}`, {
        firstName,
        lastName,
        email,
        phone,
        password,
      });
      setEditId(null);
    } else {
      await axios.post("http://localhost:5000/user/", {
        firstName,
        lastName,
        email,
        phone,
        password,
      });
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setPassword("");

    fetchUsers();
  };

  return (
    <div className="container py-5">
      <div className="card border-0 shadow-lg rounded-4 mb-5">
        <div className="card-body p-5">
          <h2 className="text-center mb-4 fw-bold text-primary">
            Add New User
          </h2>

          <form className="row g-4" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <label className="form-label fw-semibold">First Name</label>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter first name"
                value={firstName || ""}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Last Name</label>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter last name"
                value={lastName || ""}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Enter email"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Phone</label>
              <input
                type="tel"
                className="form-control form-control-lg"
                placeholder="Enter phone number"
                value={phone || ""}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Enter password"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="col-12 text-center mt-3">
              <button
                type="submit"
                className="btn btn-primary btn-lg px-5 shadow-sm"
              >
                {editId ? "Update User" : "Add User"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card border-0 shadow-lg rounded-4">
        <div className="card-body p-4">
          <h3 className="text-center mb-4 fw-bold text-secondary">User List</h3>

          <div className="table-responsive">
            <table className="table table-hover align-middle text-center">
              <thead className="table-primary">
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th style={{ width: "120px" }}>Action</th>
                </tr>
              </thead>

              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-muted py-4">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user._id}>
                      <td className="fw-semibold">{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <button
                          className="btn btn-outline-info btn-sm px-2"
                          onClick={() => handleEdit(user)}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm px-2"
                          onClick={() => deleteUser(user._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
