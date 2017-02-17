var http = require("http");
var url = require("url");
var crypto = require("crypto");

function sha1(str){
  var md5sum = crypto.createHash("sha1");
  md5sum.update(str);
  str = md5sum.digest("hex");
  return str;
}

function validateToken(req,res){
  console.log(req.url);
  var query = url.parse(req.url,true).query;
  //console.log("*** URL:" + req.url);
  //console.log(query);
  console.log(query);
  var signature = query['msg_signature'];
  var echostr = query.echostr;
  var timestamp = query['timestamp'];
  var nonce = query.nonce;
  var oriArray = new Array();
  oriArray[0] = nonce;
  oriArray[1] = timestamp;
  oriArray[2] = "pluo";//这里是你在微信开发者中心页面里填的token，而不是****
  oriArray.sort();
  var original = oriArray.join('');
  console.log("Original str : " + original);
  var scyptoString = sha1(original);
  console.log("Signature : " + signature );
  
    res.end(echostr);
    console.log("Confirm and send echo back");
 
}


var webSvr = http.createServer(wechat);
webSvr.listen(80,function(){
  console.log("Start validate");
});

function wechat(req, res) {
    var echostr, nonce, signature, timestamp;
    signature = req.query.signature;
    timestamp = req.query.timestamp;
    nonce = req.query.nonce;
    echostr = req.query.echostr;
    if(check(timestamp,nonce,signature,your_token)){
        return res.send(echostr);
    }else{
        return res.end();
    }
};

function check(timestamp, nonce, signature ,token) {
    var currSign, tmp;
    tmp = [token, timestamp, nonce].sort().join("");
    currSign = crypto.createHash("sha1").update(tmp).digest("hex");
    return currSign === signature;
};