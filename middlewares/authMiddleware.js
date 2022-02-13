module.exports = {
  isAuthenticated: (req, res, next) => {
    const { user } = req.session;
    if (!user) {
      return res.status(401).json({ error: "You must be logged in" });
    }

    req.user = user;
    next();
  },

  isAdmin: (req, res, next) => {
    const { user } = req.session;
    if (user.role !== "admin") {
      return res.status(403).json({ error: "You are not authorized" });
    }

    next();
  },
};
