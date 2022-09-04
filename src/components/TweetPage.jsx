import React from "react";
import { useSelector } from "react-redux";
import { selectAllTweets } from "../features/tweetSlice";
import Tweet from "./Tweet";
import NewTweet from "./NewTweet";
import { useParams } from "react-router-dom";

const TweetPage = () => {
  const { id } = useParams();
  const tweets = useSelector(selectAllTweets);

  let replies = tweets[id]?.replies
    .map((item) => item)
    .sort((a, b) => tweets[b].timestamp - tweets[a].timestamp);

  console.log(replies?.length);

  return (
    <div>
      <Tweet tweetId={id} />
      <NewTweet id={id} />
      {replies?.length > 0 && (
        <>
          <h3 className="center">Replies</h3>
          <ul>
            {replies.map((replyId) => (
              <li key={replyId}>
                <Tweet tweetId={replyId} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default TweetPage;
