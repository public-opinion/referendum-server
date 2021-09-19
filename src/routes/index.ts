

import http2 from "http2";
import http from "http";
import axios from "axios";
// import net from "net"

import express from "express";
import { RSA_NO_PADDING } from "constants";
const router = express.Router();


async function respondsWith(
  res: express.Response,
  url: string = "http://localhost:8080",
  // type: string = "text/html; charset=utf-8"
){
  let _res = await axios.get(url, {
    responseType: "arraybuffer"
  });
  res.type(_res.headers["content-type"]);
  res.end(_res.data);
  return _res;
}
function redirectToDevServer(
    req: express.Request,
    res: express.Response<any>
){
  return respondsWith(res,
      "http://localhost:8080" + req.path
  );
}

/* GET home page. */
router.get(/.*/, async function(req, res, next) {
  // let _req = http.request(
  //   "http://localhost:8080" + req.path
  // )
  // _req.on('response', _res => {
  //   _res.pipe(res);
  // }).end()
  try{
    await redirectToDevServer(req, res);
  } catch(e: any){
    if(e?.response?.status == 404){ // react-scripts fall back
      respondsWith(res,
        "http://localhost:8080"
      );
    }
  }
  
  // await axios.get("http://localhost:8080/topic");
});

router.connect(/.*/, (req, res) => {
  console.log("CONNECT!!!!!!!!");
})


/*
  const client = http2.connect("http://localhost:3001");
  client.request({
    method: req.method,
    ':path': req.path,
  }).setEncoding(
    "utf-8"
  ).pipe(res).end();
  // req.socket.pipe(client.socket).pipe(res);
  // req.pipe(client.request()).pipe(res);
  // res.render('index', { title: 'Express' });

*/

export default router;
