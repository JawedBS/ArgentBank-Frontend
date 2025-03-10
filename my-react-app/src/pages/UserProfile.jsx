import React from 'react';
import BalanceAccount from '../components/BalanceAccount';

function UserProfile() {
    return (
      <main className="main">
        <h1>Welcome Back</h1>
        <button>Edit name</button>
        <BalanceAccount/>
        <BalanceAccount/>
        <BalanceAccount/>
      </main>
    );
  }

  export default UserProfile;