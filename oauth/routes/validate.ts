import type {
  FastifyPluginCallback,
  FastifyPluginOptions
} from "fastify";
import { Server } from "http";

import { validatePassword } from "../../db/users";


function generateAccessToken(){

}
function generateRefreshToken(){

}



type FastifyPluginType = FastifyPluginCallback<
    FastifyPluginOptions, Server
>;
let validate: FastifyPluginType = async (app, opts, done) => {

  app.post("/validate", {
    schema: {
      body: {
        id: { type: "string" },
        password: { type: "string" },
      },
      response: {
        200: {
          type: "object",
          properties: {
            status: { type: "string" }
          }
        }
      }
    }
  }, async (req, reply) => {
    console.log("Hi");
    console.log(req.body);
    // validatePassword(req.body)
    return { "status": "ok" }
  })
}

export default validate;