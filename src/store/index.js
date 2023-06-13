import { configureStore } from "@reduxjs/toolkit";

import premissionReducer from "../reducers/premissionSlice";
import categoryReducer, { fetchCategories } from "../reducers/categorySlice";
import agencyReducer from "../reducers/agencySlice";
import productReducer from "../reducers/productSlice";
import postReducer from "../reducers/postSlice";
import roleReducer from "../reducers/roleSlice";
import userReducer from "../reducers/userSlice";
import authReducer, { fetchUserInfo } from "../reducers/authSlice";
import searchReducer from "../reducers/searchSlice";
import sliderReducer from "../reducers/sliderSlice";
import { apiSlice } from "../api/index";
export const store = configureStore({
    reducer: {
        post: postReducer,
        role: roleReducer,
        user: userReducer,
        auth: authReducer,
        slider: sliderReducer,
        product: productReducer,
        agency: agencyReducer,
        search: searchReducer,
        category: categoryReducer,
        premission: premissionReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware)
});


store.dispatch(fetchCategories());
store.dispatch(fetchUserInfo());
