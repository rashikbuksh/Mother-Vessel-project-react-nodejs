const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const nodemailer = require("nodemailer");

// MySQL
const mysql = require("mysql");
const { urlencoded } = require("body-parser");
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


//Insert Record Entry
app.post("/management/recordentry", (req, res) => {
    console.log("submit in backend");
    const order_number = req.body.order_number;
    const job_number = req.body.job_number;
    const date_from_charpotro = req.body.date_from_charpotro;
    const cp_number_from_charpotro = req.body.cp_number_from_charpotro;
    const LA_name = req.body.LA_name;
    const LV_name = req.body.LV_name;
    const dest_from = req.body.dest_from;
    const dest_to = req.body.dest_to;
    const commodity = req.body.commodity;
    const capacity = req.body.capacity;
    const rate = req.body.rate;
    const LV_master_name = req.body.LV_master_name;
    const LV_master_contact_number = req.body.LV_master_contact_number;
    const create_record =
        "INSERT INTO record_entry (order_number, job_number, date_from_charpotro, cp_number_from_charpotro, LA_name, LV_name, dest_from, dest_to, commodity, capacity, rate, LV_master_name, LV_master_contact_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(
        create_record,
        [order_number, job_number, date_from_charpotro, cp_number_from_charpotro, LA_name, LV_name, dest_from, dest_to, commodity, capacity, rate, LV_master_name, LV_master_contact_number],
        (err, result) => {
            if (err) console.log(err);
            console.log(result)
            res.send(result);
        }
    );
});
//Get record Entry
app.get("/management/getrecordentry", (req, res) => {
    const sqlSelect = "SELECT * from record_entry";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});
