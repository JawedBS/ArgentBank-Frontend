import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// URL de l'API du backend
const API_URL = "http://localhost:3001/api/v1/user";

// Action pour connecter un utilisateur et récupérer son profil
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      // Authentification de l'utilisateur
      const response = await axios.post(`${API_URL}/login`, { email, password });
      const token = response.data.body.token;

      if (!token) throw new Error("Token non fourni par l'API");

      // Stockage du token en local
      localStorage.setItem("token", token);

      // Récupération du profil utilisateur après connexion
      const profileResponse = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return {
        token,
        user: profileResponse.data.body,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Action pour récupérer les informations utilisateur (utilisée au rechargement)
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token manquant");

      const response = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data.body;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Action pour mettre à jour le pseudo de l'utilisateur
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (userName, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${API_URL}/profile`,
        { userName },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data.body;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Erreur inconnue");
    }
  }
);

// Création du slice Redux d'authentification
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Connexion
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
        state.error = action.payload;
      })

      // Récupération du profil utilisateur
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Mise à jour du pseudo
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        if (state.user) {
          state.user.userName = action.userName;
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;


