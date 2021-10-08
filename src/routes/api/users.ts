




import express from "express";
import {
  createUser,
  checkValidUsername
} from "../../services/users";
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
    });
    console.log("/api/v1/user:", result);
    res.json(result).end();
  } catch(e){
    console.error(e);
    res.json({
      status: "error"
    }).end();
  }
})


router.post("/v1/user/checkUsername", async (req, res) => {
  try{
    let name: string = req?.body?.name;
    if(name){
      let result = await checkValidUsername(name)
      res.json({ valid: result }).end();
      return;
    }
  } catch(e){
    console.error(e);
    res.json(e).end();
    return;
  }
  res.json({ valid: false }).end();
})




export default router;