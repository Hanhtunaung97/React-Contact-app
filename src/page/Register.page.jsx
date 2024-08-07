import React, { useEffect, useState } from "react";
import {
  ButtonComponents,
  ContainerComponents,
  ErrorComponents,
  InputFormComponents,
  LoadingComponents,
  PreventComponents,
} from "../components";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../store/services/endpoints/auth.endpoints";
// import useApi from "../hook/useApi";
// import { Register } from "../service/auth.service";
// import { useDispatch, useSelector } from "react-redux";
// import { issue, processing, register } from "../store/slice/auth.slice";

const RegisterPage = () => {
  const [regFun, { isLoading, isError, data, isSuccess }] =
    useRegisterMutation();
  const nav = useNavigate();
  console.log(isLoading, isError, data, isSuccess);
  // const { dealingApi, loading, error, data } = useApi(Register);
  // const { loading, error, data, auth } = useSelector((store) => store.auth);
  // const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  useEffect(() => {
    data && nav("/");
  }, [data]);
  const handleInputChange = (e) => {
    setFormData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await regFun(formData);
    // dispatch(processing());
    // if (res.data) {
    //   dispatch(register(res.data));
    // } else {
    //   dispatch(issue(res.msg));
    // }
    // console.log(formData);
    // dealingApi(formData);
  };
  return (
    <PreventComponents go={"/home"} check={localStorage.getItem("auth")}>
      <ContainerComponents>
        {isLoading ? (
          <LoadingComponents />
        ) : (
          <div className="Center">
            <div className=" w-2/5 h-auto space-y-5">
              <h1 className=" font-heading text-xl md:text-3xl font-bold text-purple-700 text-center">
                Register Your Contact
              </h1>
              {isError && <ErrorComponents>{isError.message}</ErrorComponents>}
              <form onSubmit={handleSubmit} className=" flex flex-col gap-y-5">
                <InputFormComponents
                  onChange={handleInputChange}
                  value={formData.name}
                  type={"name"}
                  name={"name"}
                  label={"Enter UserName :"}
                  placeholder="Your Name"
                />
                <InputFormComponents
                  onChange={handleInputChange}
                  value={formData.email}
                  type={"email"}
                  name={"email"}
                  label={"Enter Your Email :"}
                  placeholder="example@gamil.com"
                />
                <InputFormComponents
                  onChange={handleInputChange}
                  value={formData.password}
                  type={"password"}
                  name={"password"}
                  label={"Password :"}
                  placeholder="Password"
                />
                <InputFormComponents
                  onChange={handleInputChange}
                  value={formData.password_confirmation}
                  type={"password"}
                  name={"password_confirmation"}
                  label={"Confirm Password :"}
                  placeholder="Password Confirm"
                />
                <ButtonComponents type="submit">Register</ButtonComponents>
              </form>
              <p className=" text-purple-500 font-heading">
                You have already account ! plz login{" "}
                <button
                  onClick={() => nav("/")}
                  className=" underline active:underline-offset-4 duration-300 font-semibold active:scale-90"
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        )}
      </ContainerComponents>
    </PreventComponents>
  );
};

export default RegisterPage;
