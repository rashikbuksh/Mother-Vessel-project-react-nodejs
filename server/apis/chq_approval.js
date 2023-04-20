const { ToastRes } = require("./util");

function addChqApproval(req, res, db) {
    const {
        order_job_number,
        sixty_percent_payment,
        forty_percent_payment,
        damarage,
        second_trip,
        third_trip,
        direct_trip,
    } = req.body;
    const create_chq =
        "INSERT INTO chq_approval (order_job_number, sixty_percent_payment, forty_percent_payment, damarage, second_trip, third_trip, direct_trip) VALUES (?,?,?,?,?,?,?)";
    db.query(
        create_chq,
        [
            order_job_number,
            sixty_percent_payment,
            forty_percent_payment,
            damarage,
            second_trip,
            third_trip,
            direct_trip,
        ],
        (err, result) => {
            res.json(
                err
                    ? ToastRes("error", "creating checque approval")
                    : ToastRes("create", `${order_job_number}`)
            );
        }
    );
}

const filterData = {
    All: "",
    Pending: "WHERE c.sixty_percent_payment_amount is NULL",
    Current: "WHERE c.sixty_percent_payment_amount is not NULL",
};

function getChqApproval(req, res, db) {
    const { status } = req.query;

    var sqlSelect =
        `SELECT 
            c.id as id,
            c.order_job_number as order_job_number,
            r.date_from_charpotro as date_from_charpotro, 
            r.cp_number_from_charpotro as cp_number_from_charpotro, 
            r.LA_name as LA_name, 
            r.LV_name as LV_name, 
            (   select mother_vessel_name
                from job_entry
                where order_number = r.order_number
            ) as MV_name, 
            r.dest_from as dest_from, 
            r.dest_to as dest_to, 
            r.capacity as capacity_ton, 
            r.rate as rate, 
            c.sixty_percent_payment_amount as sixty_percent_payment_amount, 
            c.sixty_percent_payment_chq_number as sixty_percent_payment_chq_number,
            c.sixty_percent_payment_chq_date as sixty_percent_payment_chq_date,
            c.forty_percent_payment_amount as forty_percent_payment_amount,
            c.forty_percent_payment_chq_number as forty_percent_payment_chq_number,
            c.forty_percent_payment_chq_date as forty_percent_payment_chq_date,
            c.damarage as damarage, 
            c.second_trip as second_trip,
            c.third_trip as third_trip, 
            c.direct_trip as direct_trip                      
        from 
            chq_approval c join record_entry r 
            on c.order_job_number = concat(r.order_number, '-', r.job_number) ` +
        filterData[status] +
        ";";

    db.query(sqlSelect, [filterData[status]], (err, result) => {
        res.send(result);
    });
}
function updateChqApproval(req, res, db) {
    const {
        id,
        order_job_number,
        sixty_percent_payment_amount,
        sixty_percent_payment_chq_number,
        sixty_percent_payment_chq_date,
        forty_percent_payment_amount,
        forty_percent_payment_chq_number,
        forty_percent_payment_chq_date,
        damarage,
        second_trip,
        third_trip,
        direct_trip,
    } = req.body;

    const sqlUpdate = `UPDATE chq_approval SET 
            sixty_percent_payment_amount=?, 
            sixty_percent_payment_chq_number=?,
            sixty_percent_payment_chq_date=?,
            forty_percent_payment_amount=?,
            forty_percent_payment_chq_number=?,
            forty_percent_payment_chq_date=?, 
            damarage=?, 
            second_trip=?, 
            third_trip=?, 
            direct_trip=? 
        WHERE id=?`;
    db.query(
        sqlUpdate,
        [
            sixty_percent_payment_amount,
            sixty_percent_payment_chq_number,
            sixty_percent_payment_chq_date,
            forty_percent_payment_amount,
            forty_percent_payment_chq_number,
            forty_percent_payment_chq_date,
            damarage,
            second_trip,
            third_trip,
            direct_trip,
            id,
        ],
        (err, result) => {
            res.json(
                err
                    ? ToastRes("error", "updating cheque approval")
                    : ToastRes("update", `${order_job_number}`)
            );
        }
    );
}
function deleteChqApproval(req, res, db) {
    const id = req.body.Chq_id;
    const order_job_number = req.body.order_job_number;
    const sqlDelete = "DELETE from chq_approval where id= ?";
    db.query(sqlDelete, [id], (err, result) => {
        res.json(
            err
                ? ToastRes("error", "deleting cheque approval")
                : ToastRes("delete", `${order_job_number}`)
        );
    });
}

module.exports.addChqApproval = addChqApproval;
module.exports.getChqApproval = getChqApproval;
module.exports.updateChqApproval = updateChqApproval;
module.exports.deleteChqApproval = deleteChqApproval;
