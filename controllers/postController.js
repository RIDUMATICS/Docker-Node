const Post = require("../models/post");
module.exports = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find();
      return res
        .status(200)
        .json({ msg: "success", results: posts.length, data: { posts } });
    } catch (error) {
      return res.status(400).json({ msg: "error", error });
    }
  },

  getOnePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      return res.status(200).json({ msg: "success", data: { post } });
    } catch (error) {
      return res.status(400).json({ msg: "error", error });
    }
  },

  createPost: async (req, res) => {
    try {
      const user = req.user;
      const post = await Post.create(req.body);

      return res.status(201).json({ msg: "success", data: { post } });
    } catch (error) {
      return res.status(400).json({ msg: "error", error });
    }
  },

  updatePost: async (req, res) => {
    try {
      const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      return res.status(202).json({ msg: "success", data: { post } });
    } catch (error) {
      return res.status(400).json({ msg: "error", error });
    }
  },

  deletePost: async (req, res) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      return res.status(202).json({ msg: "success", data: { post } });
    } catch (error) {
      return res.status(400).json({ msg: "error", error });
    }
  },
};
