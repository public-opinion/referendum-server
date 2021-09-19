

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(":memory:");

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
  return new Promise((res, reject) => {
    db.get(q, params, (err: any, row: any) => {
      if(err){
        reject(err);
      } else{
        res(row)
      }
    })
  });
}

export default db;