import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, updateUserProfile } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import BalanceAccount from "../components/BalanceAccount";
import EditUserInfo from "../components/EditUserInfo"; 

function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Récupération des données utilisateur depuis Redux
  const { user, token, loading, error } = useSelector((state) => state.auth);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    console.log(" Vérification du token :", token);
    console.log(" Utilisateur avant mise à jour :", user);

    if (!token) {
      navigate("/signin"); // Redirige vers la page de connexion si non connecté
    } else if (!user) {
      console.log(" Dispatch de fetchUserProfile()");
      dispatch(fetchUserProfile()); // Récupère les données utilisateur
    }
  }, [token, user, dispatch, navigate]);

  const handleSave = (newUserName) => {
    dispatch(updateUserProfile(newUserName)).then(() => {
      dispatch(fetchUserProfile()); // Rafraîchir les données
      setEditMode(false);
    });
  };

  const handleCancel = () => setEditMode(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main className="main bg-dark">
       {!editMode ? (
        <>
          <h1> Welcome Back,<br />{user?.firstName} {user?.lastName} </h1>
          <button className="edit-button" onClick={() => setEditMode(true)}>
            Edit name
          </button>
        </>
          ) : (
            <EditUserInfo
              currentUser={user}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          )}
      <section className="accounts">
        <BalanceAccount
          title="Argent Bank Checking (x8349)"
          balance="2,082.79"
          description="Available Balance"
        />
        <BalanceAccount
          title="Argent Bank Savings (x6712)"
          balance="10,928.42"
          description="Available Balance"
        />
        <BalanceAccount
          title="Argent Bank Credit Card (x8349)"
          balance="184.30"
          description="Current Balance"
        />
      </section>
    </main>
  );
}

export default UserProfile;
