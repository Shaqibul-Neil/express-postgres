import express from "express";
import type { TApplication, TRequest, TResponse } from "./types/types";

const app: TApplication = express();
const port = 5000;

app.get("/", (req: TRequest, res: TResponse) => {
  res.send("Express Server with postgres");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
