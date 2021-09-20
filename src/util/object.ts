

export function filterObjectByKeys<T extends Object> (
  obj: T,
  keys: Array<keyof T>
): Partial<T> {
  let out: Partial<T> = {};
  for(let k of keys){
    if(obj?.hasOwnProperty(k)){
      out[k] = obj[k];
    }
  }
  return out;
}