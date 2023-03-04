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
    //console.log(email, password)
    const get_user =
        "select id,password,position from users where username = ?";
    db.query(get_user, [username], (err, result) => {
        //console.log(result)
        if (result.length === 0) {
            console.log("No user found");
            res.send("No user found");
        } else if (password === result[0].password) {
            res.send(result[0].id.toString() + ":" + result[0].position);
        } else {
            console.log("wrong password");
            res.send("wrong password");
        }
        //res.send(result)
    });
});

app.get("/admin/getusers", (req, res) => {
    const sqlSelect = "SELECT * from users";
    db.query(sqlSelect, (err, result) => {
        //console.log(result)
        res.send(result);
    });
});

app.post("/admin/enableuser", (req, res) => {
    const id = req.body.user_id;
    const sqlUpdate = "UPDATE users SET enabled=1 where id= ?";
    db.query(sqlUpdate, [id], (err, result) => {
        if (err) console.log(err);
        //console.log(result)
        res.send(result);
    });
});

app.post("/admin/disableuser", (req, res) => {
    const id = req.body.user_id;
    const sqlUpdate = "UPDATE users SET enabled=0 where id= ?";
    db.query(sqlUpdate, [id], (err, result) => {
        if (err) console.log(err);
        //console.log(result)
        res.send(result);
    });
});

app.post("/admin/resetpassword", (req, res) => {
    const id = req.body.user_id;
    const password = req.body.new_password;
    console.log(id + " " + password);
    const sqlUpdate = "UPDATE users SET password=? where id= ?";
    db.query(sqlUpdate, [password, id], (err, result) => {
        if (err) console.log(err);
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
    const create_user =
        "INSERT INTO users (name, username, password, position, department, enabled) VALUES (?,?,?,?,?,0)";
    db.query(
        create_user,
        [name, username, password, position, department],
        (err, result) => {
            if (err) console.log(err);
            console.log(result)
            res.send(result);
        }
    );
});

app.post("/admin/updateinfo", (req, res) => {
    console.log("update info in backend");
    const id = req.body.user_id;
    const name = req.body.new_name;
    const username = req.body.new_username;
    const position = req.body.new_position;
    const department = req.body.new_department;
    //console.log(name+" "+username+" "+password+" "+position+" "+department);
    const sqlUpdate =
        "UPDATE users SET name=?, username=?, position=?, department=? where id= ?";
    db.query(
        sqlUpdate,
        [name, username, position, department, id],
        (err, result) => {
            if (err) console.log(err);
            //console.log(result)
            // res.send(result).json({
            //     success: true,
            // });
        }
    );
});


app.post("/admin/deleteuser", (req, res) => {
    console.log("Delete info in backend");
    const id = req.body.user_id;
    const sqlDelete =
        "DELETE from users where id= ?";
    db.query(
        sqlDelete,
        [id],(err, result) => {
            if (err) console.log(err);
            //console.log(result)
            if(!err){
                res.send("success");
            }
            
        }
    );
});
//////////////////////MANAGEMENT/////////////////////////
//Insert Job Entry
app.post("/management/jobentry", (req, res) => {
    console.log("submit in backend");
    const order_number = req.body.order_number;
    const importer_name = req.body.importer_name;
    const mother_vessel_name = req.body.mother_vessel_name;
    const eta = req.body.eta;
    const commodity = req.body.commodity;
    const mv_location = req.body.mv_location;
    const bl_quantity = req.body.bl_quantity;
    const stevedore_name = req.body.stevedore_name;
    const stevedore_contact_number = req.body.stevedore_contact_number;
    const create_job =
        "INSERT INTO job_entry (order_number, importer_name, mother_vessel_name, eta, commodity, mv_location, bl_quantity, stevedore_name, stevedore_contact_number) VALUES (?,?,?,?,?,?,?,?,?)";
    db.query(
        create_job,
        [order_number, importer_name, mother_vessel_name, eta, commodity, mv_location, bl_quantity, stevedore_name, stevedore_contact_number],
        (err, result) => {
            if (err) console.log(err);
            console.log(result)
            res.send(result);
        }
    );
});
//Get Job Entry
app.get("/management/getjobentry", (req, res) => {
    const sqlSelect = "SELECT * from job_entry";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});
//Update Job Entry
app.post("/management/updatejobentry", (req, res) => {
    console.log("update job info in backend");
    const id = req.body.id;
    const order_number = req.body.new_order_number;
    const importer_name = req.body.new_importer_name;
    const mother_vessel_name = req.body.new_mother_vessel_name;
    const eta = req.body.new_eta;
    const commodity = req.body.new_commodity;
    const mv_location = req.body.new_mv_location;
    const bl_quantity = req.body.new_bl_quantity;
    const stevedore_name = req.body.new_stevedore_name;
    const stevedore_contact_number = req.body.new_stevedore_contact_number;
    //console.log(id);
    const sqlUpdate =
        "UPDATE job_entry SET order_number=?, importer_name=?, mother_vessel_name=?, eta=?, commodity=?, mv_location=?, bl_quantity=?, stevedore_name=?, stevedore_contact_number=? where id= ?";
    db.query(
        sqlUpdate,
        [order_number, importer_name, mother_vessel_name, eta, commodity, mv_location, bl_quantity, stevedore_name, stevedore_contact_number, id],
        (err, result) => {
            if (err) console.log(err);
            //console.log(result)
            // res.send(result).json({
            //     success: true,
            // });
        }
    );
});
//Delete Job Entry
app.post("/management/deletejob", (req, res) => {
    console.log("Delete job in backend");
    const id = req.body.job_id;
    const sqlDelete =
        "DELETE from job_entry where id= ?";
    db.query(
        sqlDelete,
        [id],(err, result) => {
            if (err) console.log(err);
            //console.log(result)
            if(!err){
                res.send("success");
            }
            
        }
    );
});

app.listen(3001, () => {
    console.log("Running on port 3001");
});
