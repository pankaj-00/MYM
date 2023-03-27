import userHandler from "./handlers/userHandler.js";

const routes = (app) => {
  app.post("/user", userHandler);
};

export default routes;
