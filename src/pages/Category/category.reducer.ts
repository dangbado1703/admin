import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instance from "../../config/axios.config";
import { FormSearchUser } from "../../model/home.model";
import { IFormInitState } from "../../model/index.model";

const initState: Partial<IFormInitState<any>> = {
  dataSelect: [],
  dataSearch: [],
  total: 0,
  isLoading: false,
  isLoadingUpdate: false,
  isLoadingCreate: false,
  dataDetail: null,
};

export const searchCategory = createAsyncThunk(
  "category/searchCategory",
  async (
    data: Pick<FormSearchUser, "page" | "size"> & Partial<{ name: string }>,
    thunkAPI
  ) => {
    const result = await instance.post(
      `/category/search?page=${data.page}&size=${data.size}`,
      data
    );
    const dataSelect = result.data.data.map((item: any) => {
      return {
        label: item.name,
        value: item.name,
      };
    });
    thunkAPI.dispatch(setDataSearch(dataSelect));
    return result;
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (data: any) => {
    const result = await instance.post("/category/update", data);
    toast.success(result.data.message);
    return result;
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (data: any) => {
    const result = await instance.post("/category/delete", data);
    toast.success(result.data.message);
    return result;
  }
);

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (data: any) => {
    const result = await instance.post("/category/create", data);
    toast.success(result.data.message);
    return result;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: initState,
  reducers: {
    setDataSearch: (state, action) => {
      state.dataSelect = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(searchCategory.fulfilled, (state, action) => {
        state.dataSearch = action.payload.data.data;
        state.total = action.payload.data.totalElements;
        state.isLoading = false;
      })
      .addCase(searchCategory.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(searchCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.pending, (state) => {
        state.isLoadingUpdate = true;
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.isLoadingUpdate = false;
      })
      .addCase(updateCategory.rejected, (state) => {
        state.isLoadingUpdate = false;
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoadingCreate = true;
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.isLoadingCreate = false;
      })
      .addCase(createCategory.rejected, (state) => {
        state.isLoadingCreate = false;
      });
  },
});

const categoryReducer = categorySlice.reducer;
export const { setDataSearch } = categorySlice.actions;
export default categoryReducer;
