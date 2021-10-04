
import mysql, { escape } from "mysql2";

import createConn from "../../db";
import { get, all, parseQueryToColumns } from "../../db/util";

/**
 * 
 * !IMPORTANT! sanitize user input!!!!!
 * @param count 
 * @param {string | string[]} fields = "id, title"
 * @param sort 
 * @returns 
 */
export async function getTopics({
  count = 5,
  fields = "id, title",
  start = 0,
  sort
}: {
  count?: number
  start?: number
  sort?: string
  fields?: string | string[]
} = {}){
  if(Array.isArray(fields)){
    fields = fields.join(",");
  }

  console.log(typeof start, typeof count, start, count)

  let sql = `SELECT ${fields} FROM topics LIMIT ?`
  let params = [ count ];
  if(start){
    sql += ", ?";
    params.unshift(start);
  }
  return all(sql, params);
}



export async function getTopic(
  id: string | number,
  fields: string | string[] = "id, title"
){
  if(typeof id === "string"){
    id = parseInt(id, 10);
  }
  if(typeof fields === "string"){
    fields = parseQueryToColumns(fields);
  }

  return get(
    "SELECT ?? FROM topics WHERE id = ?",
    [ fields, id ]
  );
}

export async function createTopic({
  title, content
}: {
  title: string
  content: string
}){
  let conn = await createConn();
  let res = await conn.query(`
    INSERT INTO topics (
      title, content
    ) VALUES (
      ?, ?
    )
  `, [ title, content ])
  console.log("topic created:", res);
}