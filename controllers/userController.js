const User = require("../models/user");

module.exports = {
  getUser: async function (req, res) {
    try {
      const data = await User.findById(req.params.id).populate("posts");
      res.status(200).json({ msg: "success", data });
    } catch (error) {
      console.log(error);
    }
  },

  getUsers: async function (req, res) {
    try {
      const data = await User.find().populate("posts");
      res.status(200).json({ msg: "success", data });
    } catch (error) {
      console.log(error);
    }
  },

  
};
