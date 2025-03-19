import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import BalanceAccount from "../components/BalanceAccount";

function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(" Utilisateur dans Redux :", user);
    if (!token) {
      navigate("/signin"); // Redirige si non connecté
    } else {
      dispatch(fetchUserProfile()); // Charge les infos de l'utilisateur
    }
  }, [token, dispatch, navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main className="main bg-dark">
      <h1>Welcome Back, </h1>
      
      <button className="edit-button">Edit name</button>
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
