


import express from "express";
const router = express.Router();

import topicsRoute from "./topics"
router.use(topicsRoute);



export default router;