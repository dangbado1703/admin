import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchUser from "../../components/Home/SearchUser";
import TableUser from "../../components/Home/TableUser";
import { FormSearchUser } from "../../model/home.model";
import path from "../../router/path";
import { useAppDispatch } from "../../store/hook";
import { useAuth } from "../../utils/contants";
import { searchUser } from "./home.reducer";
import "./home.scss";

const Home = () => {
  const [searchValue, setSearchValue] = useState<Partial<FormSearchUser>>({
    username: "",
    phone_number: "",
    email: "",
    is_active: null,
    birthday_from: "",
    birthday_to: "",
  });
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAuth();
  useEffect(() => {
    if (!auth) {
      navigate(path.login);
    }
  }, [auth, navigate]);
  useEffect(() => {
    dispatch(searchUser({ ...searchValue, page, size }));
  }, [searchValue, page, size, dispatch]);
  return (
    <div className="home">
      <div>
        <SearchUser setSearchValue={setSearchValue} />
        <TableUser
          page={page}
          size={size}
          setPage={setPage}
          setSize={setSize}
          searchValue={searchValue}
        />
      </div>
    </div>
  );
};

export default Home;
