
import mysql, { escape } from "mysql2";

import createConn from "../db";
import { get } from "../db/topics";
import { all } from "../db/util";

async function initTable(){
  let conn = await createConn();
  conn.query(`
    CREATE TABLE IF NOT EXISTS topics (
      id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
      title TEXT,
      content TEXT)
  `);
}
initTable();

/**
 * 
 * !IMPORTANT! sanitize user input!!!!!
 * @param count 
 * @param {string | string[]} fields = "id, title"
 * @param sort 
 * @returns 
 */
export async function getTopics(
  count: number = 5,
  fields: string | string[] = "id, title",
  sort?: string
){
  if(Array.isArray(fields)){
    fields = fields.join(",");
  }
  let conn = await createConn();
  let out = await conn.query(
    `SELECT ${fields} FROM topics LIMIT ?`,
    [ count ]
  );

  return out[0];
}



export async function getTopic(
  id: string | number,
  fields?: string | string[]
){
  if(typeof id === "string"){
    id = parseInt(id, 10);
  }
  if(typeof fields === "string"){
    fields = fields.split(',').map(s => s.trim());
  }

  return get(id, fields);
}

export async function createTopic(){

}