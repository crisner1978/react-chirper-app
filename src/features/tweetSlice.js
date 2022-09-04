import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { saveLikeToggle, saveTweet } from "../utils/api";

const initialState = {
  status: "idle",
  error: null,
  tweets: {},
};

const tweetSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    setTweets: (state, action) => {
      state.tweets = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(handleLikeTweet.pending, (state, { meta }) => {
      const { id, hasLiked, authedUser } = meta.arg;
      let updatedTweet = state.tweets[id];

      if (hasLiked) {
        state.tweets[id].likes = updatedTweet.likes.filter(
          (uid) => uid !== authedUser
        );
      } else {
        updatedTweet.likes.push(authedUser);
      }
    });
    builder.addCase(handleLikeTweet.fulfilled, (state) => {
      state.status = "succeeded";
    });
    builder.addCase(handleLikeTweet.rejected, (state, { meta }) => {
      const { id, hasLiked, authedUser } = meta.arg;
      state.status = "failed";
      state.error = "Network failure";
      let updatedTweet = state.tweets[id];

      if (hasLiked) {
        updatedTweet.likes.push(authedUser);
      } else {
        state.tweets[id].likes = updatedTweet.likes.filter(
          (uid) => uid !== authedUser
        );
      }
    });
    builder.addCase(addNewTweet.fulfilled, (state, action) => {
      state.status = "succeeded";
      const tweet = action.payload;
      let replyingTo = {};
      if (tweet.replyingTo !== null) {
        state.tweets[tweet.replyingTo].replies = state.tweets[tweet.replyingTo].replies.concat(tweet.id)
      }
      state.tweets[tweet.id] = tweet;
    });
  },
});

export const { setTweets, toggleTweet } = tweetSlice.actions;

export const selectAllTweets = (state) => state.tweets.tweets;
export const selectTweetIds = (state) => state.tweets.tweets;

export default tweetSlice.reducer;

export const handleLikeTweet = createAsyncThunk(
  "tweets/saveLikeToggle",
  async (info) => await saveLikeToggle(info)
);

export const addNewTweet = createAsyncThunk(
  "tweets/addNewTweet",
  async (body) => await saveTweet(body)
);
