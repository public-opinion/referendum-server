


import express from "express";
const router = express.Router();

import db, { get } from "../../db";



db.serialize(() => {
  let _run = (q: string) => {
    db.run(q, 
      (err: any) => {
        if(err){
          console.log(q + "failed", err);
        }
      }
    )
  }

  _run(`
    CREATE TABLE topics (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      title TEXT,
      content TEXT)
  `)

  _run(`
    INSERT INTO topics
      ( id, title )
    VALUES
      ( 12492, "Write a book together" )
  `)

  
  db.each("SELECT * FROM topics",
    function(err: any, row: any) {
      console.log(row);
    }
  );
  db.get("SELECT * FROM topics",
    function(err: any, row: any) {
      console.log(row);
    }
  );

})

router.get('/v1/topic', (req, res) => {
  let {
    id,
    q
  }: {
    id?: string | number
    q?: string
  } = req.query;


  new Promise(
    _res => setTimeout(_res, 1000)
  ).then(() => 
    get("SELECT * FROM topics WHERE id = ?", [ id ])
  ).then((row: any) => {
    console.log(row);
    
    res.end(JSON.stringify({
      title: row?.title
    }));
  })
})



export default router;