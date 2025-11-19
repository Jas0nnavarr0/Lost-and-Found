import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../store/actions";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({ mode: "onTouched" });

  const executeLogin = (data) => {
    dispatch(loginUser(data, toast, navigate));
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit(executeLogin)}
        className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 border rounded-md"
      >
        <h2 className="text-center text-xl font-bold mb-6">Login</h2>

        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: true })}
            className="border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-yellow-500 text-black font-semibold py-2 rounded hover:bg-yellow-400"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;