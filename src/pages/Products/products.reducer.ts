import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import instance from "../../config/axios.config";
import { IFormInitState } from "../../model/index.model";
import { IFormSearchProducts } from "../../model/products.model";

const initState: Partial<IFormInitState<any>> = {
  dataSearch: [],
  isLoading: false,
  isLoadingCreate: false,
  isLoadingUpdate: false,
  action: "create",
  dataDetail: null,
};

export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async ({ page, size, ...rest }: Partial<IFormSearchProducts>) => {
    const result = await instance.post(
      `/products/search?size=${size}&page=${page}`,
      rest
    );
    return result;
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (formData: FormData) => {
    const result = await instance.post("/products/upload", formData);
    toast.success("Tải ảnh lên thành công");
    return result;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (formData: FormData) => {
    const result = await instance.post("/products/update", formData);
    toast.success("Cập nhật sản phẩm thành công");
    return result;
  }
);

export const getDetailProduct = createAsyncThunk(
  "products/getDetailProduct",
  async (id: string | undefined) => {
    const result = await instance.get(`/products/detail?product_id=${id}`);
    return result;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: initState,
  reducers: {
    setAction: (
      state,
      { payload }: { payload: "create" | "update" | "view" | undefined }
    ) => {
      state.action = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.dataSearch = action.payload.data.data;
        state.total = action.payload.data.totalElements;
        state.isLoading = false;
      })
      .addCase(searchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchProducts.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getDetailProduct.fulfilled, (state, action) => {
        state.dataDetail = action.payload.data;
      })
      .addMatcher(isFulfilled(updateProduct, createProduct), (state) => {
        state.isLoadingCreate = false;
      })
      .addMatcher(isPending(createProduct, updateProduct), (state) => {
        state.isLoadingCreate = true;
      })
      .addMatcher(isRejected(createProduct, updateProduct), (state) => {
        state.isLoadingCreate = false;
      });
  },
});

const productsReducer = productsSlice.reducer;
export const { setAction } = productsSlice.actions;
export default productsReducer;
