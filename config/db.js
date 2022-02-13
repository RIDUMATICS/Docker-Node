const mongoose = require("mongoose");
const {
  MONGO_IP,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_PORT,
} = require("./config");

const dbConnect = () => {
  const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}`;
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Mongo: connected successfully"))
    .catch((err) => console.log(err));
};

module.exports = dbConnect;
