

import createConn, { get, all } from "../db";


createConn({
  multipleStatements: true
}).then(async conn => {
  await conn.query(`
    INSERT INTO topics
      ( id, title )
    VALUES
      ( 50505, "Unaffordable housing for general public" ),
      ( 12492, "Write a book together" ),
      ( 41242, "SFF PC Case Tier list *** weighted aspects" ),
      ( 35353, "Improve this site" )
    ON DUPLICATE KEY UPDATE id=id;
  `)

  
  console.log(await all("SELECT * FROM topics"));
  console.log(await get(`
    SELECT
      id, title, SUBSTRING(content, 1, 50)
    FROM topics
  `));
});