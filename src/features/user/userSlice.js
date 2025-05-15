// src/features/user/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk pour récupérer les données du profil utilisateur
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return thunkAPI.rejectWithValue("Token not found");
      }

      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "POST", // POST car c'est ce qui est dans Swagger
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Ajoute le token dans l'en-tête
          },
        }
      );

      const data = await response.json();

      // console.log("Data from fetchUserProfile:", data);

      if (!response.ok) {
        return thunkAPI.rejectWithValue(
          data.message || "Failed to fetch user profile"
        );
      }

      return data.body; // On retourne les données du profil utilisateur
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Network error");
    }
  }
);

// Thunk pour mettre à jour le profil
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async ({ firstName, lastName }, thunkAPI) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ firstName, lastName }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message || "Update failed");
      }

      // data.body contient juste l'id et l'email => donc on met à jour les noms localement
      return { firstName, lastName };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Network error");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null, // Initialement vide
    status: "idle",
    error: null,
  },
  reducers: {
    // Pas besoin d'actions pour déconnecter un utilisateur ici
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    logout: (state) => {
      state.userData = null; // Réinitialisation des données utilisateur dans le store `user`
      localStorage.removeItem("userData"); // Suppression des données du localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userData = action.payload; // Sauvegarde les données du profil
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.userData.firstName = action.payload.firstName;
        state.userData.lastName = action.payload.lastName;
      });
  },
});

export const { setUserData, logout } = userSlice.actions;
export default userSlice.reducer;
