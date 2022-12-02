import React, { useEffect, useState } from "react";
import SearchProducts from "../../components/Products/SearchProducts";
import TableProducts from "../../components/Products/TableProducts";
import { IFormSearchProducts } from "../../model/products.model";
import { useAppDispatch } from "../../store/hook";
import { searchProducts } from "./products.reducer";
import "./products.scss";

const Products = () => {
  const [searchValue, setSearchValue] = useState<Partial<IFormSearchProducts>>({
    product_id: "",
    product_name: "",
    product_code: "",
    category_id: "",
    facturers: "",
    status: "",
    price_from: "",
    price_to: "",
    stock_from: "",
    stock_to: "",
    offset: "",
  });
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(searchProducts({ ...searchValue, page, size }));
  }, [searchValue, page, size, dispatch]);
  return (
    <div>
      <SearchProducts setSearchValue={setSearchValue} />
      <TableProducts
        page={page}
        size={size}
        searchValue={searchValue}
        setPage={setPage}
        setSize={setSize}
      />
    </div>
  );
};

export default Products;
