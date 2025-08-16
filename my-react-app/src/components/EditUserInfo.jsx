import React, { useState } from "react";
import "../styles/editUserInfo.css";


function EditUserInfo({ currentUser, onSave, onCancel }) {
    const [userName, setUserName] = useState(currentUser.userName);
  

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(userName); // Appel vers Redux 
    };
    return (
        <div className="edit-form-container"> 
            <h1>Edit User Info</h1>
            <form onSubmit={handleSubmit}>
            <div className="container-user">
            <label htmlFor="username">User name:</label>
            <input type="text" id="username" name="username" value={userName}
            onChange={(e) => setUserName(e.target.value)} required />
            </div>
            <div className="container-user">
            <label htmlFor="firstname">First name:</label>
            <input type="text" id="firstname" name="firstname"  value={currentUser.firstName}
            disabled />
            </div>
            <div className="container-user">
            <label htmlFor="lastname">Last name:</label>
            <input type="text" id="lastname" name="lastname" value={currentUser.lastName} 
            disabled/>
            </div>
            <div className="edit-form-buttons">
          <button type="submit" className="save-btn">Save</button>
          <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
            </form>
        </div>
    );
  };
  
  export default EditUserInfo;