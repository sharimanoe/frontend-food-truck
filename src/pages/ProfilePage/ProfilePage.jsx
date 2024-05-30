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

  if (!user) return <p>User data not found</p>;

  return (
    <div class="bg-gray-100 dark:bg-gray-900">
      <div class="w-full max-w-3xl mx-auto p-8">
        <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">
          <h1 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Profile:
          </h1>

          <div class="mb-6">
            <div class="mt-4">
              <label
                for="address"
                class="block text-gray-700 dark:text-white mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>
            <div class="mt-4">
              <label
                for="address"
                class="block text-gray-700 dark:text-white mb-1"
              >
                Mail
              </label>
              <input
                type="text"
                id="address"
                class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>
            <div class="mt-4">
              <label
                for="address"
                class="block text-gray-700 dark:text-white mb-1"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>

            <div class="mt-4">
              <label
                for="city"
                class="block text-gray-700 dark:text-white mb-1"
              >
                Phone
              </label>
              <input
                type="text"
                id="phone"
                class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!editing}
              />
            </div>

            <div class="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label
                  for="state"
                  class="block text-gray-700 dark:text-white mb-1"
                >
                  Bio
                </label>
                <input
                  type="text"
                  id="bio"
                  class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
              <div>
                <label
                  for="zip"
                  class="block text-gray-700 dark:text-white mb-1"
                >
                  Avatar
                </label>
                <input
                  type="text"
                  id="avatar"
                  class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </div>
            </div>
          </div>
          {editing ? (
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-700 dark:bg-teal-600 dark:text-white dark:hover:bg-teal-900"
            >
              Save
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-700 dark:bg-teal-600 dark:text-white dark:hover:bg-teal-900"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
