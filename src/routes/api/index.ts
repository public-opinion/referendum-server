


import express from "express";
const router = express.Router();

import topicsRoute from "./topics"
router.use(topicsRoute);

import domainsRoute from "./domains";
router.use(domainsRoute);

import usersRoute from "./users";
router.use(usersRoute);



export default router;