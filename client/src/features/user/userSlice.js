import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signup, signin, signout } from "../../api/userApi";

// export const signupUser = createAsyncThunk("user/signup", signup);
export const signupUser = createAsyncThunk(
  "user/signup",
  async ({ username, password }) => {
    const response = await signup(username, password);
    console.log(response.user);
    return response.user;
  }
);
//export const signinUser = createAsyncThunk("user/signin", signin);
export const signinUser = createAsyncThunk(
  "user/signin",
  async ({ username, password }) => {
    const response = await signin(username, password);
    // console.log(response.id);
    localStorage.setItem("token", response.token);
    return response;
  }
);
export const signoutUser = createAsyncThunk("user/signout", async () => {
  const response = await signout();
  console.log(response.token);
  localStorage.removeItem("token");
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: "",
    status: "idle",
    error: null,
    user_id: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        // id  + token
        state.token = action.payload.token;
        state.user_id = action.payload.id;
      })
      .addCase(signoutUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.token = null;
      });
  },
});

export default userSlice.reducer;
