import React from 'react';
import { Link } from "react-router-dom";

function SignIn() {
    return (
      <main className="main-bg-dark">
        <div className='sign-in-content'>
          <h1 className='sign-in-title'>Sign In</h1>
          <form >
            <div>
            <label className='sign-in-username' for="username">Username</label>
            <input type="text" id="username" name="username" />
            </div>
            <div>
            <label className='sign-in-password'for="password">Password</label>
            <input type="password" id="password" name="password" />
            </div>
            <div>
            <input type="checkbox" id='remember-me' /> 
            <label className='sign-in-remember' for='remember-me'>Remember me</label>
            </div>
            <Link to="/profile">
            <button className="sign-in-button">Sign In</button>
            </Link>
          </form>
        </div>
      </main>
    );
  }

  export default SignIn;