
import createConn from "./dbconfig";

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

/**
 * 
 * @param q 
 * example query string:
 * "id, title, content(substr(3, 4))"
 * "id, title, SUBSTRING(content, 3, 4)"
 * @returns 
 */
export function splitQueryByGroup(q: string): string[] {
  // TODO: bracket errors, e.g. "content(substr(3, 4))))"
  let out = [];

  let word = "";
  let insideBracket = 0;
  for(let c of q){ // TODO: unicode char problem might arise
    switch(c){
    case ',':
      if(insideBracket){
        word += c;
      } else{
        out.push(word);
        word = "";
      }
      break;
    case '(': // TODO: support nested brackets
      insideBracket += 1;
      word += c;
      break;
    case ')':
      insideBracket -= 1;
      word += c;
      break;
    default:
      word += c;
    }
  }
  if(word){
    out.push(word);
  }

  return out.map(s => s.trim());
}