

export function intersection<T> (arr1: T[], arr2: T[]): T[] {
  if(arr2.length > arr1.length){
    [ arr1, arr2 ] = [ arr2, arr1 ];
  }

  let set1 = new Set(arr1);
  let set2 = new Set(arr2);
  let out: T[] = [];
  for(let elem of set1){
    if(set2.has(elem)){
      out.push(elem);
    }
  }
  return out;
}