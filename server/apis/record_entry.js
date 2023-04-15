const { ToastRes } = require("./util");

function addRecord(req, res, db) {
    const {
        order_number,
        job_number,
        date_from_charpotro,
        cp_number_from_charpotro,
        LA_name,
        LV_name,
        dest_from,
        dest_to,
        capacity,
        rate,
        LV_master_name,
        LV_master_contact_number,
    } = req.body;
    const create_record =
        "INSERT INTO record_entry (order_number, job_number, date_from_charpotro, cp_number_from_charpotro, LA_name, LV_name, dest_from, dest_to, capacity, rate, LV_master_name, LV_master_contact_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(
        create_record,
        [
            order_number,
            job_number,
            date_from_charpotro,
            cp_number_from_charpotro,
            LA_name,
            LV_name,
            dest_from,
            dest_to,
            capacity,
            rate,
            LV_master_name,
            LV_master_contact_number,
        ],
        (err, result) => {
            res.json(
                err
                    ? ToastRes("error", "creating record")
                    : ToastRes("create", `${order_number}`)
            );
        }
    );
}

function getRecord(req, res, db) {
    const sqlSelect = `SELECT 
                            id,
                            order_number, 
                            job_number, 
                            date_from_charpotro, 
                            cp_number_from_charpotro, 
                            LA_name, 
                            LV_name, 
                            dest_from, 
                            dest_to, 
                            capacity, 
                            rate, 
                            LV_master_name, 
                            LV_master_contact_number, 
                            date_created,
                            (
                                select 
                                    commodity
                                from
                                    job_entry
                                where
                                    job_entry.order_number = record_entry.order_number

                            ) as commodity 
                        from 
                            record_entry`;

    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
}

function updateRecord(req, res, db) {
    const {
        id,
        order_number,
        job_number,
        date_from_charpotro,
        cp_number_from_charpotro,
        LA_name,
        LV_name,
        dest_from,
        dest_to,
        capacity,
        rate,
        LV_master_name,
        LV_master_contact_number,
    } = req.body;

    const sqlUpdate =
        "UPDATE record_entry SET order_number=?, job_number=?, date_from_charpotro=?, cp_number_from_charpotro=?, LA_name=?, LV_name=?, dest_from=?, dest_to=?, capacity=?, rate=?, LV_master_name=?, LV_master_contact_number=? where id= ?";
    db.query(
        sqlUpdate,
        [
            order_number,
            job_number,
            date_from_charpotro,
            cp_number_from_charpotro,
            LA_name,
            LV_name,
            dest_from,
            dest_to,
            capacity,
            rate,
            LV_master_name,
            LV_master_contact_number,
            id,
        ],
        (err, result) => {
            res.json(
                err
                    ? ToastRes("error", "updating record")
                    : ToastRes("update", `${order_number}`)
            );
        }
    );
}

function deleteRecord(req, res, db) {
    //console.log("Delete record in backend");
    const id = req.body.record_id;
    const order_number = req.body.order_number;
    const sqlDelete = "DELETE from record_entry where id= ?";
    db.query(sqlDelete, [id], (err, result) => {
        res.json(
            err
                ? ToastRes("error", "deleting record")
                : ToastRes("delete", `${order_number}`)
        );
    });
}

function fetchJobNumber(req, res, db) {
    var order_number = req.query.order_number;
    console.log("query job number: ", order_number);
    const sqlSelect = `SELECT job_number as 'value' from record_entry where order_number = '${order_number}'`;
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
}

function getCharpotroCpLaLvRate(req, res, db) {
    var order_job_number = req.query.order_job_number;
    console.log("order_job_number", order_job_number);
    const sqlSelect = `SELECT date_from_charpotro, cp_number_from_charpotro, LA_name, LV_name, rate, dest_from, dest_to from record_entry where CONCAT(order_number, '-', job_number) = '${order_job_number}'`;

    db.query(sqlSelect, [order_job_number], (err, result) => {
        res.send(result);
    });
}

function getMaxCapacity(req, res, db) {
    var order_number = req.query.order_number;
    console.log("order_job_number", order_number);
    const sqlSelect = `
    select 
        (bl_quantity - (
            Select 
                IFNULL(SUM(capacity), 0)
            from record_entry 
            where order_number = '${order_number}'
        )) as 'max_capacity'
    from job_entry
    where order_number = '${order_number}'
    `;

    db.query(sqlSelect, [order_number], (err, result) => {
        res.send(result);
    });
}

module.exports.addRecord = addRecord;
module.exports.getRecord = getRecord;
module.exports.updateRecord = updateRecord;
module.exports.deleteRecord = deleteRecord;
module.exports.fetchJobNumber = fetchJobNumber;
module.exports.getCharpotroCpLaLvRate = getCharpotroCpLaLvRate;
module.exports.getMaxCapacity = getMaxCapacity;
