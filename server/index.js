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

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(Express.json());

app.listen(port, async () => {
  console.log(`App is running on http://localhost:${port}`);
  connect();
  routes(app);
});
