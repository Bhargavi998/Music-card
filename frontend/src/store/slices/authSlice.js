import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  token: null,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/users/login", {
        email,
        password,
      });
      console.log("response :", response);
      if (response.data.success === true) {
        const token = response.data.token;
        const name = response.data.name;

        localStorage.setItem("token", token);
        localStorage.setItem("name", name);

        return response.data;
      } else {
        return rejectWithValue("Invalid email or password.");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password, mobile }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/users/register", {
        name,
        email,
        password,
        mobile,
      });
      return response.data.token;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.token = null;
        state.error = action.payload;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.token = null;
        state.error = action.payload;
      });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
