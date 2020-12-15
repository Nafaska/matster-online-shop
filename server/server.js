import express from "express";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import axios from "axios";

const { readFile, unlink, writeFile } = require("fs").promises;

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

const readFileData = async (res) => {
  let obj;
  try {
    const text = await readFile(`${__dirname}/../data/logs.json`, {
      encoding: "utf8",
    });
    obj = JSON.parse(text);
  } catch (err) {
    console.error(`${err}: file is missing or there are no data exist`);
  }
  return obj;
};

app.get("/api/v1/goods", async (req, res) => {
  try {
    const listOfGoods = await readFile(`${__dirname}/../data/goods.json`, {
      encoding: "utf8",
    });
    res.json(JSON.parse(listOfGoods));
  } catch (err) {
    res.status(404).send("the file is missing");
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

app.get("/api/v1/logs", async (req, res) => {
  try {
    const fileData = await readFileData();
    if (typeof fileData === "undefined") {
      res.status(404).send("file is missing or there are no data exist");
    } else {
      res.send(fileData);
    }
  } catch (err) {
    res.status(404).send(`${err}: something went wrong`);
  }
});

app.post("/api/v1/logs", async (req, res) => {
  try {
    const existedData = await readFileData();
    if (typeof existedData === "undefined") {
      await writeFile(
        `${__dirname}/../data/logs.json`,
        JSON.stringify([req.body]),
        {
          encoding: "utf8",
        }
      );
    } else {
      await writeFile(
        `${__dirname}/../data/logs.json`,
        JSON.stringify([...existedData, req.body]),
        {
          encoding: "utf8",
        }
      );
    }
    res.send("done");
  } catch (err) {
    res.status(404).send("file is missing");
  }
});

app.delete("/api/v1/logs", async (req, res) => {
  try {
    await unlink(`${__dirname}/../data/logs.json`);
    res.status(200).send("file deleted");
  } catch (err) {
    res.status(404).send("file is already deleted");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
