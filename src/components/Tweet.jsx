import React from "react";
import {
  TiArrowBackOutline,
  TiHeartFullOutline,
  TiHeartOutline
} from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  handleLikeTweet, selectAllTweets
} from "../features/tweetSlice";
import { selectAuthedUser, selectUsers } from "../features/userSlice";
import { formatDate, formatTweet } from "../utils/helpers";



const Tweet = ({ tweetId }) => {
  const dispatch = useDispatch();
  const tweets = useSelector(selectAllTweets)
  const users = useSelector(selectUsers);
  const authedUser = useSelector(selectAuthedUser);
  const tweetItem = tweets[tweetId];
  const navigate = useNavigate()
  const location = useLocation()
  console.log("location", location)

  if (!tweetItem) return <p>This Tweet doesn't exist.</p>;

  const parentTweet = tweetItem ? tweets[tweetItem?.replyingTo] : null;

  const tweet = tweetItem
    ? formatTweet(tweetItem, users[tweetItem.author], authedUser, parentTweet)
    : null;

  const { avatar, hasLiked, likes, name, parent, replies, text, timestamp, id } =
    tweet;

  const toParent = (e, id) => {
    e.preventDefault();
    navigate(`/tweet/${id}`)
  };

  const handleLike = (e) => {
    dispatch(
      handleLikeTweet({
        id: tweet.id,
        hasLiked: tweet.hasLiked,
        authedUser,
      })
    );
  };

  const handleReply = () => {
    if (location.pathname !== `/tweet/${id}`) {
      navigate(`/tweet/${id}`)
    }
  }

  return (
    <div className="tweet">
      <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
      <div className="tweet-info">
        <div>
          <span>{name}</span>
          <div>{formatDate(timestamp)}</div>
          {parent && (
            <button
              className="replying-to"
              onClick={(e) => toParent(e, parent.id)}>
              Replying to @{parent.author}
            </button>
          )}
          <p>{text}</p>
        </div>
        <div className="tweet-icons">
          <button className="heart-button" onClick={handleReply}>
            <TiArrowBackOutline className="tweet-icon" />
          </button>
          
            
          
          <span>{replies !== 0 && replies}</span>
          <button className="heart-button" onClick={handleLike}>
            {hasLiked === true ? (
              <TiHeartFullOutline color="#e0245e" className="tweet-icon" />
            ) : (
              <TiHeartOutline className="tweet-icon" />
            )}
          </button>
          <span>{likes !== 0 && likes}</span>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
