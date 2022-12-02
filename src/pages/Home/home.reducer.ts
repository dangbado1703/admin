import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instance from "../../config/axios.config";
import { FormDataUser, FormSearchUser } from "../../model/home.model";

const initState = {
  dataSearch: [],
  total: 0,
  isLoading: false,
  isLoadingUpdate: false,
};

export const searchUser = createAsyncThunk(
  "home/searchUser",
  async (data: Partial<FormSearchUser>) => {
    const result = await instance.post(
      `/search/user?page=${data.page}&size=${data.size}`,
      data
    );
    return result;
  }
);

export const deleteUser = createAsyncThunk(
  "home/deleteUser",
  async (user_id: string) => {
    const result = await instance.post("/user/delete", { user_id });
    toast.success(result.data.message);
    return result;
  }
);

export const updateUser = createAsyncThunk(
  "home/updateUser",
  async (data: Partial<FormDataUser>) => {
    const result = await instance.put("/user/update", data);
    toast.success(result.data.message);
    return result;
  }
);

const homeSlide = createSlice({
  name: "home",
  initialState: initState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(searchUser.fulfilled, (state, action) => {
        state.dataSearch = action.payload.data.data;
        state.total = action.payload.data.totalElements;
        state.isLoading = false;
      })
      .addCase(searchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoadingUpdate = true;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.isLoadingUpdate = false;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoadingUpdate = false;
      });
  },
});

const homeReducer = homeSlide.reducer;
export default homeReducer;
