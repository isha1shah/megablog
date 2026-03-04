// Import configureStore from Redux Toolkit.
// configureStore is a wrapper around Redux's createStore that
// comes with good defaults (like middleware, devtools, etc.).
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; 

// Create the Redux store using configureStore.
// The store is like a big JavaScript object that holds the entire app's state.
const store = configureStore({
    // The reducer property defines all slices of state your app has.
    // Right now, it's empty because you haven't added any reducers yet.
    // Example: reducer: { auth: authReducer, todo: todoReducer }
    reducer: {
         auth: authReducer
         //todo
    }
})

// Export the store so it can be provided to the <Provider> in your React app.
// (The <Provider> makes the Redux store available to all components.)
export default store;
