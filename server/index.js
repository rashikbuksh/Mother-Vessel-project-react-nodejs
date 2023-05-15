const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const multer = require("multer");

const {
    verifyLogin,
    getUsers,
    enableUser,
    disableUser,
    resetPassword,
    updateInfo,
    deleteUser,
    register,
} = require("./apis/auth");
const {
    addRecord,
    getRecord,
    updateRecord,
    deleteRecord,
    fetchJobNumber,
    getCharpotroCpLaLvRate,
    getMaxCapacity,
    getLVname,
} = require("./apis/record_entry");
const {
    addJob,
    getJob,
    updateJob,
    deleteJob,
    getCommodity,
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
    addChqDue,
    getChqDue,
    updateChqDue,
    updateChqDuePartPay,
    deleteChqDue,
    getLvToChqDue,
    getComodityToChqDue,
    getLANameToChqDue,
} = require("./apis/chq_due_list");
const {
    addChqApproval,
    getChqApproval,
    updateChqApproval,
    deleteChqApproval,
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
const { getMaxJob, getOrderJob, deleteOrderJob } = require("./apis/order_job");

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
    getUsers(req, res, db);
});

app.post("/admin/enableuser", (req, res) => {
    enableUser(req, res, db);
});

app.post("/admin/disableuser", (req, res) => {
    disableUser(req, res, db);
});

app.post("/admin/resetpassword", (req, res) => {
    resetPassword(req, res, db);
});

app.post("/user/register", (req, res) => {
    register(req, res, db);
});

app.post("/admin/updateinfo", (req, res) => {
    updateInfo(req, res, db);
});

app.post("/admin/deleteuser", (req, res) => {
    deleteUser(req, res, db);
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
    updateJob(req, res, db);
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
    updateRecord(req, res, db);
});
//Delete Record Entry
app.post("/management/deleterecord", (req, res) => {
    deleteRecord(req, res, db);
});

// fetch comodity from job entry

app.get("/management/getcomodity", (req, res) => {
    getCommodity(req, res, db);
});

// fetch get capacity max
app.get("/management/getcapacitymax", (req, res) => {
    getMaxCapacity(req, res, db);
});

// fetch lv name
app.get("/management/getlvname", (req, res) => {
    getLVname(req, res, db);
});

//======================= Current Status =======================

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
    getChqDue(req, res, db);
});
//Insert Chq
app.post("/management/insertchq", (req, res) => {
    addChqDue(req, res, db);
});
// Delete Chq
app.post("/management/deletechq", (req, res) => {
    deleteChqDue(req, res, db);
});

// Update Chq
app.post("/management/updatechq", (req, res) => {
    updateChqDue(req, res, db);
});
app.post("/management/updatechqPartPay", (req, res) => {
    updateChqDuePartPay(req, res, db);
});

// get Lv for chq due
app.get("/management/getLvToChqDue", (req, res) => {
    getLvToChqDue(req, res, db);
});
// get Comodity for chq due
app.get("/management/getComodityToChqDue", (req, res) => {
    getComodityToChqDue(req, res, db);
});

app.get("/management/getLANames", (req, res) => {
    getLANameToChqDue(req, res, db);
});

//======================= Chq Approval =======================

// Get Chq Approval
app.get("/management/getchqapproval", (req, res) => {
    getChqApproval(req, res, db);
});

//Insert Chq
app.post("/management/insertchq_approval", (req, res) => {
    addChqApproval(req, res, db);
});
// Delete Chq
app.post("/management/deletechq_approval", (req, res) => {
    deleteChqApproval(req, res, db);
});

// Uopdate Chq
app.post("/management/updatechq_approval", (req, res) => {
    updateChqApproval(req, res, db);
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

//======================= order job =======================

//get max job number from job order table
app.get("/management/getmaxjobnumber", (req, res) => {
    getMaxJob(req, res, db);
});

// order job table fetch data joining with order number and job number
app.get("/management/getorderjob", (req, res) => {
    getOrderJob(req, res, db);
});

app.post("/management/deleteorderjob", (req, res) => {
    deleteOrderJob(req, res, db);
});

//======================= utils =======================

app.get("/management/getCharpotroCpLaLvRate", (req, res) => {
    getCharpotroCpLaLvRate(req, res, db);
});

app.get("/management/getMvName", (req, res) => {
    getMvName(req, res, db);
});

app.listen(3001, () => {
    console.log("Running on port 3001");
});
