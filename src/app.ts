
import path from "path";

import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan"

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

import apiRouter from "./routes/api"; app.use('/api', apiRouter);
import indexRouter from "./routes/index"; app.use(indexRouter);
import usersRouter from "./routes/users"; app.use('/', usersRouter);

import "./services/topics";
import "./tests/topics";
import "./tests/domains";

export default app;
