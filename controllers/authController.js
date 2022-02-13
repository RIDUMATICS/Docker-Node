const User = require("../models/user");
const bcrypt = require("bcryptjs");

module.exports = {
  signup: async (req, res) => {
    try {
      const { name, email, password, role = "user" } = req.body;
      const hashPassword = await bcrypt.hash(password, 12);

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: "user email already exists..." });
      }

      const user = new User({
        name,
        email,
        role,
        password: hashPassword,
      });

      await user.save();

      req.session.user = user;

      res.status(201).json({ msg: "success", data: { user } });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "error", error });
    }
  },

  login: async function (req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "user not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "invalid password" });
      }

      req.session.user = user;

      res.status(200).json({ msg: "success", data: { user } });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "error", error });
    }
  },
};
