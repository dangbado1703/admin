import React, { useEffect, useState } from "react";
import SearchCategory from "../../components/Category/SearchCategory";
import TableCategory from "../../components/Category/TableCategory";
import { useAppDispatch } from "../../store/hook";
import { searchCategory } from "./category.reducer";
import "./category.scss";

const Category = () => {
  const [searchValue, setSearchValue] = useState<Partial<{ name: string }>>({
    name: "",
  });
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(searchCategory({ ...searchValue, page, size: size }));
  }, [searchValue, page, size, dispatch]);
  return (
    <div>
      <SearchCategory setSearchValue={setSearchValue} />
      <TableCategory
        page={page}
        size={size}
        setPage={setPage}
        setSize={setSize}
        searchValue={searchValue}
      />
    </div>
  );
};

export default Category;
