import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/profile.css";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [editName, setEditName] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://unimart-backend-r87y.onrender.com/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setName(data.name);
      });
  }, []);

  // ✅ SAVE NAME TO BACKEND
  const handleSave = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("https://unimart-backend-r87y.onrender.com/api/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });

    const data = await res.json();

    if (res.ok) {
      setProfile((prev) => ({ ...prev, name: data.name }));
      setEditName(false);
    } else {
      alert(data.message || "Failed to update name");
    }
  };

  if (!profile) {
    return <p style={{ color: "white", textAlign: "center" }}>Loading...</p>;
  }

  return (
    <>
      <Navbar />

      <section className="profile-page">
        <div className="profile-card">
          <h1>My Profile</h1>

          {/* NAME */}
          <div className="profile-row">
            <span>Name</span>
            {editName ? (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <p>{profile.name}</p>
            )}

            <button onClick={editName ? handleSave : () => setEditName(true)}>
              {editName ? "Save" : "Edit"}
            </button>
          </div>

          {/* EMAIL */}
          <div className="profile-row">
            <span>Email</span>
            <p className="locked">{profile.email}</p>
          </div>

          {/* MEMBER SINCE */}
          <div className="profile-row">
            <span>Member since</span>
            <p>{new Date(profile.createdAt).toDateString()}</p>
          </div>

          <hr />

          {/* STATS */}
          <div className="stats">
            <div>
              <h3>{profile.totalProducts}</h3>
              <p>Total Products</p>
            </div>

            <div>
              <h3>{profile.activeListings}</h3>
              <p>Active Listings</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;

