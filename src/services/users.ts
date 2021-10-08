

import bcrypt from "bcrypt";

import createConn from  "../../db/dbconfig"
import { get } from "../../db/util";

export async function createUser({
  name,
  password
}: {
  name?: string
  password: string // how to switch to buffer?
}): Promise<{
  status: string,
  msg?: string
}> {
  if(!name){
    return {
      status: "error",
      msg: "empty username"
    }
  }
  if(!password){
    return {
      status: "error",
      msg: "empty password"
    }
  }

  try{
    let [ hash, conn ] = await Promise.all([
      bcrypt.hash(password, 10),
      createConn()
    ]);

    console.log("hash:", hash);

    /*
    I don't like this method,
    it doesn't explicitly tell that the
    insert error is caused by duplicates

    INSERT INTO users (
      name, password
    ) SELECT * FROM (
      SELECT ?, ?
    ) AS tmp WHERE NOT EXISTS (
      SELECT * FROM users WHERE name=?
    ) LIMIT 1;

    
    // not working
    SELECT IF(
      EXISTS(
        SELECT * FROM users WHERE name=?
      ),
      'username exists',
      'ok no problem'
    ) AS result
    */
    let res = await conn.execute(`
      INSERT INTO users (
        name, password
      ) SELECT * FROM (
        SELECT ? as name, ? as password
      ) AS tmp WHERE NOT EXISTS (
        SELECT * FROM users WHERE name=?
      ) LIMIT 1;
    `, [ name, hash, name ]);
    let header = res?.[0]
    if("affectedRows" in header){
      if(header.affectedRows === 1
      && header.insertId
      // && header.info === "Records: 1  Duplicates: 0  Warnings: 0"
      ){
        return {
          status: "ok",
          msg: `user "${name}" created`
        };
      }
    }

    return {
      status: "error",
      msg: `user name "${name}" already exists`
    };

  } catch(e){
    console.error(e);
  }

  return {
    status: "error"
  }
}
/**
 * 
 * @param name 
 * @returns true if valid else false 
 */
export async function checkValidUsername(
  name: string
): Promise<boolean> {
  if(!name){
    return false;
  }
  let res = await get(`
    SELECT name FROM users WHERE name=?
  `, [ name ]);
  console.log("checkUsername:", res);
  return !res;
}