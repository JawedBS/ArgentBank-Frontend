function EditUserInfo(){
    return (
        <div>
            <h1>Edit User Info</h1>
            <form>
            <div>
            <label for="username">User name:</label>
            <input type="text" id="username" name="username" />
            </div>
            <div>
            <label for="firstname">First name:</label>
            <input type="text" id="firstname" name="firstname" />
            </div>
            <div>
            <label for="lastname">Last name:</label>
            <input type="text" id="lastname" name="lastname" />
            </div>
            </form>
            <div>
            <button>Save</button>
            <button>Cancel</button>
            </div>
        </div>
    );
  };
  
  export default EditUserInfo;