import { combineReducers } from "@reduxjs/toolkit";
import homeReducer from "../pages/Home/home.reducer";
import categoryReducer from "../pages/Category/category.reducer";
import productsReducer from "../pages/Products/products.reducer";
const rootReducer = combineReducers({
  homeReducer,
  categoryReducer,
  productsReducer,
});

export default rootReducer;
