import Express from "express";
import routes from "./routes.js";
import cors from "cors";
import config from "./config.js";
import connect from "./handlers/connect.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = config.port;

const app = Express();

app.use(
  cors({
    origin: config.origin,
    credentials: true,
  })
);

app.use(Express.json());
app.use(cookieParser());

if (process.env.NODE_ENV == "production") {
  app.get("/", (req, res) => {
    app.use(Express.static(path.resolve(__dirname, "client", "dist")));
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

app.listen(port, async () => {
  console.log(`App is running on http://localhost:${port}`);
  routes(app);
  connect();
});
