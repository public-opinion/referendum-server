




import express from "express";
import { createUser } from "../../services/users";
const router = express.Router();

router.post("/v1/user", async (req, res) => {
  let {
    name,
    password
  }: {
    name?: string
    password?: string
  } = req.body;

  if(!password){
    res.status(
      403
    ).json({
      error: "empty password"
    }).end();
    return;
  }
  
  try{
    let result = await createUser({
      name,
      password
    })
    res.json(result).end();
  } catch(e){
    console.error(e);
  }
})




export default router;