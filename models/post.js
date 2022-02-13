const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "Post must have a title"],
  },
  body: {
    type: String,
    require: [true, "Post must have a body"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
