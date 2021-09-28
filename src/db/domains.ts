
import mysql from "mysql2/promise";

import createConn from "./dbconfig";

import { get as _get } from "./index";

/*
each file corresponds to one table? 
*/

// column definition
export type Domain = {
  id: number
  title?: string
  content?: string
}

async function initTable(){
  let conn = await createConn();
  conn.query(`
    CREATE TABLE IF NOT EXISTS domains (
      id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
      type TEXT,
      name TEXT,
      description TEXT)
  `);
}
initTable();
