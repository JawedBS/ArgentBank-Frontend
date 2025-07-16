import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, updateUserProfile } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import BalanceAccount from "../components/BalanceAccount";
import EditUserInfo from "../components/EditUserInfo";

function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // On récupère l’état global du store : token, infos utilisateur, statut de chargement ou d’erreur
  const { user, token, loading, error } = useSelector((state) => state.auth);

  // Mode édition du pseudo (permet de basculer entre affichage et formulaire)
  const [editMode, setEditMode] = useState(false);

  // Dès le chargement du composant
  useEffect(() => {
    // Si aucun token, l’utilisateur est redirigé vers la page de connexion
    if (!token) {
      navigate("/signin");
    }

    // Si un token est présent mais aucune info utilisateur dans le store, on les récupère depuis l’API
    if (token && !user) {
      dispatch(fetchUserProfile());
    }
  }, [token, user, dispatch, navigate]);

  // Fonction appelée lors de la validation du nouveau pseudo
  const handleSave = (newUserName) => {
    dispatch(updateUserProfile(newUserName)).then(() => {
      // Une fois la mise à jour faite, on quitte le mode édition
      setEditMode(false);
    });
  };

  // Annulation de la modification
  const handleCancel = () => setEditMode(false);

  // Affichage en fonction du statut de chargement ou d’erreur
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main className="main bg-dark">
      {!editMode ? (
        <>
          {/* Affichage des infos utilisateur si on n’est pas en mode édition */}
          <h1>
            Welcome Back,<br />{user?.firstName} {user?.lastName}
          </h1>
          <button className="edit-button" onClick={() => setEditMode(true)}>
            Edit name
          </button>
        </>
      ) : (
        // Si en mode édition, affichage du formulaire de modification
        <EditUserInfo
          currentUser={user}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      {/* Affichage des comptes utilisateurs (statique dans cet exemple) */}
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
