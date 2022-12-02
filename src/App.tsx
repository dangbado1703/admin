import "antd/dist/reset.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./App.scss";
import ControlProducts from "./components/Products/ControlProducts";
import Category from "./pages/Category/Category";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Products from "./pages/Products/Products";
import Register from "./pages/Register/Register";
import path from "./router/path";
import LayoutMain from "./utils/Layout";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <ToastContainer position={toast.POSITION.TOP_RIGHT} autoClose={3000} />
        <Routes>
          <Route path={path.login} element={<Login />} />
          <Route path={path.register} element={<Register />} />
          <Route element={<LayoutMain />}>
            <Route path={path.home} element={<Home />} />
            <Route path={path.category} element={<Category />} />
            <Route path={path.products} element={<Products />} />
            <Route path={path.addNewProduct} element={<ControlProducts />} />
            <Route path={path.productDetail} element={<ControlProducts />} />
            <Route path={path.productUpdate} element={<ControlProducts />} />
          </Route>
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
