

import { readFileSync } from "fs";
import path from "path";
import type {
  Http2SecureServer,
  Http2ServerRequest,
  Http2ServerResponse
} from 'http2';

import type {
  FastifyInstance,
  RouteShorthandOptions
} from 'fastify'
import Fastify from 'fastify'

// yarn exec .\node_modules\.bin\ts-node.cmd .\oauth\index.ts
// yarn run nodemon .\oauth\index.ts

const app: FastifyInstance<Http2SecureServer> = Fastify({
  logger: true,
  http2: true,
  https: {
    allowHTTP1: true,
    key: readFileSync(path.join(__dirname, "..", ".secret", "oauth_key.key")),
    cert: readFileSync(path.join(__dirname, "..", ".secret", "oauth_key.crt")),
  }
});


import validate from "./routes/validate";
app.register(validate);

import registerPing from "./routes/ping";
registerPing(app);



const start = async () => {
  try{
    await app.listen(3000);

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

