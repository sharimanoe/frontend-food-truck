import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProfilePage.css";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    address: "",
    phone: "",
    bio: "",
    avatar: "",
  });
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get("http://localhost:5005/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        setFormData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, [token]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5005/auth/user/${user._id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        setEditing(false);
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="user-detail">
      <h1>User Detail</h1>
      {editing ? (
        <form onSubmit={handleSubmit} className="user-form">
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </label>
          <label>
            Bio:
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            ></textarea>
          </label>
          <label>
            Avatar URL:
            <input
              type="text"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <div className="user-card">
          <img
            src={user.avatar || "/client/src/assets/defaultUser.png"}
            alt={`${user.name}'s avatar`}
            className="user-avatar"
          />
          <h2>{user.name}</h2>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Address:</strong> {user.address}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Bio:</strong> {user.bio}
          </p>
          <button onClick={() => setEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
