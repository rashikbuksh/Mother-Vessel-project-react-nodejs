function addChqDue(req, res, db) {
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
    const create_chq = `INSERT INTO 
        chq_due_list 
        (
            order_number, 
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
            final_amount
        ) 
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
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
function getChqDue(req, res, db) {
    const filterByShip = req.query.filterByShip;
    var addedSql = "";
    switch (filterByShip) {
        case "All":
            addedSql = "";
            break;
        case "Own":
            addedSql = "join pre_defined_ship pdf on r.LV_name = pdf.LV_name";
            break;
        case "Other":
            addedSql = "join pre_defined_ship pdf on r.LV_name != pdf.LV_name";
            break;
        default:
            addedSql = "";
            break;
    }
    console.log("status: " + filterByShip);

    const sqlSelect =
        `
 SELECT 
  cdl.order_job_number as order_job_number, 
  r.LA_name as LA_name, 
  r.LV_name as LV_name, 
  (
    select 
      DISTINCT commodity 
    from 
      job_entry 
    where 
      order_number = r.order_number
  ) as commodity, 
  '60' as mode, 
  ca.sixty_percent_payment_amount as chq_amount, 
  ca.sixty_percent_payment_chq_date as chq_issue_date, 
  cdl.part_pay as part_pay, 
  cdl.payment as payment,
  cdl.amount as amount
FROM 
  chq_due_list cdl 
  join chq_approval ca on cdl.order_job_number = ca.order_job_number 
  join record_entry r on ca.order_job_number = concat(
    r.order_number, '-', r.job_number
  ) 
  ` +
        addedSql +
        `
where 
  ca.sixty_percent_payment_amount > 0 
  and ca.sixty_percent_payment_amount is not null and cdl.mode ='60'
UNION 
SELECT 
  cdl.order_job_number as order_job_number, 
  r.LA_name as LA_name, 
  r.LV_name as LV_name, 
  (
    select 
      DISTINCT commodity 
    from 
      job_entry 
    where 
      order_number = r.order_number
  ) as commodity, 
  '40' as mode, 
  ca.forty_percent_payment_amount as chq_amount, 
  ca.forty_percent_payment_chq_date as chq_issue_date, 
  cdl.part_pay as part_pay,  
  cdl.payment as payment,
  cdl.amount as amount
FROM 
  chq_due_list cdl 
  join chq_approval ca on cdl.order_job_number = ca.order_job_number 
  join record_entry r on ca.order_job_number = concat(
    r.order_number, '-', r.job_number
  ) 
  ` +
        addedSql +
        `
where 
  ca.forty_percent_payment_amount > 0 
  and ca.forty_percent_payment_amount is not null and cdl.mode ='40'
order by 
  LA_name asc
            `;
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
}
function updateChqDue(req, res, db) {
    //console.log("update job info in backend");
    const order_job_number = req.body.new_order_job_number;
    const mode = req.body.new_mode;

    const amount = req.body.new_amount;
    const payment = req.body.new_payment;

    console.log("updateChqDue: " + order_job_number + " " + mode);

    const sqlUpdate =
        "UPDATE chq_due_list SET payment=?, amount=? WHERE order_job_number=? and mode=?";
    db.query(
        sqlUpdate,
        [payment, amount, order_job_number, mode],
        (err, result) => {
            if (err) console.log(err);
            res.send(result);
        }
    );
}
function updateChqDuePartPay(req, res, db) {
    //console.log("update job info in backend");
    const order_job_number = req.body.new_order_job_number;
    const mode = req.body.new_mode;
    const part_pay = req.body.new_part_pay;
    const amount = req.body.new_amount;
    const payment = req.body.new_payment;

    console.log("updateChqDue: " + order_job_number + " " + mode);

    const sqlUpdate =
        "UPDATE chq_due_list SET part_pay=?, payment=?, amount=? WHERE order_job_number=? and mode=?";
    db.query(
        sqlUpdate,
        [part_pay, payment, amount, order_job_number, mode],
        (err, result) => {
            if (err) console.log(err);
            res.send(result);
        }
    );
}
function deleteChqDue(req, res, db) {
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

function getLANameToChqDue(req, res, db) {
    const sqlSelect = ` 
select 
  distinct LA_name as value 
from 
  record_entry 
where 
  LA_name in (
    SELECT 
      r.LA_name 
    FROM 
      chq_due_list cdl 
      join chq_approval ca on cdl.order_job_number = ca.order_job_number 
      join record_entry r on ca.order_job_number = concat(
        r.order_number, '-', r.job_number
      ) 
    where 
      cdl.mode = '60' 
      or cdl.mode = '40'
  ) 
order by 
  value asc
`;
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
}

module.exports.addChqDue = addChqDue;
module.exports.getChqDue = getChqDue;
module.exports.updateChqDue = updateChqDue;
module.exports.updateChqDuePartPay = updateChqDuePartPay;
module.exports.deleteChqDue = deleteChqDue;
module.exports.getLvToChqDue = getLvToChqDue;
module.exports.getComodityToChqDue = getComodityToChqDue;
module.exports.getLANameToChqDue = getLANameToChqDue;
