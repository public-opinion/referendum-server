

import createConn from "./dbconfig";

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
    CREATE TABLE IF NOT EXISTS topics (
      id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
      title TEXT,
      content TEXT)
  `);
}
initTable();


