const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const nodemailer = require("nodemailer");
const {
    verifyLogin,
    getusers,
    enableUser,
    disableuser,
    resetpassword,
    updateinfo,
    deleteuser,
    register,
} = require("./apis/auth");
const {
    addRecord,
    getRecord,
    updaterecord,
    deleteRecord,
    fetchJobNumber,
    getCharpotroCpLaLvRate,
    getMaxCapacity,
} = require("./apis/record_entry");
const {
    addJob,
    getJob,
    updatejob,
    deleteJob,
    getComodity,
    fetchOrderNumber,
    getMvName,
} = require("./apis/job_entry");
const {
    addCurrentStatus,
    getCurrentStatus,
    updateCurrentStatus,
    deleteCurrentStatus,
} = require("./apis/current_status");
const {
    addDamarage,
    getDamarage,
    updateDamarage,
    deleteDamarage,
} = require("./apis/damarage_dispatch");
const {
    addChq_due,
    getChq_due,
    updateChq_due,
    deleteChq_due,
    getLvToChqDue,
    getComodityToChqDue,
} = require("./apis/chq_due_list");
const {
    addChq_approval,
    getChq_approval,
    updateChq_approval,
    deleteChq_approval,
} = require("./apis/chq_approval");
const {
    addPayment,
    getPayment,
    updatePayment,
    deletePayment,
    getCharpotroLvToPayment,
    getMvNameToPayment,
    getComodityToPayment,
    getChqissuePartpayBalanceToPayment,
} = require("./apis/payment");
const {
    addPredefined,
    getPredefined,
    updatePredefined,
    deletePredefined,
    getLV,
} = require("./apis/predefined");
const { getMaxJob, getOrderJob } = require("./apis/order_job");

// MySQL
const mysql = require("mysql");
require("dotenv").config();
const { urlencoded } = require("body-parser");
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
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

//======================= Job Entry =======================

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

//======================= Record Entry =======================

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

// fetch get capacity max
app.get("/management/getcapacitymax", (req, res) => {
    getMaxCapacity(req, res, db);
});

//=======================Current Status =======================

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

//======================= Damarage =======================

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

//======================= Chq Due List =======================

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

// Update Chq
app.post("/management/updatechq", (req, res) => {
    updateChq_due(req, res, db);
});
// get Lv for chq due
app.get("/management/getLvToChqDue", (req, res) => {
    getLvToChqDue(req, res, db);
});
// get Comodity for chq due
app.get("/management/getComodityToChqDue", (req, res) => {
    getComodityToChqDue(req, res, db);
});

//======================= Chq Approval =======================

// Get Chq Approval
app.get("/management/getchqapproval", (req, res) => {
    getChq_approval(req, res, db);
});

//Insert Chq
app.post("/management/insertchq_approval", (req, res) => {
    addChq_approval(req, res, db);
});
// Delete Chq
app.post("/management/deletechq_approval", (req, res) => {
    deleteChq_approval(req, res, db);
});

// Uopdate Chq
app.post("/management/updatechq_approval", (req, res) => {
    updateChq_approval(req, res, db);
});

//======================= Payment =======================

// Get payment
app.get("/management/getpayment", (req, res) => {
    getPayment(req, res, db);
});

//Insert Chq
app.post("/management/insertpayment", (req, res) => {
    addPayment(req, res, db);
});
// Delete Chq
app.post("/management/deletepayment", (req, res) => {
    deletePayment(req, res, db);
});

// Update Chq
app.post("/management/updatepayment", (req, res) => {
    updatePayment(req, res, db);
});

//get date_from_charpotro, LV_name for Payment
app.get("/management/getCharpotroLvToPayment", (req, res) => {
    getCharpotroLvToPayment(req, res, db);
});
//get MvName for Payment
app.get("/management/getMvNameToPayment", (req, res) => {
    getMvNameToPayment(req, res, db);
});
//get Comodity for Payment
app.get("/management/getComodityToPayment", (req, res) => {
    getComodityToPayment(req, res, db);
});
//get Chqissue,Partpay,Balance for Payment
app.get("/management/getChqissuePartpayBalanceToPayment", (req, res) => {
    getChqissuePartpayBalanceToPayment(req, res, db);
});

//======================= Predefined =======================

//Insert Current Status predefined
app.post("/management/predefinedship", (req, res) => {
    addPredefined(req, res, db);
});
//Get Current Status predefined
app.get("/management/getpredefinedship", (req, res) => {
    getPredefined(req, res, db);
});
//Update Current Status predefined
app.post("/management/updatepredefinedship", (req, res) => {
    updatePredefined(req, res, db);
});

//Delete Current Status predefined
app.post("/management/deletepredefinedship", (req, res) => {
    deletePredefined(req, res, db);
});
// Get predefined ships
app.get("/management/getLV", (req, res) => {
    getLV(req, res, db);
});

//======================= Utils =======================

//get max job number from job order table
app.get("/management/getmaxjobnumber", (req, res) => {
    getMaxJob(req, res, db);
});

// order job table fetch data joining with order number and job number
app.get("/management/getorderjob", (req, res) => {
    getOrderJob(req, res, db);
});

app.get("/management/getCharpotroCpLaLvRate", (req, res) => {
    getCharpotroCpLaLvRate(req, res, db);
});

app.get("/management/getMvName", (req, res) => {
    getMvName(req, res, db);
});

app.listen(3001, () => {
    console.log("Running on port 3001");
});
