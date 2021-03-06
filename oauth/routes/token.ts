import type {
  FastifyPluginCallback,
  FastifyPluginOptions
} from "fastify";
import { Server } from "http";

type FastifyPluginType = FastifyPluginCallback<
    FastifyPluginOptions, Server
>;
let validate: FastifyPluginType = async (
    app, opts, done
) => {

  app.get("/token", {
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            status: { type: "string" },
          }
        }
      }
    }
  }, async (req, reply) => {
    
    return { "status": "ok" }
  })
}

export default validate;