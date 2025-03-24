import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// URL de l'API du backend
const API_URL = "http://localhost:3001/api/v1/user";

// Action pour connecter un utilisateur
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      console.log(" Réponse API :", response.data); // Log de la réponse API
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Action pour récupérer les infos utilisateur
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        throw new Error(" Aucun token trouvé, utilisateur non connecté !");
      }

      console.log(" Envoi de la requête avec le token :", token); // Vérification

      const response = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(" Réponse du backend :", response.data);
      return response.data;
    } catch (error) {
      console.error(" Erreur lors de la récupération du profil :", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

// Action pour mettre à jour le userName
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

      console.log(" Pseudo mis à jour :", response.data.body.userName);
      return response.data;
    } catch (error) {
      console.error(" Erreur lors de la mise à jour :", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || "Erreur inconnue");
    }
  }
);



// Slice Redux pour gérer l'état de l'authentification
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
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.body.token;
        localStorage.setItem("token", action.payload.body.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        console.log("Données utilisateur stockées dans Redux :", action.payload.body);
        state.user = action.payload.body;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user.userName = action.payload.body.userName;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
