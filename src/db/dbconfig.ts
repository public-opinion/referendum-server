


import mysql from "mysql2/promise";
import fs from "fs"
import path from "path/posix";


export async function createConnection(options?: mysql.ConnectionOptions){
  let connection = await mysql.createConnection(
    Object.assign({
      host     : process.env.MYSQL_HOST || 'localhost',
      // port: "33060",
      user     : process.env.MYSQL_USER || 'db_user',
      password : process.env.MYSQL_PASSWORD || fs.readFileSync(
        path.join(__dirname, "../../.secret/db_user_password"), {
          encoding: "utf8"
        }
      ),
      database : process.env.MYSQL_DB || 'referendum'
    }, options)
  );
  connection.connect();
  return connection;
}

export default createConnection;