

import mysql from "mysql2/promise";

import createConn from "./dbconfig";

export { default as default } from "./dbconfig";

// db.serialize(function(){
  
//   db.run("CREATE TABLE lorem (info TEXT)");

//   var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//   for (var i = 0; i < 10; i++) {
//       stmt.run("Ipsum " + i);
//   }
//   stmt.finalize();

//   db.each("SELECT rowid AS id, info FROM lorem",
//     function(err: any, row: any) {
//       console.log(row.id + ": " + row.info);
//     }
//   );
// });

export async function get(q: string, params?: any[]){
  let conn = await createConn();
  let [ rows, _ ] = await conn.query(q, params);
  if(rows instanceof Array){
    return rows?.[0]
  } else{
    return rows;
  };
}


export async function all(q: string, params?: any[]){
  let conn = await createConn();
  let [ rows, fields ] = await conn.query(q, params);
  return rows;
}