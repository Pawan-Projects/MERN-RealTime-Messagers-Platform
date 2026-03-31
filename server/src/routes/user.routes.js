import express from "express";
import { getAlluser } from "../controller/user.controller.js";

const router = express.Router();

router.get("/all", getAlluser);


export default router;