//Update Job Entry
app.post("/management/updaterecordentry", (req, res) => {
    console.log("update job info in backend");
    const id = req.body.id;
    const order_number = req.body.order_number;
    const job_number = req.body.job_number;
    const date_from_charpotro = req.body.date_from_charpotro;
    const cp_number_from_charpotro = req.body.cp_number_from_charpotro;
    const LA_name = req.body.LA_name;
    const LV_name = req.body.LV_name;
    const dest_from = req.body.dest_from;
    const dest_to = req.body.dest_to;
    const commodity = req.body.commodity;
    const capacity = req.body.capacity;
    const rate = req.body.rate;
    const LV_master_name = req.body.LV_master_name;
    const LV_master_contact_number = req.body.LV_master_contact_number;
    //console.log(id);
    const sqlUpdate =
        "UPDATE record_entry SET order_number=?, job_number=?, date_from_charpotro=?, cp_number_from_charpotro=?, LA_name=?, LV_name=?, dest_from=?, dest_to=?, commodity=?, capacity=?, rate=?, LV_master_name=?, LV_master_contact_number=? where id= ?";
    db.query(
        sqlUpdate,
        [order_number, job_number, date_from_charpotro, cp_number_from_charpotro, LA_name, LV_name, dest_from, dest_to, commodity, capacity, rate, LV_master_name, LV_master_contact_number, id],
        (err, result) => {
            if (err) console.log(err);
            //console.log(result)
            // res.send(result).json({
            //     success: true,
            // });
        }
    );
});
//Delete Record Entry
app.post("/management/deleterecord", (req, res) => {
    console.log("Delete record in backend");
    const id = req.body.record_id;
    const sqlDelete =
        "DELETE from record_entry where id= ?";
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



//Insert Current Status
app.post("/management/currentstatus", (req, res) => {
    console.log("submit in backend");
    const LV_name = req.body.LV_name;
    const date_from_charpotro = req.body.date_from_charpotro;
    const commodity = req.body.commodity;
    const LA = req.body.LA;
    const dest_from = req.body.dest_from;
    const dest_to = req.body.dest_to;
    const current_location = req.body.current_location;
    const remark = req.body.remark;
    const create_current_status =
        "INSERT INTO current_status (LV_name, date_from_charpotro, commodity, LA, dest_from, dest_to, current_location, remark) VALUES (?,?,?,?,?,?,?,?)";
    db.query(
        create_current_status,
        [LV_name, date_from_charpotro, commodity, LA, dest_from, dest_to, current_location, remark],
        (err, result) => {
            if (err) console.log(err);
            console.log(result)
            res.send(result);
        }
    );
});
//Get record Entry
app.get("/management/getcurrentstatus", (req, res) => {
    const sqlSelect = "SELECT * from current_status";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});
//Update Job Entry
app.post("/management/updatecurrentstatus", (req, res) => {
    console.log("update job info in backend");
    const id = req.body.id;
    const LV_name = req.body.LV_name;
    const date_from_charpotro = req.body.date_from_charpotro;
    const commodity = req.body.commodity;
    const LA = req.body.LA;
    const dest_from = req.body.dest_from;
    const dest_to = req.body.dest_to;
    const current_location = req.body.current_location;
    const remark = req.body.remark;
    //console.log(id);
    const sqlUpdate =
        "UPDATE current_status SET LV_name=?, date_from_charpotro=?, commodity=?, LA=?, dest_from=?, dest_to=?, current_location=?, remark=?  where id= ?";
    db.query(
        sqlUpdate,
        [LV_name, date_from_charpotro, commodity, LA, dest_from, dest_to, current_location, remark, id],
        (err, result) => {
            if (err) console.log(err);
            //console.log(result)
            // res.send(result).json({
            //     success: true,
            // });
        }
    );
});
//Delete Record Entry
app.post("/management/deletecurrentstatus", (req, res) => {
    console.log("Delete status in backend");
    const id = req.body.status_id;
    const sqlDelete =
        "DELETE from current_status where id= ?";
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


//Insert Damarage 
app.post("/management/insertdamarage", (req, res) => {
    console.log("submit in backend");
    const order_number = req.body.order_number;
    const job_number = req.body.job_number;
    const date = req.body.date;
    const cp_number = req.body.cp_number;
    const date_from_charpotro = req.body.date_from_charpotro;
    const commodity = req.body.commodity;
    const volume = req.body.volume;
    const LV_name = req.body.LV_name;
    const MV_name = req.body.MV_name;
    const loading_location = req.body.loading_location;
    const unloading_location = req.body.unloading_location;
    const loading_start_time_stamp = req.body.loading_start_time_stamp;
    const loading_completion_time_stamp = req.body.loading_completion_time_stamp;
    const sailing_time_stamp = req.body.sailing_time_stamp;
    const duration_of_travel_time = req.body.duration_of_travel_time;
    const unloading_start_time_stamp = req.body.unloading_start_time_stamp;
    const unloading_completion_time_stamp = req.body.unloading_completion_time_stamp;
    const others = req.body.others;
    const total_elapsed_time = req.body.total_elapsed_time;
    const voyage_time = req.body.voyage_time;
    const free_time = req.body.free_time;
    const total_despatch = req.body.total_despatch;
    const daily_despatch = req.body.daily_despatch;
    console.log(job_number);
    const create_damarage = "INSERT INTO damarage_dispatch(order_number, job_number, date, cp_number, date_from_charpotro, commodity, volume, LV_name, MV_name, loading_location, unloading_location, loading_start_time_stamp, loading_completion_time_stamp, sailing_time_stamp, duration_of_travel_time, unloading_start_time_stamp, unloading_completion_time_stamp, others, total_elapsed_time, voyage_time, free_time, total_despatch, daily_despatch) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(
        create_damarage,
        [order_number, job_number, date, cp_number, date_from_charpotro, commodity, volume, LV_name, MV_name, loading_location, unloading_location, loading_start_time_stamp, loading_completion_time_stamp, sailing_time_stamp, duration_of_travel_time, unloading_start_time_stamp, unloading_completion_time_stamp, others, total_elapsed_time, voyage_time, free_time, total_despatch, daily_despatch],
        (err, result) => {
            if (err) console.log(err);
            console.log(result)
            res.send(result);
        }
    );
});
//Get Damarage Entry
app.get("/management/getdamarage", (req, res) => {
    const sqlSelect = "SELECT * from damarage_dispatch";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});
//Update Damrage Entry
app.post("/management/updatedamarage", (req, res) => {
    console.log("update job info in backend");
    const id = req.body.id;
    const order_number = req.body.order_number;
    const job_number = req.body.job_number;
    const date = req.body.date;
    const cp_number = req.body.cp_number;
    const date_from_charpotro = req.body.date_from_charpotro;
    const commodity = req.body.commodity;
    const volume = req.body.volume;
    const LV_name = req.body.LV_name;
    const MV_name = req.body.MV_name;
    const loading_location = req.body.loading_location;
    const unloading_location = req.body.unloading_location;
    const loading_start_time_stamp = req.body.loading_start_time_stamp;
    const loading_completion_time_stamp = req.body.loading_completion_time_stamp;
    const sailing_time_stamp = req.body.sailing_time_stamp;
    const duration_of_travel_time = req.body.duration_of_travel_time;
    const unloading_start_time_stamp = req.body.unloading_start_time_stamp;
    const unloading_completion_time_stamp = req.body.unloading_completion_time_stamp;
    const others = req.body.others;
    const total_elapsed_time = req.body.total_elapsed_time;
    const voyage_time = req.body.voyage_time;
    const free_time = req.body.free_time;
    const total_despatch = req.body.total_despatch;
    const daily_despatch = req.body.daily_despatch;
    console.log(id);
    const sqlUpdate =
        "UPDATE damarage_dispatch SET order_number=?, job_number=?, date=?, cp_number=?, date_from_charpotro=?, commodity=?, volume=?, LV_name=?, MV_name=?, loading_location=?, unloading_location=?, loading_start_time_stamp=?, loading_completion_time_stamp=?,sailing_time_stamp=?, duration_of_travel_time=?, unloading_start_time_stamp=?, unloading_completion_time_stamp=?, others=?, total_elapsed_time=?, voyage_time=?, free_time=?, total_despatch=?, daily_despatch=? WHERE id=?";
    db.query(
        sqlUpdate,
        [order_number, job_number, date, cp_number, date_from_charpotro, commodity, volume, LV_name, MV_name, loading_location, unloading_location, loading_start_time_stamp, loading_completion_time_stamp,sailing_time_stamp, duration_of_travel_time, unloading_start_time_stamp, unloading_completion_time_stamp, others, total_elapsed_time, voyage_time, free_time, total_despatch, daily_despatch, id],
        (err, result) => {
            if (err) console.log(err);
            console.log(result);

            res.send(result);
        }
    );
});
//Delete Damrage Entry
app.post("/management/deletedamarage", (req, res) => {
    console.log("Delete status in backend");
    const id = req.body.Dam_id;
    const sqlDelete =
        "DELETE from damarage_dispatch where id= ?";
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

app.get("/management/fetch_order_number", (req, res) => {
    console.log("fetching order number");
    const sqlSelect = "SELECT order_number from job_entry";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.get("/management/fetch_job_number", (req, res) => {
    console.log("fetching job number");
    const sqlSelect = "SELECT job_number from record_entry";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});
//------------------- Chq Due List-----------------------------
// Get Chq Due List
app.get("/management/getchqlist", (req, res) => {
    const sqlSelect = "SELECT * from chq_due_list";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});
//Insert Chq
app.post("/management/insertchq", (req, res) => {
    console.log("submit in backend");
    const order_number = req.body.order_number;
    const LA = req.body.LA;
    const LV_name = req.body.LV_name;
    const commodity = req.body.commodity;
    const mode = req.body.mode;
    const chq_amount = req.body.chq_amount;
    const part_pay = req.body.part_pay;
    const balance = req.body.balance;
    const chq_issue_date = req.body.chq_issue_date;
    const init_amount = req.body.init_amount;
    const payment = req.body.payment;
    const final_amount = req.body.final_amount;
    const create_chq = "INSERT INTO chq_due_list (order_number, LA, LV_name, commodity, mode, chq_amount, part_pay, balance, chq_issue_date, init_amount, payment, final_amount) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(
        create_chq,
        [order_number, LA, LV_name, commodity, mode, chq_amount, part_pay, balance, chq_issue_date, init_amount, payment, final_amount],
        (err, result) => {
            if (err) console.log(err);
            console.log(result)
            res.send(result);
        }
    );
});
// Delete Chq
app.post("/management/deletechq", (req, res) => {
    console.log("Delete status in backend");
    const id = req.body.Chq_id;
    const sqlDelete =
        "DELETE from chq_due_list where id= ?";
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

// Uopdate Chq
app.post("/management/updatechq", (req, res) => {
    console.log("update job info in backend");
    const id = req.body.id;
    const order_number = req.body.new_order_number;
    const LA = req.body.new_LA;
    const LV_name = req.body.new_LV_name;
    const commodity = req.body.new_commodity;
    const mode = req.body.new_mode;
    const chq_amount = req.body.new_chq_amount;
    const part_pay = req.body.new_part_pay;
    const balance = req.body.new_balance;
    const chq_issue_date = req.body.new_chq_issue_date;
    const init_amount = req.body.new_init_amount;
    const payment = req.body.new_payment;
    const final_amount = req.body.new_final_amount;
    const sqlUpdate =
        "UPDATE chq_due_list SET order_number=?, LA=?, LV_name=?, commodity=?, mode=?, chq_amount=?, part_pay=?, balance=?, chq_issue_date=?, init_amount=?, payment=?, final_amount=? WHERE id=?";
    db.query(
        sqlUpdate,
        [order_number, LA, LV_name, commodity, mode, chq_amount, part_pay, balance, chq_issue_date, init_amount, payment, final_amount, id],
        (err, result) => {
            if (err) console.log(err);
            console.log(result);

            res.send(result);
        }
    );
});

//------------------- Chq Approval-----------------------------
// Get Chq Approval
app.get("/management/getchqapproval", (req, res) => {
    const sqlSelect = "SELECT * from chq_approval";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

//Insert Chq
app.post("/management/insertchq_approval", (req, res) => {
    console.log("submit in backend");
    const order_number = req.body.order_number;
    const job_number = req.body.job_number;
    const date_from_charpotro = req.body.date_from_charpotro;
    const cp_number_from_charpotro = req.body.cp_number_from_charpotro;
    const LA_name = req.body.LA_name;
    const LV_name = req.body.LV_name;
    const MV_name = req.body.MV_name;
    const dest_from = req.body.dest_from;
    const dest_to = req.body.dest_to;
    const capacity_ton = req.body.capacity_ton;
    const rate = req.body.rate;
    const sixty_percent_payment = req.body.sixty_percent_payment;
    const forty_percent_payment = req.body.forty_percent_payment;
    const damarage = req.body.damarage;
    const second_trip = req.body.second_trip;
    const third_trip = req.body.third_trip;
    const direct_trip = req.body.direct_trip;
    const create_chq = "INSERT INTO chq_approval (order_number, job_number, date_from_charpotro, cp_number_from_charpotro, LA_name, LV_name, MV_name, dest_from, dest_to, capacity_ton, rate, sixty_percent_payment, forty_percent_payment, damarage, second_trip, third_trip, direct_trip) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(
        create_chq,
        [order_number, job_number, date_from_charpotro, cp_number_from_charpotro, LA_name, LV_name, MV_name, dest_from, dest_to, capacity_ton, rate, sixty_percent_payment, forty_percent_payment, damarage, second_trip, third_trip, direct_trip],
        (err, result) => {
            if (err) console.log(err);
            console.log(result)
            res.send(result);
        }
    );
});
// Delete Chq
app.post("/management/deletechq_approval", (req, res) => {
    console.log("Delete status in backend");
    const id = req.body.Chq_id;
    const sqlDelete =
        "DELETE from chq_approval where id= ?";
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

// Uopdate Chq
app.post("/management/updatechq_approval", (req, res) => {
    console.log("update job info in backend");
    const id = req.body.id;
    const order_number = req.body.new_order_number;
    const job_number = req.body.new_job_number;
    const date_from_charpotro = req.body.new_date_from_charpotro;
    const cp_number_from_charpotro = req.body.new_cp_number_from_charpotro;
    const LA_name = req.body.new_LA_name;
    const LV_name = req.body.new_LV_name;
    const MV_name = req.body.new_MV_name;
    const dest_from = req.body.new_dest_from;
    const dest_to = req.body.new_dest_to;
    const capacity_ton = req.body.new_capacity_ton;
    const rate = req.body.new_rate;
    const sixty_percent_payment = req.body.new_sixty_percent_payment;
    const forty_percent_payment = req.body.new_forty_percent_payment;
    const damarage = req.body.new_damarage;
    const second_trip = req.body.new_second_trip;
    const third_trip = req.body.new_third_trip;
    const direct_trip = req.body.new_direct_trip;
    const sqlUpdate =
        "UPDATE chq_approval SET order_number=?, job_number=?, date_from_charpotro=?, cp_number_from_charpotro=?, LA_name=?, LV_name=?, MV_name=?, dest_from=?, dest_to=?, capacity_ton=?, rate=?, sixty_percent_payment=?, forty_percent_payment=?, damarage=?, second_trip=?, third_trip=?, direct_trip=? WHERE id=?";
    db.query(
        sqlUpdate,
        [order_number, job_number, date_from_charpotro, cp_number_from_charpotro, LA_name, LV_name, MV_name, dest_from, dest_to, capacity_ton, rate, sixty_percent_payment, forty_percent_payment, damarage, second_trip, third_trip, direct_trip, id],
        (err, result) => {
            if (err) console.log(err);
            console.log(result);

            res.send(result);
        }
    );
});

//------------------- Payment -----------------------------
// Get payment
app.get("/management/getpayment", (req, res) => {
    const sqlSelect = "SELECT * from payment";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

//Insert Chq
app.post("/management/insertpayment", (req, res) => {
    console.log("submit in backend");
    const job_number = req.body.job_number;
    const LV_name = req.body.LV_name;
    const date_from_charpotro = req.body.date_from_charpotro;
    const MV_name = req.body.MV_name;
    const commodity = req.body.commodity;
    const chq_no = req.body.chq_no;
    const chq_issue_date = req.body.chq_issue_date;
    const amount = req.body.amount;
    const part_pay = req.body.part_pay;
    const payment_approved = req.body.payment_approved;
    const balance = req.body.balance;
    const payment_chq_no = req.body.payment_chq_no;
    const payment_chq_amount = req.body.payment_chq_amount;
    const payment_chq_date = req.body.payment_chq_date;
    const added_date = req.body.added_date;
    const create_chq = "INSERT INTO payment (job_number, LV_name, date_from_charpotro, MV_name, commodity, chq_no, chq_issue_date, amount, part_pay, payment_approved, balance, payment_chq_no, payment_chq_amount, payment_chq_date, added_date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(
        create_chq,
        [job_number, LV_name, date_from_charpotro, MV_name, commodity, chq_no, chq_issue_date, amount, part_pay, payment_approved, balance, payment_chq_no, payment_chq_amount, payment_chq_date, added_date],
        (err, result) => {
            if (err) console.log(err);
            console.log(result)
            res.send(result);
        }
    );
});
// Delete Chq
app.post("/management/deletepayment", (req, res) => {
    console.log("Delete status in backend");
    const id = req.body.Pay_id;
    const sqlDelete =
        "DELETE from payment where id= ?";
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

// Uopdate Chq
app.post("/management/updatepayment", (req, res) => {
    console.log("update job info in backend");
    const id = req.body.id;
    const job_number = req.body.new_job_number;
    const LV_name = req.body.new_LV_name;
    const date_from_charpotro = req.body.new_date_from_charpotro;
    const MV_name = req.body.new_MV_name;
    const commodity = req.body.new_commodity;
    const chq_no = req.body.new_chq_no;
    const chq_issue_date = req.body.new_chq_issue_date;
    const amount = req.body.new_amount;
    const part_pay = req.body.new_part_pay;
    const payment_approved = req.body.new_payment_approved;
    const balance = req.body.new_balance;
    const payment_chq_no = req.body.new_payment_chq_no;
    const payment_chq_amount = req.body.new_payment_chq_amount;
    const payment_chq_date = req.body.new_payment_chq_date;
    const added_date = req.body.new_added_date;
    const sqlUpdate =
        "UPDATE payment SET job_number=?, LV_name=?, date_from_charpotro=?, MV_name=?, commodity=?, chq_no=?, chq_issue_date=?, amount=?, part_pay=?, payment_approved=?, balance=?, payment_chq_no=?, payment_chq_amount=?, payment_chq_date=?, added_date=? WHERE id=?";
    db.query(
        sqlUpdate,
        [job_number, LV_name, date_from_charpotro, MV_name, commodity, chq_no, chq_issue_date, amount, part_pay, payment_approved, balance, payment_chq_no, payment_chq_amount, payment_chq_date, added_date, id],
        (err, result) => {
            if (err) console.log(err);
            console.log(result);

            res.send(result);
        }
    );
});


app.listen(3001, () => {
    console.log("Running on port 3001");
});
