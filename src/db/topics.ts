

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



export async function get(
  id: number,
  columns?: string[]
){
  if(!columns || columns.length == 0){
    columns = [ "id", "title" ]
  }
  return _get(
    "SELECT ?? FROM topics WHERE id = ?",
    [ columns, id ]
  )
}