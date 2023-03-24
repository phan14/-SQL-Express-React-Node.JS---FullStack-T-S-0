import express from "express";
/**
 * 
 * @param {*} app - express app
 */

const router = express.Router();

const intitWebRoutes = (app) => {
  router.get("/", (rep, res) => {
    return res.send("hello word");
  })

  return app.use("/", router);
}

export default intitWebRoutes;