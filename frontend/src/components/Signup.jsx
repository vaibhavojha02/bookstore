import React from "react";
import { json, Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";


const Signup = () => {
  const loaction = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  
 
  const [authUser,setAuthUser] = useAuth()

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
     await axios.post("http://localhost:4001/user/signup", userInfo).then((res) => {
     
      if (res.data) 
        {
        toast.success("sign up succes");
        navigate(from, { replace: true });
      }

      localStorage.setItem("users",JSON.stringify(res.data))
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }).catch((err)=>{
      toast.error("something error has occured")
    })
  };

  return (
    
      <div className="h-screen w-screen min-h-screen   bg-orange-300 flex justify-center items-center ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[350px] h-[550px] bg-white bg-opacity-20 backdrop-blur-lg p-8  shadow-lg rounded-2xl flex flex-col gap-4 items-center justify-center"
        >
          <div className="w-full flex justify-end right-0 cursor-pointer">
            <Link to="/">
              <img
                src="../../public/close.png"
                className="h-[10px] w-[10px] right-0"
              ></img>
            </Link>
          </div>
          <img
            src="../../public/—Pngtree—users vector_3725294.png"
            className="h-[100px] w-[100px] mt-1"
          ></img>
          <div className="w-full">
            <h2>Name</h2>
            <input
              className="w-full rounded-md mt-1 outline-none"
              {...register("name", { required: true })}
            ></input>
            {errors.name && (
              <span className="text-red-800">This field is required*</span>
            )}
          </div>
          <div className="w-full">
            <h2>Email</h2>
            <input
              className="w-full rounded-md mt-1 outline-none"
              {...register("email", { required: true })}
            ></input>
            {errors.email && (
              <span className="text-red-800">This field is required*</span>
            )}
          </div>
          <div className="w-full">
            <h2>Password</h2>
            <input
              className="w-full rounded-md mt-1 outline-none border"
              type="password"
              {...register("password", { required: true })}
            ></input>
            {errors.password && (
              <span className="text-red-800">This field is required*</span>
            )}
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <button className="h-[38px] bg-blue-400 px-2 w-[80px] border  rounded-md  bg-transparent hover:bg-blue-500">
              Sign up
            </button>
            <p className="mt-2">
              existing user ?{" "}
              <Link to="/login">
                <span className="text-blue-700">log in</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    
  );
};

export default Signup;
