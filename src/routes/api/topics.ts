

import { filterObjectByKeys } from "../../util/object";
import { all } from "../../db";

import express from "express";
const router = express.Router();

router.get('/v1/topics', (req, res) => {
  let {
    count = 5,
    sort
  }: {
    count?: number
    sort?: string
  } = req.query;


 
  all(
    "SELECT * FROM topics LIMIT ?", [ count ]
  ).then((row: any) => {
    console.log(row);
    let sanitized_row = filterObjectByKeys(row, [
      'id', 'title'
    ]);
    
    res.end(JSON.stringify(sanitized_row));
  })
});

export default router;