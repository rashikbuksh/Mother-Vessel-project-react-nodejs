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

app.post('/admin/enableuser', (req,res)=>{
    const id = req.body.user_id;
    const sqlUpdate = "UPDATE users SET enabled=1 where id= ?";
    db.query(sqlUpdate, [id], (err, result)=>{
        if(err) console.log(err);
        //console.log(result)
        res.send(result);
    });
});

app.post('/admin/disableuser', (req,res)=>{
    const id = req.body.user_id;
    const sqlUpdate = "UPDATE users SET enabled=0 where id= ?";
    db.query(sqlUpdate, [id], (err, result)=>{
        if(err) console.log(err);
        //console.log(result)
        res.send(result);
    });
});

app.post('/admin/resetpassword', (req,res)=>{
    const id = req.body.user_id;
    const password = req.body.new_password;
    console.log(id+" "+password)
    const sqlUpdate = "UPDATE users SET password=? where id= ?";
    db.query(sqlUpdate, [password, id], (err, result)=>{
        if(err) console.log(err);
        //console.log(result)
        res.send(result);
    });
});

app.post("/user/register", (req, res) => {
    console.log("submit in backend");
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    const position = req.body.position;
    const department = req.body.department;
    //console.log(name+" "+username+" "+password+" "+position+" "+department);
    const create_user = "INSERT INTO users (name, username, password, position, department, enabled) VALUES (?,?,?,?,?,0)";
    db.query(create_user, [name, username, password, position, department], (err, result) => {
        if (err) console.log(err);
        //console.log(result)
        res.send(result);
    });
});

app.listen(3001, ()=>{
    console.log('Running on port 3001');
})