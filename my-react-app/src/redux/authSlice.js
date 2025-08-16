import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3001/api/v1/user";


// Login + fetch profile
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const { data } = await axios.post(`${API_URL}/login`, { email, password });
      const token = data?.body?.token ?? data?.token;
      if (!token) throw new Error("Token manquant");

      // persist token
      localStorage.setItem("token", token);

      // fetch profile right after login
      const prof = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return { token, user: prof.data.body };
    } catch (e) {
      // Message générique, on ne remonte pas "password is invalid" etc.
      return thunkAPI.rejectWithValue("AUTH_FAILED");
    }
  }
);

// Reload: récupérer le profil avec le token existant
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token manquant");
      const { data } = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.body;
    } catch (e) {
      return thunkAPI.rejectWithValue("PROFILE_FAILED");
    }
  }
);

// Mettre à jour le pseudo (username)
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (userName, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `${API_URL}/profile`,
        { userName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // data.body = objet user à jour
      return data.body;
    } catch (e) {
      return thunkAPI.rejectWithValue("UPDATE_FAILED");
    }
  }
);



const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null, // sera "AUTH_FAILED" côté UI si login échoue
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "AUTH_FAILED";
      })

      // FETCH PROFILE
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.payload;
      })

      // UPDATE USERNAME
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        // merge pour mise à jour instantanée
        if (state.user) state.user = { ...state.user, ...action.payload };
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;