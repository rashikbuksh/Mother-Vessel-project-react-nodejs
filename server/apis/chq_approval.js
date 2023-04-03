function addChqApproval(req, res, db) {
    //console.log("submit in backend");
    const order_job_number = req.body.order_job_number;
    const sixty_percent_payment = req.body.sixty_percent_payment;
    const forty_percent_payment = req.body.forty_percent_payment;
    const damarage = req.body.damarage;
    const second_trip = req.body.second_trip;
    const third_trip = req.body.third_trip;
    const direct_trip = req.body.direct_trip;
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
            if (err) console.log(err);
            res.send(result);
        }
    );
}
function getChqApproval(req, res, db) {
    const status = req.body.status;
    var addedSql = "";
    switch (status) {
        case "All":
            addedSql = "";
            break;
        case "Pending":
            addedSql = "WHERE c.sixty_percent_payment is NULL";
            break;
        case "Current":
            addedSql = "WHERE c.sixty_percent_payment is not NULL";
            break;
        default:
            addedSql = "";
            break;
    }
    console.log("status: " + status);

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
            c.sixty_percent_payment as sixty_percent_payment, 
            c.forty_percent_payment as forty_percent_payment, 
            c.damarage as damarage, 
            c.second_trip as second_trip,
            c.third_trip as third_trip, 
            c.direct_trip as direct_trip                      
        from 
            chq_approval c join record_entry r 
            on c.order_job_number = concat(r.order_number, '-', r.job_number) ` +
        addedSql +
        ";";
    db.query(sqlSelect, [addedSql], (err, result) => {
        console.log("chq approval: " + result[0].id);
        res.send(result);
    });
}
function updateChqApproval(req, res, db) {
    //console.log("update job info in backend");
    const id = req.body.id;
    const sixty_percent_payment = req.body.new_sixty_percent_payment;
    const forty_percent_payment = req.body.new_forty_percent_payment;
    const damarage = req.body.new_damarage;
    const second_trip = req.body.new_second_trip;
    const third_trip = req.body.new_third_trip;
    const direct_trip = req.body.new_direct_trip;
    const sqlUpdate =
        "UPDATE chq_approval SET sixty_percent_payment=?, forty_percent_payment=?, damarage=?, second_trip=?, third_trip=?, direct_trip=? WHERE id=?";
    db.query(
        sqlUpdate,
        [
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
            res.send(result);
        }
    );
}
function deleteChqApproval(req, res, db) {
    //console.log("Delete status in backend");
    const id = req.body.Chq_id;
    const sqlDelete = "DELETE from chq_approval where id= ?";
    db.query(sqlDelete, [id], (err, result) => {
        if (err) console.log(err);

        if (!err) {
            res.send("success");
        }
    });
}

module.exports.addChqApproval = addChqApproval;
module.exports.getChqApproval = getChqApproval;
module.exports.updateChqApproval = updateChqApproval;
module.exports.deleteChqApproval = deleteChqApproval;
