function addPayment(req, res, db) {
    //console.log("submit in backend");
    const order_job_number = req.body.order_job_number;
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
        "INSERT INTO payment (order_job_number, LV_name, date_from_charpotro, MV_name, commodity, chq_no, chq_issue_date, amount, part_pay, payment_approved, balance, payment_chq_no, payment_chq_amount, payment_chq_date, added_date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(
        create_chq,
        [
            order_job_number,
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
}
function getPayment(req, res, db) {
    const sqlSelect = "SELECT * from payment";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
}
function updatePayment(req, res, db) {
    //console.log("update job info in backend");
    const id = req.body.id;
    const order_job_number = req.body.order_job_number;
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
        "UPDATE payment SET order_job_number=?, LV_name=?, date_from_charpotro=?, MV_name=?, commodity=?, chq_no=?, chq_issue_date=?, amount=?, part_pay=?, payment_approved=?, balance=?, payment_chq_no=?, payment_chq_amount=?, payment_chq_date=?, added_date=? WHERE id=?";
    db.query(
        sqlUpdate,
        [
            order_job_number,
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
}
function deletePayment(req, res, db) {
    //console.log("Delete status in backend");
    const id = req.body.Pay_id;
    const sqlDelete = "DELETE from payment where id= ?";
    db.query(sqlDelete, [id], (err, result) => {
        if (err) console.log(err);
        //console.log(result)
        if (!err) {
            res.send("success");
        }
    });
}

function getOrderNumFromOrderJobNum(order_job_number) {
    var order_number_split = order_job_number?.split("-");
    var order_number = "";
    for (var i = 0; i < order_number_split?.length - 1; i++) {
        order_number += order_number_split[i] + "-";
    }
    order_number = order_number.substring(0, order_number?.length - 1);
    return order_number;
}

function getCharpotroLvToPayment(req, res, db) {
    var order_number = getOrderNumFromOrderJobNum(req.query?.order_job_number);
    const sqlSelect = `SELECT date_from_charpotro,LV_name from record_entry where order_number ='${order_number}'`;
    db.query(sqlSelect, [order_number], (err, result) => {
        res.send(result);
    });
}

function getMvNameToPayment(req, res, db) {
    var order_number = getOrderNumFromOrderJobNum(req.query?.order_job_number);
    const sqlSelect = `SELECT mother_vessel_name as MV_name from job_entry where order_number ='${order_number}'`;
    db.query(sqlSelect, [order_number], (err, result) => {
        res.send(result);
    });
}
function getComodityToPayment(req, res, db) {
    var order_number = getOrderNumFromOrderJobNum(req.query?.order_job_number);
    const sqlSelect = `SELECT commodity from job_entry where order_number ='${order_number}'`;
    db.query(sqlSelect, [order_number], (err, result) => {
        res.send(result);
    });
}
function getChqissuePartpayBalanceToPayment(req, res, db) {
    var order_number = getOrderNumFromOrderJobNum(req.query?.order_job_number);
    const sqlSelect = `SELECT chq_issue_date,part_pay,balance from chq_due_list where order_number ='${order_number}'`;
    db.query(sqlSelect, [order_number], (err, result) => {
        res.send(result);
    });
}

module.exports.addPayment = addPayment;
module.exports.getPayment = getPayment;
module.exports.updatePayment = updatePayment;
module.exports.deletePayment = deletePayment;
module.exports.getCharpotroLvToPayment = getCharpotroLvToPayment;
module.exports.getMvNameToPayment = getMvNameToPayment;
module.exports.getComodityToPayment = getComodityToPayment;
module.exports.getChqissuePartpayBalanceToPayment =
    getChqissuePartpayBalanceToPayment;
