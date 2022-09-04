import React from "react";
import { useSelector } from "react-redux";
import { selectTweetIds } from "../features/tweetSlice";
import Tweet from "./Tweet";

const Dashboard = () => {
  const tweets = useSelector(selectTweetIds);
  const tweetIds = tweets
    ? Object.keys(tweets).sort(
        (a, b) => tweets[b].timestamp - tweets[a].timestamp
      )
    : null;

  return (
    <div>
      <h3 className="center">You Timeline</h3>
      <ul className="dashboard-list">
        {tweetIds?.map((id) => (
          <Tweet key={id} tweetId={id} tweets={tweets} />
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
