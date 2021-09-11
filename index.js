const axios = require("axios");
const express = require("express");

require("dotenv").config();

if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config();
}

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/dist_react/build"));


app.post("/distance",(req,res)=>{
    let kms = 0;
    axios.get(`https://www.distance24.org/route.json?stops=${req.body.obj.source}|${req.body.obj.destination}`).then((ress)=>{
      res.send(ress.data);
    }).catch((err)=>{
        console.log(err);
    })
    
})
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/dist_react/build/index.html");
  });
  
app.listen(process.env.PORT || 4000, function () {
  console.log("Sever Running");
});