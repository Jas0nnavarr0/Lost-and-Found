import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../../store/actions";
import toast from "react-hot-toast";

const Register = () => {
  const { register, handleSubmit } = useForm({ mode: "onTouched" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const executeSignup = (data) => {
    dispatch(signupUser(data, toast, navigate));
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit(executeSignup)}
        className="w-[360px] sm:w-[450px] shadow-custom p-8 border rounded-md"
      >
        <h2 className="text-center text-xl font-bold mb-6">Sign Up</h2>

        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: true, minLength: 3 })}
            className="border p-2 rounded"
          />

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true, minLength: 6 })}
            className="border p-2 rounded"
          />

          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="border p-2 rounded"
          />

          <input
            type="tel"
            placeholder="Phone Number (optional)"
            {...register("phoneNumber")}
            className="border p-2 rounded"
          />

          <button
            type="submit"
            className="bg-yellow-500 text-black font-semibold py-2 rounded hover:bg-yellow-400"
          >
            Register
          </button>

          <p className="text-center text-sm mt-3">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 font-medium hover:underline">
              Log in here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;