const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const { response } = require("express");
const async = require('async');


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mailchimp.setConfig({
    apiKey: "51ac9c52be6929474111c41589d2c65e-us12",
    server: "us12"
  });

app.get("/", (req, res) => res.sendFile(__dirname + "/signup.html"));

app.post("/", (req, res) => {

    const listId = "63bc491ee3";
    const fName = req.body.firstName;
    const lName = req.body.lastName;
    const userEmail = req.body.email;

    // async function run() {
    //     const response = await mailchimp.lists.addListMember(listId, {
    //       email_address: userEmail,
    //       status: "subscribed",
    //       merge_fields: {
    //         FNAME: fName,
    //         LNAME: lName
    //       }
    //     });
    // }

    // run();

    // console.log(Error.status);
    // res.send(response.sendStatus());

    // if(response.statusCode === 200) {
    //     console.log(response.header);
    //     res.sendFile(__dirname + "/success.html");
    // } else {
    //     console.log(response.statusCode);
    //     res.sendFile(__dirname + "/failure.html");
    // }

    // res.sendFile(__dirname + "/success.html");
    // console.log(response.statusCode);

    // run().catch(e => res.sendFile(__dirname + "/failure.html"));
    // console.log(response.statusCode);

    async function run() {
      try{
          const response = await mailchimp.lists.addListMember(listId, {
              email_address: userEmail,
              status: "subscribed",
              merge_fields: {
                  FNAME: fName,
                  LNAME: lName
              }
          });
          console.log(`Successfully added contact as an audience member. The contact's id is ${response.id}.`);
          res.sendFile(__dirname + "/success.html");
      } catch (e){
          console.log(e.status);
          res.sendFile(__dirname + "/failure.html");
      }

    } 
    run();
});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => console.log("Server started on port 3000"));

//  API KEY
// 51ac9c52be6929474111c41589d2c65e-us12

// List ID / audience ID
// 63bc491ee3

// server prefix
// us12

// if(response.statusCode >= 400)