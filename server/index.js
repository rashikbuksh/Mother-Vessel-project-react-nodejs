const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const nodemailer = require("nodemailer");
const {verifyLogin, getusers, enableUser, disableuser, resetpassword, updateinfo, deleteuser, register} = require("./apis/auth");
const {addRecord, getRecord, updaterecord, deleteRecord, fetchJobNumber} = require("./apis/record_entry");
const {addJob, getJob, updatejob, deleteJob, getComodity, fetchOrderNumber} = require("./apis/job_entry");
const {addCurrentStatus, getCurrentStatus, updateCurrentStatus, deleteCurrentStatus} = require("./apis/current_status");
const {addDamarage, getDamarage, updateDamarage, deleteDamarage} = require("./apis/damarage_dispatch");
const {addChq_due, getChq_due, updateChq_due, deleteChq_due} = require("./apis/chq_due_list");

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
    verifyLogin(req, res, db);
});

app.get("/admin/getusers", (req, res) => {
    getusers(req, res, db);
});

app.post("/admin/enableuser", (req, res) => {
    enableUser(req, res, db);
});

app.post("/admin/disableuser", (req, res) => {
    disableuser(req, res, db);
});

app.post("/admin/resetpassword", (req, res) => {
    resetpassword(req, res, db);
});

app.post("/user/register", (req, res) => {
    register(req, res, db);
});

app.post("/admin/updateinfo", (req, res) => {
    updateinfo(req, res, db);
});

app.post("/admin/deleteuser", (req, res) => {
    deleteuser(req, res, db);
});
//////////////////////MANAGEMENT/////////////////////////
//Insert Job Entry
app.post("/management/jobentry", (req, res) => {
    addJob(req, res, db);
});
//Get Job Entry
app.get("/management/getjobentry", (req, res) => {
    getJob(req, res, db);
});
//Update Job Entry
app.post("/management/updatejobentry", (req, res) => {
    updatejob(req, res, db);
});
//Delete Job Entry
app.post("/management/deletejob", (req, res) => {
    deleteJob(req, res, db);
});

//Insert Record Entry
app.post("/management/recordentry", (req, res) => {
    addRecord(req, res, db);
});
//Get record Entry
app.get("/management/getrecordentry", (req, res) => {
    getRecord(req, res, db);
});
//Update Record Entry
app.post("/management/updaterecordentry", (req, res) => {
    updaterecord(req, res, db);
});
//Delete Record Entry
app.post("/management/deleterecord", (req, res) => {
    deleteRecord(req, res, db);
});

// fetch comodity from job entry

app.get("/management/getcomodity", (req, res) => {
    getComodity(req, res, db);
});

//Insert Current Status
app.post("/management/currentstatus", (req, res) => {
    addCurrentStatus(req, res, db);
});
//Get current status
app.get("/management/getcurrentstatus", (req, res) => {
    getCurrentStatus(req, res, db);
});
//Update current status
app.post("/management/updatecurrentstatus", (req, res) => {
    updateCurrentStatus(req, res, db);
});
//Delete current status
app.post("/management/deletecurrentstatus", (req, res) => {
    deleteCurrentStatus(req, res, db);
});

//Insert Damarage
app.post("/management/insertdamarage", (req, res) => {
    addDamarage(req, res, db);
});
//Get Damarage Entry
app.get("/management/getdamarage", (req, res) => {
    getDamarage(req, res, db);
});
//Update Damrage Entry
app.post("/management/updatedamarage", (req, res) => {
    updateDamarage(req, res, db);
});
//Delete Damrage Entry
app.post("/management/deletedamarage", (req, res) => {
    deleteDamarage(req, res, db);
});

app.get("/management/fetch_order_number", (req, res) => {
    fetchOrderNumber(req, res, db);
});

