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

  // Nouveaux états pour les inputs du formulaire
  const [inputFirstName, setInputFirstName] = useState("");
  const [inputLastName, setInputLastName] = useState("");

  useEffect(() => {
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
    dispatch(
      updateUserProfile({ firstName: inputFirstName, lastName: inputLastName })
    );
    setFirstName(inputFirstName); // mettre à jour les noms affichés
    setLastName(inputLastName);
    setInputFirstName(""); // vider les inputs
    setInputLastName("");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setInputFirstName("");
    setInputLastName("");
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  if (!userData) {
    return <p>No user data available</p>;
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {firstName} {lastName}!
        </h1>
        {isEditing ? (
          <div className="editForm">
            <div>
              <input
                type="text"
                value={inputFirstName}
                placeholder="First Name"
                onChange={(e) => setInputFirstName(e.target.value)}
              />
              <input
                type="text"
                value={inputLastName}
                placeholder="Last Name"
                onChange={(e) => setInputLastName(e.target.value)}
              />
            </div>
            <div>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        ) : (
          <button onClick={handleEdit} className="edit-button">
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
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
};

export default User;
