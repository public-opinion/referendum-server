

import { intersection } from "../../util/arrays";
import { filterObjectByKeys } from "../../util/object";
import { get, all } from "../../db";

import express from "express";
import { getTopic, getTopics } from "../../services/topics";
import { parseQueryToColumns } from "../../db/util";
const router = express.Router();

router.get('/v1/domains', async (req, res) => {
  let {
    count = 5,
    q = "id, title, SUBSTRING(content, 1, 50)",
    sort
  }: {
    count?: number
    q?: string
    sort?: string
  } = req.query;

  let fields = parseQueryToColumns(q);
  let sanitizedFields = intersection(
    fields,
    [ "id", "title", "SUBSTRING(content, 1, 50)", "content" ]
  );
  let topics = await getTopics({
    count,
    fields: sanitizedFields
  });
  res.end(JSON.stringify(topics))
});




router.get('/v1/domain', async (req, res) => {
  let { id, q = "id, title" }: {
    id?: string | number
    q?: string
  } = req.query;

  let sanitizedFields = intersection(
    // TODO: I need a better parse function
    q.split(",").map(s => s.trim()),
    [ "id", "title", "content" ]
  );

  if(!id){
    return res.status(400).send({
        message: 'missing id when retrieving topic'
    });
  }

  let topic = await getTopic(id, sanitizedFields);
  res.end(JSON.stringify(topic));
})

export default router;