app.get("/management/fetch_job_number", (req, res) => {
    fetchJobNumber(req, res, db);
});
//------------------- Chq Due List-----------------------------
// Get Chq Due List
app.get("/management/getchqlist", (req, res) => {
    getChq_due(req, res, db);
});
//Insert Chq
app.post("/management/insertchq", (req, res) => {
    addChq_due(req, res, db);
});
// Delete Chq
app.post("/management/deletechq", (req, res) => {
    deleteChq_due(req, res, db);
});

// Uopdate Chq
app.post("/management/updatechq", (req, res) => {
    updateChq_due(req, res, db);
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
    const create_chq =
        "INSERT INTO chq_approval (order_number, job_number, date_from_charpotro, cp_number_from_charpotro, LA_name, LV_name, MV_name, dest_from, dest_to, capacity_ton, rate, sixty_percent_payment, forty_percent_payment, damarage, second_trip, third_trip, direct_trip) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(
        create_chq,
        [
            order_number,
            job_number,
            date_from_charpotro,
            cp_number_from_charpotro,
            LA_name,
            LV_name,
            MV_name,
            dest_from,
            dest_to,
            capacity_ton,
            rate,
            sixty_percent_payment,
            forty_percent_payment,
            damarage,
            second_trip,
            third_trip,
            direct_trip,
        ],
        (err, result) => {
            if (err) console.log(err);
            console.log(result);
            res.send(result);
        }
    );
});
// Delete Chq
app.post("/management/deletechq_approval", (req, res) => {
    console.log("Delete status in backend");
    const id = req.body.Chq_id;
    const sqlDelete = "DELETE from chq_approval where id= ?";
    db.query(sqlDelete, [id], (err, result) => {
        if (err) console.log(err);
        //console.log(result)
        if (!err) {
            res.send("success");
        }
    });
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
        [
            order_number,
            job_number,
            date_from_charpotro,
            cp_number_from_charpotro,
            LA_name,
            LV_name,
            MV_name,
            dest_from,
            dest_to,
            capacity_ton,
            rate,
            sixty_percent_payment,
            forty_percent_payment,
            damarage,
            second_trip,
            third_trip,
            direct_trip,
            id,
        ],
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
    const create_chq =
        "INSERT INTO payment (job_number, LV_name, date_from_charpotro, MV_name, commodity, chq_no, chq_issue_date, amount, part_pay, payment_approved, balance, payment_chq_no, payment_chq_amount, payment_chq_date, added_date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(
        create_chq,
        [
            job_number,
            LV_name,
            date_from_charpotro,
            MV_name,
            commodity,
            chq_no,
            chq_issue_date,
            amount,
            part_pay,
            payment_approved,
            balance,
            payment_chq_no,
            payment_chq_amount,
            payment_chq_date,
            added_date,
        ],
        (err, result) => {
            if (err) console.log(err);
            console.log(result);
            res.send(result);
        }
    );
});
// Delete Chq
app.post("/management/deletepayment", (req, res) => {
    console.log("Delete status in backend");
    const id = req.body.Pay_id;
    const sqlDelete = "DELETE from payment where id= ?";
    db.query(sqlDelete, [id], (err, result) => {
        if (err) console.log(err);
        //console.log(result)
        if (!err) {
            res.send("success");
        }
    });
});

// Update Chq
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
        [
            job_number,
            LV_name,
            date_from_charpotro,
            MV_name,
            commodity,
            chq_no,
            chq_issue_date,
            amount,
            part_pay,
            payment_approved,
            balance,
            payment_chq_no,
            payment_chq_amount,
            payment_chq_date,
            added_date,
            id,
        ],
        (err, result) => {
            if (err) console.log(err);
            console.log(result);

            res.send(result);
        }
    );
});

