import api from "../../api/api"

export const loginUser = (sentData, toast, navigate) => async (dispatch) => {
    try {
    const response = await api.post("/auth/login", sentData); // make sure endpoint matches backend
    const data = response.data;

    dispatch({ type: "LOGIN_USER", payload: data });
    localStorage.setItem("auth", JSON.stringify(data));

    toast.success("Successfully logged in");
    navigate("/home");
  } catch (err) {
    console.error(err);
    toast.error(err?.response?.data?.message || "Internal Server Error");
  }
}

export const signupUser = (formData, toast, navigate) => async (dispatch) => {
  try {
    const response = await api.post("/auth/signup", formData);
    toast.success(response.data.message || "Account created successfully");
    navigate("/");
  } catch (err) {
    console.error(err);
    toast.error(err?.response?.data?.message || "Signup failed");
  }
};

export const logOutUser = (navigate) => async (dispatch) => {
  dispatch({ type: "SIGN_OUT"});

  try {
      await api.post("/auth/logout"); // clear cookie
  } catch (e) {
      // ignore errors
  }

  localStorage.removeItem("auth");
  navigate("/");
}