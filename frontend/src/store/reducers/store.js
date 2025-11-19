import { configureStore } from "@reduxjs/toolkit";
import { authenticationReducer } from "./authenticationReducer";

const user = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : [];

const initState = {
    auth: { user: user}
}

const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
    },
    preloadedState: initState,
});

export default store;