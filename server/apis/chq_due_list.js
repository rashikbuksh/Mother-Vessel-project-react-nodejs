function addChq_due(req, res, db) {
    //console.log("submit in backend");
    const order_job_number = req.body.order_job_number;
    const LA_name = req.body.LA_name;
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
    const create_chq =
        "INSERT INTO chq_due_list (order_job_number, LA_name, LV_name, commodity, mode, chq_amount, part_pay, balance, chq_issue_date, init_amount, payment, final_amount) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(
        create_chq,
        [
            order_job_number,
            LA_name,
            LV_name,
            commodity,
            mode,
            chq_amount,
            part_pay,
            balance,
            chq_issue_date,
            init_amount,
            payment,
            final_amount,
        ],
        (err, result) => {
            if (err) console.log(err);
            res.send(result);
        }
    );
}
function getChq_due(req, res, db) {
    const sqlSelect = "SELECT * from chq_due_list";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
}
function updateChq_due(req, res, db) {
    //console.log("update job info in backend");
    const id = req.body.id;
    const order_job_number = req.body.new_order_job_number;
    const LA_name = req.body.new_LA_name;
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
        "UPDATE chq_due_list SET order_job_number=?, LA_name=?, LV_name=?, commodity=?, mode=?, chq_amount=?, part_pay=?, balance=?, chq_issue_date=?, init_amount=?, payment=?, final_amount=? WHERE id=?";
    db.query(
        sqlUpdate,
        [
            order_job_number,
            LA_name,
            LV_name,
            commodity,
            mode,
            chq_amount,
            part_pay,
            balance,
            chq_issue_date,
            init_amount,
            payment,
            final_amount,
            id,
        ],
        (err, result) => {
            if (err) console.log(err);
            res.send(result);
        }
    );
}
function deleteChq_due(req, res, db) {
    console.log("Delete status in backend");
    const id = req.body.Chq_id;
    const sqlDelete = "DELETE from chq_due_list where id= ?";
    db.query(sqlDelete, [id], (err, result) => {
        if (err) console.log(err);

        if (!err) {
            res.send("success");
        }
    });
}
//  Splitter
function getOrderNumFromOrderJobNum(order_job_number) {
    var order_number_split = order_job_number?.split("-");
    var order_number = "";
    for (var i = 0; i < order_number_split?.length - 1; i++) {
        order_number += order_number_split[i] + "-";
    }
    order_number = order_number.substring(0, order_number?.length - 1);
    return order_number;
}

function getLvToChqDue(req, res, db) {
    var order_job_number = req.query?.order_job_number;
    const sqlSelect = `SELECT LA_name,LV_name from record_entry where CONCAT(order_number, '-', job_number) = '${order_job_number}'`;
    db.query(sqlSelect, [order_job_number], (err, result) => {
        res.send(result);
    });
}
function getComodityToChqDue(req, res, db) {
    var order_job_number = req.query?.order_job_number;
    var order_number = getOrderNumFromOrderJobNum(order_job_number);
    const sqlSelect = `SELECT commodity from job_entry where order_number = '${order_number}'`;
    db.query(sqlSelect, [order_number], (err, result) => {
        res.send(result);
    });
}

module.exports.addChq_due = addChq_due;
module.exports.getChq_due = getChq_due;
module.exports.updateChq_due = updateChq_due;
module.exports.deleteChq_due = deleteChq_due;
module.exports.getLvToChqDue = getLvToChqDue;
module.exports.getComodityToChqDue = getComodityToChqDue;
