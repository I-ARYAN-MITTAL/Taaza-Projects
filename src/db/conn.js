const mongoose = require("mongoose");
mongoose
  .connect("mongodb://0.0.0.0:27017/merndynamic", { useUnifiedTopology: true })
  .then(() => console.log("connection successfull..."))
  .catch((err) => console.log(err));