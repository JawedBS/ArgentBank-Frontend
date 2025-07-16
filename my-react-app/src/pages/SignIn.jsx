import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // On récupère le statut global depuis le store (chargement et erreur)
  const { loading, error } = useSelector((state) => state.auth);

  // États locaux pour les champs du formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Fonction appelée lors de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    try {
      // Dispatch de l’action de connexion avec les identifiants
      const result = await dispatch(loginUser({ email, password }));

      // Si la connexion est réussie (et que les données utilisateur sont stockées)
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/profile"); // Redirection vers le profil
      } else {
        console.error("Échec de l'authentification");
      }
    } catch (error) {
      console.error("Erreur dans handleSubmit :", error);
    }
  };

  return (
    <main className="main bg-dark">
      <div className="sign-in-content">
        <FontAwesomeIcon icon={faCircleUser} size="2x" color="black" />
        <h1 className="sign-in-title">Sign In</h1>

        {/* Formulaire de connexion */}
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Mise à jour de l'état
              required
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Mise à jour de l'état
              required
            />
          </div>

          {/* Option "Se souvenir de moi" */}
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          {/* Bouton de soumission */}
          <button type="submit" className="sign-in-button" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* Message d'erreur si l’authentification échoue */}
          {error && <p className="error-message">{error.message || "Login failed"}</p>}
        </form>
      </div>
    </main>
  );
}

export default SignIn;

