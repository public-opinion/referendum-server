

import createConn from "./dbconfig";

import { get as _get } from "./index";

/*
each file corresponds to one table? 
*/

// column definition
export type User = {
  id: number
  name?: string
  create?: string
}

async function initTable(){
  let conn = await createConn();
  conn.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
      name TEXT,
      password BINARY(60),
      created DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}
initTable();


