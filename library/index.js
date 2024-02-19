import express from "express";
import { router } from "./routes.js";
const app = express();

app.use(express.static("/snap/library/public"));
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);
app.listen(3007);
