import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Tentative de connexion avec :", { email, password });
  
    try {
      const result = await dispatch(loginUser({ email, password }));
  
      console.log(" Résultat de l'authentification :", result);
  
      if (result.meta.requestStatus === "fulfilled" && result.payload?.body?.token) {
        console.log(" Redirection vers /profile avec token :", result.payload.body.token);
        navigate("/profile"); // Rediriger après connexion réussie
      } else {
        console.error(" Erreur : pas de token reçu !");
      }
    } catch (error) {
      console.error(" Erreur dans handleSubmit :", error);
    }
  };
  

  return (
    <main className="main bg-dark">
      <div className="sign-in-content">
        <FontAwesomeIcon icon={faCircleUser} size="2x" color="black" />
        <h1 className="sign-in-title">Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" /> 
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
          {error && <p >{error.message || "Login failed"}</p>}
        </form>
      </div>
    </main>
  );
}

export default SignIn;
