const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const _ = require("lodash");

const app = express();

app.use(cors());

const server = require("http").createServer(app);
const io = require("socket.io").listen(server);

const { User } = require("./Helpers/UserClass");

require("./socket/streams")(io, User, _);
require("./socket/private")(io);

const dbConfig = require("./config/secret");
const auth = require("./routes/authRoutes");
const administration = require("./routes/administrationRoutes");
const typedocument = require("./routes/typeDocumentRoutes");
const document = require("./routes/documentRoutes");

const users = require("./routes/userRoutes");
const image = require("./routes/imageRoutes");

//Cross Origin Access
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET",
//     "POST",
//     "PUT",
//     "DELETE",
//     "OPTIONS"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   next();
// });

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
//app.use(logger("dev"));

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use("/api", auth);
app.use("/api", administration);
app.use("/api", typedocument);
app.use("/api", document);

app.use("/api", users);
app.use("/api", image);

server.listen(3000, () => {
  console.log("Running on port 3000");
});
