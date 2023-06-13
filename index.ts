import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import words from "./words";
import axios from "axios";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  fetchData();
});

const fetchData = async () => {
  let currentWord = 0;

  while (true) {
    await sleep(1000);
    console.log(currentWord);
    try {
      const response = await axios.get(
        "https://api.dictionaryapi.dev/api/v2/entries/en/" +
          words[currentWord]
      );
      console.log(response.status);
    } catch (error) {}
    currentWord++;
  }
};
