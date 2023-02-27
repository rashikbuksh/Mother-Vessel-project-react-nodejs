const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const nodemailer = require("nodemailer");

// MySQL
const mysql = require("mysql");
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "port_project",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extender: true }));


app.get("/user/verify_login/", (req, res) => {
    //console.log("verify login")
    const username = req.query.username;
    const password = req.query.password;
    console.log("data  "+username+" "+password)
    //console.log(email, password)
    const get_user = "select id,password from users where username = ?";
    db.query(get_user, [username], (err, result) => {
        //console.log(result)
        if (result.length === 0) {
            console.log("No user found");
            res.send("No user found");
        } else if (password === result[0].password) {
            console.log("login successful "+result[0].id.toString());
            res.send(result[0].id.toString());
        } else {
            console.log("wrong password");
            res.send("wrong password");
        }
        //res.send(result)
    });
});


app.get('/admin/getusers', (req,res)=>{
    const sqlSelect = "SELECT * from users";
    db.query(sqlSelect, (err, result)=>{
        //console.log(result)
        res.send(result);
    });
});

app.listen(3001, ()=>{
    console.log('Running on port 3001');
})