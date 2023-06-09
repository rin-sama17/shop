import { configureStore } from "@reduxjs/toolkit";

import premissionReducer from "../reducers/premissionSlice";
import categoryReducer from "../reducers/categorySlice";
import agencyReducer from "../reducers/agencySlice";
import productReducer from "../reducers/productSlice";
import postReducer from "../reducers/postSlice";
import roleReducer from "../reducers/roleSlice";
import userReducer from "../reducers/userSlice";
import { apiSlice } from "../api/index";
export const store = configureStore({
    reducer: {
        post: postReducer,
        role: roleReducer,
        user: userReducer,
        product: productReducer,
        agency: agencyReducer,
        category: categoryReducer,
        premission: premissionReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware)
});
