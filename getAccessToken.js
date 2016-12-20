var https = require("https");

https.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx793dac769e62bc72&secret=35474440b83ca428feca4a6707442155', (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });

}).on('error', (e) => {
  console.error(e);
});