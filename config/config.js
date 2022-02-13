require("dotenv").config();

module.exports = {
  MONGO_IP: process.env.MONGO_IP || "mongo",
  MONGO_PORT: process.env.MONGO_PORT || 27017,
  // MONGO_USER and MONGO_PASSWORD are not need for development (already in docker-compose.dev.yml)
  // production is not going to use the container, so we need to pass the credentials
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  REDIS_URL: process.env.REDIS_URL || "redis",
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  SESSION_SECRET: process.env.SESSION_SECRET || "keyboard cat",
};
