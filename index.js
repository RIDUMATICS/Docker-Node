const express = require("express");
const dbConnect = require("./config/db");
const session = require("express-session");
const { createClient } = require("redis");
let RedisStore = require("connect-redis")(session);
const cors = require("cors");
const { REDIS_URL, REDIS_PORT, SESSION_SECRET } = require("./config/config");

dbConnect();

const app = express();
const port = process.env.PORT || 3000;

app.enable('trust proxy');
app.use(express.json());
app.use(cors());

const client = createClient({
  legacyMode: true,
  socket: {
    host: REDIS_URL,
    port: REDIS_PORT,
  },
});

client.on("error", (err) => console.log("Redis Client Error: ", err));
client.on("connect", () => console.log("Redis: connected successfully"));

client.connect();

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    rolling: true,
    store: new RedisStore({ client }),
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60,
      httpOnly: true,
      secure: false,
    },
  })
);

app.get("/", (req, res) => {
  console.log(req.headers)
  res.send("Hello World!!!");
});

app.use("/api/v1/users", require("./routes/userRouter"));
app.use("/api/v1/posts", require("./routes/postRouter"));
app.use("/auth", require("./routes/authRouter"));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
