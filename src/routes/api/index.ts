


import express from "express";
const router = express.Router();

import createConn, { get, all } from "../../db";

import {
  /*
  filterObjectByKeys:
  This function is applied on database query result,
  so as to filter out sensitive information
  */
  filterObjectByKeys
} from "../../util/object";

createConn({
  multipleStatements: true
}).then(async conn => {
  await conn.query(`
    CREATE TABLE IF NOT EXISTS topics (
      id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
      title TEXT,
      content TEXT);

  
    INSERT INTO topics
      ( id, title )
    VALUES
      ( 50505, "Unaffordable housing for general public" ),
      ( 12492, "Write a book together" ),
      ( 41242, "SFF PC Case Tier list *** weighted aspects" ),
      ( 35353, "Improve this site" )
    ON DUPLICATE KEY UPDATE id=id;
  `)

  
  console.log(await all("SELECT * FROM topics"));
  console.log(await get("SELECT * FROM topics"));
});


router.get('/v1/topic', (req, res) => {
  let {
    id,
    q
  }: {
    id?: string | number
    q?: string
  } = req.query;


  get(
    "SELECT * FROM topics WHERE id = ?", [ id ]
  ).then((row: any) => {
    console.log(row);
    let sanitized_row = filterObjectByKeys(row, [
      'id', 'title'
    ]);
    
    res.end(JSON.stringify(sanitized_row));
  })
})

import topicsRoute from "./topics"
router.use(topicsRoute);



export default router;