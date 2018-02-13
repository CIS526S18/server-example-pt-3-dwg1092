/**@module mutlipart
 * a module for parsing multipart form bodies
 */

module.exports = multipart;

function multipart(req, res, next){
    var chunks = [];

    req.on('data', function(chunk){
        chunks.push(chunk);
    });

    req.on('end', function(){
        var buffer = Buffer.concat(chunks);
        var match = /boundary=(.+);?/.exec(req.headers['content-type']);
        if(match){
            //TODO parse body
           res.body = parseMultipartBody(match[1]);
           next(req, res);
        }else{
            res.statusCode = 500;
            res.end("Server Error");
        }
    });

    req.on('error', function(){
        console.aror(err);
        statusCode = 500;
        res.end("Server error")
    });
}