import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();
import bodyParser from "body-parser";
// import connection from "./config/connectDb";

const app = express();
const PORT = process.env.PORT || 8081;




// config view engine
configViewEngine(app);

// config body bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// test connection db
// connection();

// init web routes
initWebRoutes(app);


app.listen(PORT, () => {
  console.log(">> run backend the running port : " + PORT);
})