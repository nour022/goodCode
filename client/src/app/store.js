import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import profileSlice from "../features/profile/profileSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileSlice,
  },
});
