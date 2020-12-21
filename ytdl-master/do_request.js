module.exports=function(requestedURL)
{
    var http = require("http");

    let proxies=[
        {host:'p.webshare.io',port:80,user:'cdhfrnap-1',pass:'kbzp80rtwnpa'},
        {host:'p.webshare.io',port:80,user:'cdhfrnap-2',pass:'kbzp80rtwnpa'},
        {host:'p.webshare.io',port:80,user:'cdhfrnap-3',pass:'kbzp80rtwnpa'},
        {host:'p.webshare.io',port:80,user:'cdhfrnap-4',pass:'kbzp80rtwnpa'},
        {host:'p.webshare.io',port:80,user:'cdhfrnap-5',pass:'kbzp80rtwnpa'}
    ]
    let proxy=proxies[Math.round((Math.random()*4))];
    console.log(proxy);
    var options = {
        host: proxy.host,
        port: proxy.port,
        path: requestedURL,
        headers:    {
            'Proxy-Authorization':  'Basic ' + Buffer.from(proxy.user + ':' + proxy.pass).toString('base64')
        }
    };

    return new Promise(function(resolve,reject){
        var request = http.request(options, function(response) {
            var chunks = [];
            response.on('data', function(chunk) {
                chunks.push(chunk);
            });
            response.on('end', function() {
                let response_data=Buffer.concat(chunks).toString();
                //console.log('Response', response_data);
                resolve(response_data);
                //return;
            });
        });
    
        request.on('error', function(error) {
            console.log(error.message);
        });
    
        request.end();
    });
}