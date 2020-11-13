import express from "express";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import axios from "axios";

const { readFile } = require("fs").promises;

const app = express();
const port = 5000;

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, "../dist/assets")),
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  }),
  bodyParser.json({ limit: "50mb", extended: true }),
  cookieParser(),
];

middleware.forEach((it) => app.use(it));

app.get("/api/v1/goods", async (req, res) => {
  try {
    const listOfGoods = await readFile(`${__dirname}/../data/goods.json`, {
      encoding: "utf8",
    });
    res.json(JSON.parse(listOfGoods));
  } catch (err) {
    res.status(404).send("file is missing");
  }
});

app.get("/api/v1/rates", async (req, res) => {
  try {
    const ratesData = await axios(
      "https://api.exchangeratesapi.io/latest?base=USD"
    );

    const rates = ratesData.data.rates;

    res.send({ rates });
  } catch (err) {
    res.status(404).send("file is missing");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
