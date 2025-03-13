import React from 'react';

function BalanceAccount({ title, balance, description }) {
    return (
        <div className="account">
            <div className="account-info">
                <h2 className='account-title'>{title}</h2>
                <p className="account-balance">${balance}</p>
                <p className="account-description">{description}</p>
            </div>
            <button className="transaction-button ">View Transactions</button>
        </div>
    );
}

export default BalanceAccount;
