import React from 'react';

function SignIn() {
    return (
      <main className="main">
        <div>
          <h1>Sign In</h1>
          <form>
            <div>
            <label for="username">Username</label>
            <input type="text" id="username" name="username" />
            </div>
            <div>
            <label for="password">Password</label>
            <input type="password" id="password" name="password" />
            </div>
            <div></div>
            <input type="checkbox" id='remember-me' /> <label for='remember-me'>Remember me</label>
            <button>Sign In</button>
          </form>
        </div>
      </main>
    );
  }

  export default SignIn;