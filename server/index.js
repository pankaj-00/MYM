import Express from "express";
import routes from "./routes.js";
import cors from "cors";
import config from "./config.js";
import connect from "./handlers/connect.js";
import cookieParser from "cookie-parser";
import { LocalStorage } from "node-localstorage";
global.localStorage = new LocalStorage("./scratch");

const port = config.port;

const app = Express();

app.use(
  cors({
    origin: config.origin,
    credentials: true,
  })
);

app.use(Express.json());

app.listen(port, async () => {
  console.log(`App is running on http://localhost:${port}`);
  connect();
  routes(app);
});
