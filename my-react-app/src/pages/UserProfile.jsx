import React from 'react';
import BalanceAccount from '../components/BalanceAccount';

function UserProfile() {
    return (
        <main className="main-bg-dark">
            <h1>Welcome Back</h1>
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