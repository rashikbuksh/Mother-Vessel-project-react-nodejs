const { ToastRes } = require("./util");
function getMaxJob(req, res, db) {
    var { order_number } = req.query;
    const sqlSelect = `SELECT MAX(job_number) as max_job_number from order_job_table where order_number = '${order_number}'`;
    db.query(sqlSelect, [order_number], (err, result) => {
        res.send(result);
    });
}

function getOrderJob(req, res, db) {
    const sqlSelect = `SELECT CONCAT(order_number, '-', job_number) as value from order_job_table where job_number != 0 order by order_number, job_number`;
    db.query(sqlSelect, [], (err, result) => {
        res.send(result);
    });
}

function deleteOrderJob(req, res, db) {
    const { order_number, job_number } = req.body;

    const sqlDelete = `DELETE from order_job_table 
                        where order_number = '${order_number}' and 
                        job_number = '${job_number}'`;

    db.query(sqlDelete, [order_number, job_number], (err, result) => {
        res.json(
            err
                ? ToastRes("error", "deleting order job")
                : ToastRes("delete", `${order_number + "-" + job_number}`)
        );
    });
}

module.exports.getMaxJob = getMaxJob;
module.exports.getOrderJob = getOrderJob;
module.exports.deleteOrderJob = deleteOrderJob;
