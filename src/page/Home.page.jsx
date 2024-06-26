import React, { useEffect } from "react";
import {
  ButtonComponents,
  ContainerComponents,
  NavComponents,
  PreventComponents,
} from "../components";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../store/action/auth.action";
import { getProfileData } from "../service/auth.service";

const HomePage = () => {
  const store = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("auth");
    nav("/");
    logoutAction(dispatch);
  };
  const handleAddNew = () => {
    nav("/home/add");
  };
  useEffect(() => {
   (async() => {
    const res=await getProfileData();
    // console.log(res);
   })() 
  },[])
  return (
    <PreventComponents go={"/"} check={!localStorage.getItem("auth")}>
      <NavComponents>
        <div className=" space-x-5">
          <ButtonComponents onClick={handleAddNew} style={"!w-auto"}>
            Add New
          </ButtonComponents>
          <ButtonComponents
            onClick={handleLogout}
            style={
              "! bg-white border-red-500 w-auto text-red-500 duration-200 active:text-white active:bg-red-500 active:scale-90"
            }
          >
            Logout
          </ButtonComponents>
        </div>
      </NavComponents>
      <ContainerComponents>
        <div className="Center">
          <Outlet/>
        </div>
      </ContainerComponents>
    </PreventComponents>
  );
};

export default HomePage;
