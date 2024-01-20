import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "./constant";
import { postWithoutToken, getWithoutToken, putWithoutToken } from "./sevices";

const initialState = {
  gridlistApiStatus: null,
  userlistApiStatus: null,
  editdataApiStatus: null,
  deleteApiStatus: null,
  logout: false,
  status: "",
};

export const Users = createAsyncThunk(
  "users/users",
  async (data) => await postWithoutToken(authApi.UserList, data),
);
console.log(Users.userlistApiStatus)
export const Edit = createAsyncThunk(
  "users/update",
  async (id) => await putWithoutToken(authApi.EditData, id)
);

export const Delete = createAsyncThunk(
  "users/delete",
   async (data) => await postWithoutToken(authApi.DeleteData, data)
);

export const CreateNewUser = createAsyncThunk(
  "users/CreateNewUser",
   async (data) => await postWithoutToken(authApi.CreateUser, data)
);

export const userSlice = createSlice({
  name: "user",
  initialState,

  // Use 'builder' callback for extraReducers
  extraReducers: (builder) => {
    builder

      // fetch user list
      .addCase(CreateNewUser.fulfilled, (state, action) => {
        state.createNewUserApiStatus = action.payload;
      })
      .addCase(CreateNewUser.rejected, (state, action) => {
        state.createNewUserApiStatus = action.payload;
      })
      // additional cases for user list, edit, delete, and image
      .addCase(Users.fulfilled, (state, action) => {
        state.userlistApiStatus = action.payload;
      })
      .addCase(Users.rejected, (state, action) => {
        state.userlistApiStatus = action.payload;
      })
      .addCase(Users.pending, (state, action) => {
        state.userlistApiStatus = action.payload;
      })
      .addCase(Edit.fulfilled, (state, action) => {
        state.editdataApiStatus = action.payload;
      })
      .addCase(Edit.rejected, (state, action) => {
        state.editdataApiStatus = action.payload;
      })
      .addCase(Edit.pending, (state, action) => {
        state.editdataApiStatus = action.payload;
      })
      .addCase(Delete.fulfilled, (state, action) => {
        state.deleteApiStatus = action.payload;
        state.status = 'deleted';
      })
      .addCase(Delete.rejected, (state, action) => {
        state.deleteApiStatus = action.payload;
        state.status = 'rejected';
      })
      .addCase(Delete.pending, (state, action) => {
        state.deleteApiStatus = action.payload;
        state.status = 'pending';
      })
}
})

export const { setAuthApiStatus, setLogout } = userSlice.actions;

export default userSlice.reducer;
