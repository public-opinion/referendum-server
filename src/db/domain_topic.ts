
import mysql from "mysql2/promise";

import createConn from "./dbconfig";

import { get as _get } from "./index";

/*
each file corresponds to one table? 
*/

// column definition
export type Topic = {
  id: number
  title?: string
  content?: string
}

async function initTable(){
  let conn = await createConn();
  conn.query(`
    CREATE TABLE IF NOT EXISTS domain_topic (
      domain_id INTEGER,
      topic_id INTEGER)
  `);
}
initTable();


export async function getTopicsOfDomain(
  
){

}