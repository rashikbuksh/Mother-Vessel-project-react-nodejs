function getMaxJob(req, res, db) {
    var order_number = req.query.order_number;
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

module.exports.getMaxJob = getMaxJob;
module.exports.getOrderJob = getOrderJob;
