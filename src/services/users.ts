

import bcrypt from "bcrypt";

import createConn from  "../db/dbconfig"

export async function createUser({
  name,
  password
}: {
  name?: string
  password: string // how to switch to buffer?
}){
  if(!name){

  }


  try{
    let [ hash, conn ] = await Promise.all([
      bcrypt.hash(password, 10),
      createConn()
    ]);
    let res = await conn.query(`
      INSERT INTO users (
        name, password
      ) VALUES (
        ?, ?
      )
    `, [ name, hash ]);
    return res;

  } catch(e){
    console.error(e);
  }
}