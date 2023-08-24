let express = require("express");
let bodyParser = require("body-parser");

let app = express();
app.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods",
    "GET,POST,OPTIONS,PUT,PATCH,DELETE,HEAD"
    );
    res.header(
        "Access-Control-Allow-Headers", 
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    next();

});
let axios = require("axios");
app.use(bodyParser.json());
const port = 2410;

let baseUrl = "https://jsonplaceholder.typicode.com";
app.listen(port, () => console.log(`Node app listening on port ${port}!`));

app.post("/myserver", async function(req,res){
    let{method,url,body1} = req.body
    
    try {
        if(method==="get"){
            console.log("inside if",url)
        let response = await axios.get(`${url}`)
        console.log(response.data)
        res.send(response.data);
        }
        else{
            console.log("inside else",url)
            let data1 = JSON.parse(body1)
            console.log(body1)
            let response = await axios.post(`${url}`,data1)
            console.log("resp", response)
            res.send(response.data);
        }
    }
    catch(error){
        if(error.response){
            let{status,statusText}= error.response;
            let response = {data : error.message, status :status}
            console.log(response)
            res.status(401).send(response.data)
        }
        else { res.status(404).send(error.message)}
    }

})