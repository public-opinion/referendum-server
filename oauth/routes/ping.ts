
import type { Server } from "http";
import type {
  FastifyInstance,
  RouteShorthandOptions
} from 'fastify'

const opts: RouteShorthandOptions<Server> = {
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
    app: FastifyInstance<Server>
){
  app.get("/ping", opts, async (req, reply) => {
    return { pong: "it worked!" };
  })
}
