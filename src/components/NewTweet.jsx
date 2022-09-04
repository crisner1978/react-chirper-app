import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthedUser } from "../features/userSlice";
import { addNewTweet } from "../features/tweetSlice";

const NewTweet = ({ id }) => {
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authedUser = useSelector(selectAuthedUser);

  async function newTweet() {
    const tweetObj = {
      text,
      author: authedUser,
      replyingTo: id,
    };
    dispatch(addNewTweet(tweetObj))
      .then(() => dispatch(hideLoading()))
      .then(() => !id && navigate("/"));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(showLoading());
    setText("");
    await newTweet();
  };

  const tweetLeft = 280 - text.length;

  return (
    <div>
      <h3 className="center">Compose New Tweet</h3>
      <form onSubmit={handleSubmit} className="new-tweet">
        <textarea
          className="textarea"
          placeholder="What's happening?"
          maxLength={280}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {tweetLeft <= 100 && <div className="tweet-length">{tweetLeft}</div>}
        <button className="btn" type="submit" disabled={!text.length}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewTweet;
