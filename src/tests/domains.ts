

import createConn, { get, all } from "../../db";


createConn({
  multipleStatements: true
}).then(async conn => {
  await conn.query(`
    INSERT INTO domains
      ( id, type, name )
    VALUES
      ( 232, "website", "referendum" ),
      ( 424, "arts", "book" ),
      ( 552, "city", "Hong Kong" ),
      ( 622, "pc", "SFFPC" )
    ON DUPLICATE KEY UPDATE id=id;
  `)
});