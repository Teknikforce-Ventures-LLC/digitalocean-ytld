//app to take website screenshot
const app=require("express")();
var createScreenshot=require("capture-website");
const sharp=require("sharp");

const bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

app.get("/",function(req,res){
    res.sendStatus(500);
    res.send("404");
});
function compressImage($img_buffer)
{
    return new Promise((resolve,reject)=>{
        sharp($img_buffer)
        .resize(220)
        .toBuffer()
        .then( data => {resolve(data); })
        .catch( err => { resolve(false); });
    });
}
app.post("/create",async function(req,res){
    let data={error:true,data:"",reason: "Unknown"};
    try
    {
        console.log(req.body);
        //console.log(req.body.target_url);
        if(req.body.target_url !==undefined)
        {
            let url=new URL(req.body.target_url);
            console.log(url);
            url=url.href;
            let img_data=await createScreenshot.base64(url);
            img_data=await compressImage(img_data);
            if(img_data===false)
            {
                throw new Error("Unable to compress image");
            }
            data.data=img_data.toString('base64');
            data.error=false;
        }
        else
        {
            throw new Error("Invalid URL");
        }
    }
    catch(err){data.reason=err.message;}
    res.send(JSON.stringify(data));
});

const port=process.env.PORT||3001;
app.listen(port);