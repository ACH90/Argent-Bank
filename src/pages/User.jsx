import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  updateUserProfile,
} from "../features/user/userSlice";

const User = () => {
  const dispatch = useDispatch();
  const { userData, status, error } = useSelector((state) => state.user);

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    // Vérifie si un token est présent et si les données utilisateur ne sont pas déjà chargées
    const token = localStorage.getItem("token");
    if (token && !userData) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, userData]);

  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstName || "");
      setLastName(userData.lastName || "");
    }
  }, [userData]);

  const handleSave = () => {
    dispatch(updateUserProfile({ firstName, lastName }));
    setIsEditing(false);
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  // Vérification si userData existe avant de tenter d'y accéder
  if (!userData) {
    return <p>No user data available</p>;
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {userData.firstName ? userData.firstName : ""}{" "}
          {userData.lastName || ""}!
        </h1>
        {isEditing ? (
          <div>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          <button onClick={() => setIsEditing(true)} className="edit-button">
            Edit Name
          </button>
        )}
      </div>

      <h2 className="sr-only">Accounts</h2>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>

      {/* ... les autres comptes ... */}
    </main>
  );
};

export default User;
