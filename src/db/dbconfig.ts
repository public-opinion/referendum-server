


import mysql from "mysql2/promise";
import fs from "fs"
import path from "path/posix";


export async function createConnection(options?: mysql.ConnectionOptions){
  let connection = await mysql.createConnection(Object.assign({
    host     : 'localhost',
    user     : 'db_user',
    password : process.env.DATABASE_PASSWORD || fs.readFileSync(
      path.join(__dirname, "../.secret/db_user_password"), {
        encoding: "utf8"
      }
    ),
    database : 'referendum'
  }, options));
  connection.connect();
  return connection;
}

export default createConnection;