//Insert Current Status predefined
app.post("/management/predefinedship", (req, res) => {
    console.log("submit in backend");
    const LV_name = req.body.LV_name;
    //const date_from_charpotro = req.body.date_from_charpotro;
    //const commodity = req.body.commodity;
    // const LA = req.body.LA;
    // const dest_from = req.body.dest_from;
    // const dest_to = req.body.dest_to;
    // const current_location = req.body.current_location;
    // const remark = req.body.remark;
    const create_predefinedship =
        "INSERT INTO pre_defined_ship (LV_name) VALUES (?)";
    db.query(create_predefinedship, [LV_name], (err, result) => {
        if (err) console.log(err);
        console.log(result);
        res.send(result);
    });
});
//Get Current Status predefined
app.get("/management/getpredefinedship", (req, res) => {
    const sqlSelect = "SELECT * from pre_defined_ship";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});
//Update Current Status predefined
app.post("/management/updatepredefinedship", (req, res) => {
    console.log("update job info in backend");
    const id = req.body.id;
    const date_from_charpotro = req.body.date_from_charpotro;
    const commodity = req.body.commodity;
    const LA = req.body.LA;
    const dest_from = req.body.dest_from;
    const dest_to = req.body.dest_to;
    const current_location = req.body.current_location;
    const remark = req.body.remark;
    //console.log(id);
    const sqlUpdate =
        "UPDATE pre_defined_ship SET date_from_charpotro=?, commodity=?, LA=?, dest_from=?, dest_to=?, current_location=?, remark=?  where id= ?";
    db.query(
        sqlUpdate,
        [
            date_from_charpotro,
            commodity,
            LA,
            dest_from,
            dest_to,
            current_location,
            remark,
            id,
        ],
        (err, result) => {
            if (err) console.log(err);
            //console.log(result)
            // res.send(result).json({
            //     success: true,
            // });
        }
    );
});

//Delete Current Status predefined
app.post("/management/deletepredefinedship", (req, res) => {
    console.log("Delete status in backend");
    const id = req.body.status_id;
    const sqlDelete = "DELETE from pre_defined_ship where id= ?";
    db.query(sqlDelete, [id], (err, result) => {
        if (err) console.log(err);
        //console.log(result)
        if (!err) {
            res.send("success");
        }
    });
});

//get max job number from job order table
app.get("/management/getmaxjobnumber", (req, res) => {
    var order_number = req.query.order_number;
    const sqlSelect = `SELECT MAX(job_number) as max_job_number from order_job_table where order_number = '${order_number}'`;
    db.query(sqlSelect, [order_number], (err, result) => {
        console.log(result);
        res.send(result);
    });
});

// order job table fetch data joining with order number and job number
app.get("/management/getorderjob", (req, res) => {
    const sqlSelect = `SELECT CONCAT(order_number, '-', job_number) as value from order_job_table where job_number != 0 order by order_number, job_number`;
    db.query(sqlSelect, [], (err, result) => {
        console.log(result);
        res.send(result);
    });
});

app.get("/management/getCharpotroCpLaLvRate", (req, res) => {
    var order_job_number = req.query.order_job_number;
    console.log("order_job_number", order_job_number);
    const sqlSelect = `SELECT date_from_charpotro, cp_number_from_charpotro, LA_name, LV_name, rate, dest_from, dest_to from record_entry where CONCAT(order_number, '-', job_number) = '${order_job_number}'`;

    db.query(sqlSelect, [order_job_number], (err, result) => {
        console.log(result);
        res.send(result);
    });
});

app.get("/management/getMvName", (req, res) => {
    var order_job_number = req.query.order_job_number;
    var order_number_split = order_job_number.split("-");
    var order_number = "";
    for (var i = 0; i < order_number_split.length - 1; i++) {
        order_number += order_number_split[i] + "-";
    }
    order_number = order_number.substring(0, order_number.length - 1);
    console.log("order_number", order_number);

    const sqlSelect = `SELECT mother_vessel_name as MV_name from job_entry where order_number = '${order_number}'`;

    db.query(sqlSelect, [order_number], (err, result) => {
        console.log(result);
        res.send(result);
    });
});

app.listen(3001, () => {
    console.log("Running on port 3001");
});
