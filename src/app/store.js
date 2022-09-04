import { configureStore } from "@reduxjs/toolkit";
import { loadingBarMiddleware, loadingBarReducer } from "react-redux-loading-bar";
import logger from "redux-logger";
import sharedReducer from "../features/sharedSlice";
import tweetReducer from "../features/tweetSlice";
import userReducer from "../features/userSlice";

const store = configureStore({
  reducer: {
    shared: sharedReducer,
    user: userReducer,
    tweets: tweetReducer,
    loadingBar: loadingBarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([logger, loadingBarMiddleware()]),
});

export default store;
