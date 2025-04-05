import React, { useState } from "react";



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
            <div>
            <label htmlFor="username">User name:</label>
            <input type="text" id="username" name="username" value={userName}
            onChange={(e) => setUserName(e.target.value)} />
            </div>
            <div>
            <label htmlFor="firstname">First name:</label>
            <input type="text" id="firstname" name="firstname"  value={currentUser.firstName}
            disabled />
            </div>
            <div>
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