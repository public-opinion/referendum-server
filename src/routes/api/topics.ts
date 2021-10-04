

import { intersection } from "../../util/arrays";
import { filterObjectByKeys } from "../../util/object";
import { get, all } from "../../../db";

import express from "express";
import { createTopic, getTopic, getTopics } from "../../services/topics";
import { parseQueryToColumns } from "../../../db/util";
const router = express.Router();


function sanitizeColumns(
  q: string | string[],
  filter: string[]
){
  let fields: string[];
  if(Array.isArray(q)){
    fields = q;
  } else{
    fields = parseQueryToColumns(q);
  }

  return intersection(fields, filter);
}

router.get('/v1/topics', async (req, res) => {
  let {
    count = 5,
    q = "id, title, SUBSTRING(content, 1, 50)",
    sort,
    start
  }: {
    count?: number
    q?: string
    sort?: string
    start?: number
  } = req.query;

  let sanitizedFields = sanitizeColumns(
    q,
    [ "id", "title", "SUBSTRING(content, 1, 50)", "content" ]
  );

  if(typeof start === "string"){ start = parseInt(start); }
  if(typeof count === "string"){ count = parseInt(count); }
  let topics = await getTopics({
    count,
    fields: sanitizedFields,
    start
  });
  res.end(JSON.stringify(topics))
});


router.post('/v1/topic/create', async (req, res) => {
  try{
    console.log("POST /v1/topic:", req.body);
    await createTopic(req.body);
    res.end(JSON.stringify({
      status: "ok"
    }));
  } catch(e){
    console.log("error: POST /v1/topic/create\n", e);
    res.status(500).end(JSON.stringify(e));
  }
})


router.get('/v1/topic', async (req, res) => {
  let { id, q = "id, title" }: {
    id?: string | number
    q?: string
  } = req.query;

  if(!id){
    return res.status(400).send({
        message: 'missing id when retrieving topic'
    });
  }

  let sanitizedFields = sanitizeColumns(
    q,
    [ "id", "title", "content" ]
  );
  let topic = await getTopic(id, sanitizedFields);
  res.end(JSON.stringify(topic));
})



export default router;