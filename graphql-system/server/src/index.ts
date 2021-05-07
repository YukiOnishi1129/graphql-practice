require("module-alias/register");
// require("dotenv").config();
import Express from "express";

const app = Express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server Started");
});

export default app;
