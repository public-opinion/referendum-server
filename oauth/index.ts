

import { readFileSync } from "fs";
import path from "path";
import type {
  Server,
} from 'http';

import type {
  FastifyInstance,
  RouteShorthandOptions
} from 'fastify'
import Fastify from 'fastify'

// yarn exec .\node_modules\.bin\ts-node.cmd .\oauth\index.ts
// yarn run nodemon .\oauth\index.ts

const app: FastifyInstance<Server> = Fastify({
  logger: true,
});


import validate from "./routes/validate";
app.register(validate, { prefix: "/oauth" });

import registerPing from "./routes/ping";
registerPing(app);



const start = async () => {
  try{
    await app.listen(3000, '0.0.0.0');

    const [ address, port ] = ((info) => {
      if(typeof info === "string"){
        return [ info, info ];
      }

      return [ info?.address, info?.port ]
    })(app.server.address());

    console.log(`server listening at ${address}:${port}`)
  } catch(e){
    app.log.error(e);
    process.exit(1);
  }
}
start()

