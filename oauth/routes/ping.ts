

import type {
  Http2SecureServer,
  Http2ServerRequest,
  Http2ServerResponse
} from 'http2';
import type {
  FastifyInstance,
  RouteShorthandOptions
} from 'fastify'

const opts: RouteShorthandOptions<Http2SecureServer> = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          pong: {
            type: "string"
          }
        }
      }
    }
  }
}

export default function registerPing(
    app: FastifyInstance<Http2SecureServer>
){
  app.get("/ping", opts, async (req, reply) => {
    return { pong: "it worked!" };
  })
}
