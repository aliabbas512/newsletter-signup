const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

    var fName = "First Name";
    var lName = "Last Name";
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email; 

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    }
    
    const jsonData = JSON.stringify(data);
    // console.log(firstName, lastName, email);

    const url = "https://us9.api.mailchimp.com/3.0/lists/4ac3ab707c";
    const options = {
        method: "post",
        auth: "ali1:8abf86b64e278c95c1e8443a1a024cd8-us9"
    }

   const request = https.request (url, options, function(response){
    
    if (response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
    }   else {
        res.sendFile(__dirname + "/failure.html")
    }
    
    response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000.");
});

//apiKey
// 1bbc863fc4c50731b2ed9ac506c69b73-us9
// 8abf86b64e278c95c1e8443a1a024cd8-us9

// list ID
//4ac3ab707c