
import mysql, { escape } from "mysql2";

import createConn from "../db";
import { get, all, parseQueryToColumns } from "../db/util";

/**
 * 
 * !IMPORTANT! sanitize user input!!!!!
 * @param count 
 * @param {string | string[]} fields = "id, title"
 * @param sort 
 * @returns 
 */
export async function getDomains(
  count: number = 5,
  fields: string | string[] = "id, title",
  sort?: string
){
  if(Array.isArray(fields)){
    fields = fields.join(",");
  }
  return all(
    `SELECT ${fields} FROM domains LIMIT ?`,
    [ count ]
  );
}
