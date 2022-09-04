import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBar, { hideLoading, showLoading } from "react-redux-loading-bar";
import { Route, Routes } from "react-router-dom";
import { fetchAppData, selectData } from "../features/sharedSlice";
import { setTweets } from "../features/tweetSlice";
import { AUTHED_USER, setAuthedUser, setUsers } from "../features/userSlice";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import NewTweet from "./NewTweet";
import TweetPage from "./TweetPage";

const App = () => {
  const dispatch = useDispatch();
  const { status } = useSelector(selectData);

  useEffect(() => {
    if (status === "idle") {
      dispatch(showLoading());
      dispatch(fetchAppData()).then((data) => {
        dispatch(setTweets(data.payload.tweets));
        dispatch(setUsers(data.payload.users));
        dispatch(setAuthedUser(AUTHED_USER));
        dispatch(hideLoading());
      });
    }
  }, [status, dispatch]);

  return (
    <>
      <LoadingBar style={{ backgroundColor: "blue", height: "4px" }} />
      <div className="container">
        <Navbar />
        {status === "succeeded" ? (
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tweet/:id" element={<TweetPage />} />
            <Route path="new-tweet" element={<NewTweet />} />
          </Routes>
        ) : null}
      </div>
    </>
  );
};

export default App;
