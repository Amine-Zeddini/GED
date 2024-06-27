module.exports = function (io, User, _) {
  const userData = new User();
  io.on("connection", (socket) => {
    socket.on("refresh", (data) => {
      io.emit("refreshPage", {});
    });
  });
};
