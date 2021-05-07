require("module-alias/register");
// require("dotenv").config();
import Express from "express";

const app = Express();
const PORT = 4000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log("Server Started");
});

export default app;
